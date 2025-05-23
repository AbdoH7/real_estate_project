import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectionSource } from './config/typeorm';
import { seed } from './seed';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { UniqueConstraintFilter } from './filters/unique-constraint.filter';


async function bootstrap() {
  await connectionSource.initialize();
  await connectionSource.runMigrations();
  if (process.env.NODE_ENV !== 'production') {
    await seed();
  }

  const app = await NestFactory.create(AppModule);

  // Enable CORS in development mode
  if (process.env.NODE_ENV !== 'production') {
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });
  }

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Real Estate API')
    .setDescription('The Real Estate API documentation')
    .setVersion('1.0')
    .addTag('real-estate')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //  app.useGlobalFilters(new UniqueConstraintFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
