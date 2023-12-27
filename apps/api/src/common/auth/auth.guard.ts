import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { Reflector } from '@nestjs/core'
import { Role } from '@foundation/util/types'
import { PrismaService } from 'src/common/prisma/prisma.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const req = ctx.getContext().req
    // Look for an internal API secret.
    if (this.bypassWithApiSecret(req)) {
      //  The auth check bypassed.
      return true
    }

    await this.authenticateUser(req)

    return this.authorizeUser(req, context)
  }

  private bypassWithApiSecret(req: any) {
    const apiSecret = req.headers['x-api-secret']
    if (!apiSecret) {
      return false
    }

    if (apiSecret === process.env.INTERNAL_API_SECRET) {
      req.user = {
        uid: 'internal_admin',
        roles: ['admin', 'manager'],
      }
      return true
    } else {
      throw new ForbiddenException('Nope.')
    }
  }

  private async authenticateUser(req: any): Promise<void> {
    const bearerHeader = req.headers.authorization
    // Bearer eylskfdjlsdf309
    const token = bearerHeader?.split(' ')[1]

    if (!token) {
      throw new UnauthorizedException('No token provided.')
    }

    try {
      const user = await this.jwtService.verify(token)
      req.user = user
    } catch (err) {
      console.error('Token validation error:', err)
    }

    if (!req.user) {
      throw new UnauthorizedException('Invalid token.')
    }
  }

  private async authorizeUser(
    req: any,
    context: ExecutionContext,
  ): Promise<boolean> {
    const requiredRoles = this.getMetadata<Role[]>('roles', context)
    const userRoles = await this.getUserRoles(req.user.uid)

    req.user.roles = userRoles

    if (!requiredRoles || requiredRoles.length === 0) {
      return true
    }

    return userRoles.some((userRole) =>
      requiredRoles.every((requiredRole) => requiredRole === userRole),
    )
  }

  private getMetadata<T>(key: string, context: ExecutionContext): T {
    return this.reflector.getAllAndOverride<T>(key, [
      context.getHandler(),
      context.getClass(),
    ])
  }

  private async getUserRoles(uid: string): Promise<Role[]> {
    const rolePromises = [
      this.prisma.admin.findUnique({ where: { uid } }),
      this.prisma.manager.findUnique({ where: { uid } }),
      // Add promises for other role models here
    ]

    const roles: Role[] = []

    const [admin, manager] = await Promise.all(rolePromises)
    admin && roles.push('admin')
    manager && roles.push('manager')

    return roles
  }
}
