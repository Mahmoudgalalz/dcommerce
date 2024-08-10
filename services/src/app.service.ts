import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  currentTime(): string {
    return new Date(Date.now()).toUTCString();
  }
}
