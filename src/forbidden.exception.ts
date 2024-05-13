import { HttpException, HttpStatus } from '@nestjs/common';

// 自定义异常
// 对HttpException基类进行扩展
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
