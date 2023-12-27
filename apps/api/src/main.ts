import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { add } from '@foundation/sample-lib'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  console.log('add ', add(3, 4))
  await app.listen(3000)
}
bootstrap()
