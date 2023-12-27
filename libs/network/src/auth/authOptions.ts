import { NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { MAX_AGE } from '@foundation/util'
import { fetchGraphqlStatic } from '../fetch'
import {
  AuthProviderType,
  LoginDocument,
  RegisterWithProviderDocument,
  UserDocument,
} from '../queries/generated'
import { sign, verify } from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt'

export const authOptions: NextAuthOptions = {
  providers: [
    // Google Provider Configuration
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // Credentials Provider Configuration
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null

        const { email, password } = credentials
        if (!email || !password) {
          throw new Error('Email and password are required')
        }

        const { data, error } = await fetchGraphqlStatic({
          document: LoginDocument,
          variables: { loginInput: { email, password } },
        })

        if (!data?.login || error) {
          console.error(`Authentication error: ${error}`)

          throw new Error(
            'Authentication failed: Invalid credentials or user not found',
          )
        }
        const user = data.login.user
        return {
          id: user.uid,
          name: user.name,
          image: user.image,
          email: user.email,
        }
      },
    }),
  ],
  debug: true,
  session: {
    strategy: 'jwt',
    maxAge: MAX_AGE,
  },

  jwt: {
    maxAge: MAX_AGE,
    async encode({ token, secret }): Promise<string> {
      if (!token) {
        throw new Error('Token is undefined')
      }
      const { sub, picture, ...tokenProps } = token

      const nowInSeconds = Math.floor(Date.now() / 1000)
      const expirationTimestamp = nowInSeconds + MAX_AGE

      return sign(
        {
          uid: sub,
          image: picture,
          ...tokenProps,
          exp: expirationTimestamp,
        },
        secret,
        { algorithm: 'HS256' },
      )
    },
    async decode({ token, secret }): Promise<JWT | null> {
      if (!token) {
        throw new Error('Token is undefined')
      }
      try {
        const decodedToken = verify(token, secret, {
          algorithms: ['HS256'],
        })

        return decodedToken as JWT
      } catch (error) {
        console.error('JWT decode error', error)
        return null
      }
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        const { id, name, image } = user

        const existingUser = await fetchGraphqlStatic({
          document: UserDocument,
          variables: { where: { uid: id } },
        })

        if (!existingUser.data) {
          await fetchGraphqlStatic({
            document: RegisterWithProviderDocument,
            variables: {
              registerWithProviderInput: {
                type: AuthProviderType.Google,
                uid: id,
                image,
                name,
              },
            },
          })
        }
      }

      return true
    },

    async session({ token, session }) {
      if (token) {
        session.user = {
          name: token.name,
          email: token.email,
          image: token.picture,
          uid: (token.uid as string) || '',
        }
      }
      return session
    },
  },

  pages: {
    signIn: '/signIn',
  },
}

export const getAuth = () => getServerSession(authOptions)
