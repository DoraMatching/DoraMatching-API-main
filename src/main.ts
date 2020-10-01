import 'dotenv/config';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { environment } from './config/app.config';

const port = process.env.PORT || 8080;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(helmet());

    if (environment === 'development') {
        app.enableCors();

        const options = new DocumentBuilder()
          .setTitle(`Senior project`)
          .setDescription('Dora-matching API')
          .setVersion('1.0')
          .addBearerAuth()
          .addServer('http://localhost:4000')
          .addServer('https://api.dev.doramatching.tk')
          .addServer('http://192.168.21.207:4000')
          .build();

        const document = SwaggerModule.createDocument(app, options);

        SwaggerModule.setup('/docs', app, document);
    }

    await app.listen(port);
    Logger.log(`Server running on port: ${port}`, 'bootstrap');
}

bootstrap();
