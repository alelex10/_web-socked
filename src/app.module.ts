import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentGateway } from './document/document.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, DocumentGateway],
})
export class AppModule {}
