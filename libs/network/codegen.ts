import type { CodegenConfig } from '@graphql-codegen/cli'
const inputDocumentsPattern = '**/*.graphql'

const plugins = [
  'typescript',
  'typescript-operations',
  'named-operations-object',
  'typed-document-node',
]
const config: CodegenConfig = {
  watch: true,
  overwrite: true,
  schema: '../../apps/api/src/schema.gql',
  generates: {
    './src/queries/generated.ts': {
      documents: `./src/queries/${inputDocumentsPattern}`,
      plugins,
    },
  },
}

export default config
