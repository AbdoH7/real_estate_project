import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectionSource } from './config/typeorm';
import { seed } from './seed';

async function bootstrap() {
  await connectionSource.initialize();
  await connectionSource.runMigrations();
  if (process.env.NODE_ENV !== 'production') {
    await seed();
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
