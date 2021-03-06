import 'dotenv/config';

import { environment } from '@/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const port = process.env.PORT || 8080;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.use(helmet());
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            // dismissDefaultMessages: true,
            validationError: { target: false },
        }),
    );
    app.useStaticAssets(join(__dirname, '..', 'public'));

    if (environment === 'development') {
        app.enableCors();

        const options = new DocumentBuilder()
            .setTitle(`Senior project`)
            .setDescription('Dora-matching API')
            .setVersion('1.0')
            .addBearerAuth()
            .addServer('http://localhost:4000')
            .addServer('https://dora.doramatching.tk')
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
