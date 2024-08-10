import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Request } from 'express';
import { CorsOptionsCallback } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const PORT = 9000;
  const app = await NestFactory.create(AppModule);
  const allowlist = ['http://localhost:5173'];

  const corsOptionsDelegate = (req: Request, callback: CorsOptionsCallback) => {
    const corsOptions = {
      origin: false,
      methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
    };
    if (allowlist.indexOf(req.header('Origin') as string) !== -1) {
      corsOptions.origin = true;
    }
    callback(null, corsOptions);
  };
  app.enableCors(corsOptionsDelegate);
  await app.listen(PORT, () => Logger.log(`backend is up on: ${PORT}.`));
}
bootstrap();
