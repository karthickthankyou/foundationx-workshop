import Link from 'next/link'
import { GithubIcon } from 'lucide-react'

export const HomePage = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-12 text-center text-gray-800 bg-gray-100">
        <h1 className="max-w-2xl mb-4 text-6xl font-black ">
          Foundation <span className=" font-extralight">X</span>
        </h1>
        <p className="max-w-lg mb-6 text-xl">
          Jumpstart Your Next Tech Venture.
        </p>
        <div className="flex flex-col justify-center gap-4 md:flex-row">
          <Link
            href="https://github.com/karthickthankyou/foundationX"
            target="_blank"
          >
            <GithubIcon />
          </Link>
        </div>
      </div>
      <div className="mt-10">
        <h2 className="mb-3 text-3xl font-semibold">Features:</h2>
        <ul className="list-disc list-inside">
          <li>Monorepo with PNPM workspaces</li>
          <li>Next.js for Frontend & SSR</li>
          <li>NextAuth for Authentication</li>
          <li>NestJS for Robust API Development</li>
          <li>Prisma ORM</li>
          <li>GraphQL and REST API Endpoints</li>
          <li>Reusable UI library built with Tailwind CSS & Shadcn UI</li>
          <li>Reusable Form library with React Hook Form & Zod</li>
          <li>GraphQL Codegen for Efficient Development</li>
        </ul>
      </div>
    </div>
  )
}
