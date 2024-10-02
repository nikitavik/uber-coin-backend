import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Uber coin')
  .setDescription('Available API')
  .setVersion('1.0')
  .build();
