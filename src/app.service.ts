import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getAnswer(): Object {
    return {
      new: 'that'
    }
  }
}
