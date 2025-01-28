import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    
  }))
  const config = new DocumentBuilder()
  .setTitle('API de Puntos')
  .setDescription('Documentación de la API para gestionar puntos')
  .setVersion('1.0')
  // .addBearerAuth() //implementar para autenticacion
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  

  await app.listen(process.env.PORT);
  console.log(`listen on port ${process.env.PORT}`);
  
}


bootstrap();
