import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { WsModule } from './ws/ws.module';

@Module({
  imports: [CatsModule, WsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // forRoutes 为路由处理程序注册中间件
    // forRoutes('cats')
    //      为 / cats路由处理程序全局注册中间件
    // forRoutes({ path: 'cats', method: RequestMethod.GET })
    //      为 / cats路由处理程序的GET请求方法注册中间件
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
