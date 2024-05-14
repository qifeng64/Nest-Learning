## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Dev

```bash
# CLI help
$ nest --help
# CLI create controller
$ nest g controller <controller name>
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Learning Notes

### 控制器

_`*.controller.ts` 类似vue路由_

### 提供者

_`*.service.ts` 数据处理逻辑_

#### 自定义提供者

- 注册
  - 提供者在 `@Module` 装饰器的 `providers` 参数中注册提供者时
    - `provide` 参数设置token，`Nest IoC` 根据token查找依赖对应的提供
    - `useClass/useValue` 参数，将token与提供者关联
    - `useFactory` 参数，可创建工厂提供者、异步提供者
- 使用
  - `@Inject(<token-name>)` 使用提供者

#### 作用域

- 方案一：使用 `@Injectable` 注入作用域
  - `@Injectable({ scope: Scope.scopeRange})`
  - scopeRange 值
    - DEFAULT，单例范围
    - REQUEST，请求处理完成后，为每个传入的请求和垃圾收集专门创建新实例
    - TRANSIENT，临时提供者，每次请求都会创建新的实例
- 方案二：在 `@Module` 中注册提供者时，使用 `scope` 参数设置作用域
- 方案三：为单个控制器中提供者设置范围，在 `@Controller` 中使用 `scope` 参数设置作用域

### 中间件

_`*.middleware.ts`类似express中间件_

- 必须使用模块类的 `configure()` 方法设置
- 包含中间件的模块必须实现 `NestModule` 接口

#### `apply()`

_指定注册的中间件_

- 可传入一个或多个参数(中间件)

#### `exclude()`

_指定中间件需排除的路由_

#### `forRoutes()`

_指定中间件应用的路由处理程序_

- 可接受一个字符串、多个字符串、对象、一个控制器类甚至多个控制器类
- 常用：
  - `forRoutes('cats')`
    - 为`/cats`路由处理程序全局注册中间件
  - `forRoutes({ path: 'cats', method: RequestMethod.GET })`
    - 为`/cats`路由处理程序的GET请求方法注册中间件
    - `path`支持模式匹配

#### 全局中间件

_在main.ts中，`app.use(<middleware-name>)`_

### 守卫

_`*.guard.ts`，在中间件之后、拦截器或管道之前执行_

- 每个守卫需实现`CanActivate`接口和一个`CanActivate()`函数
  - `CanActivate()`函数接受一个`ExecutionContext`，返回值为布尔值
- 使用`@UseGuards`装饰器绑定守卫
- 全局守卫
  - 方案一：在main.ts中，`app.useGlobalGuards(new <custom-guard>())`
  - 方案二：在app.module.ts中，传入`@Module`装饰器的providers

### 拦截器

_拦截器类需实现`NestInterceptor`接口，存在`intercept`方法_

- 使用`@UseInterceptors`装饰器绑定拦截器，直接传入拦截器类
- - 全局守卫
  - 方案一：在main.ts中，`app.useGlobalInterceptors(new <custom-interceptor>())`
  - 方案二：在app.module.ts中，传入`@Module`装饰器的providers

#### intercept

_两个参数：`ExecutionContext`和`CallHandler`，需手动调用`handle()`_

- `next.handle()`
  - 可对响应数据处理
  - 可使用`catchError(err)`操作符覆盖抛出的异常
    - err为原异常信息

### Pipes

_管道，作用：转换和验证_

#### 内置管道(类)

_可直接传入类，也可传入实例，使用实例可自定义相应状态码等_

- ValidationPipe
  - 推荐在定义DTO时结合`class-validator`使用
  - `pnpm add class-validator`
- ParseIntPipe
- ParseFloatPipe
- ParseBoolPipe
- ParseArrayPipe
- ParseUUIDPipe
- ParseEnumPipe
- ParseFilePipe
- DefaultValuePipe
  - `new DefaultValuePipe(defaultVal)`，提供默认值

#### 自定义管道

_每个管道必须实现`transform()`方法_
_内置验证管道十分强大，直接使用即可；需对传入数据进行处理时可自定义管道_

- 使用`@UsePipes`装饰器绑定管道
- 对象解构验证器
  - `pnpm add joi`
  - `pnpm add -D @types/joi`
- 类验证器
  - `pnpm add class-validator class-transformer`
- 全局管道
  - 方案一：在main.ts中，``app.useGlobalPipes(new <custom-pipe>())`
  - 方案二：在app.module.ts中，传入`@Module`装饰器的providers

### 异常处理

#### HttpException 基类

#### 自定义异常

_基于`HttpException`基类进行扩展_

#### 异常过滤器

_`@UseFilters(new exceptionFilterClass())` 绑定过滤器_

- 可接收过滤器类或实例，推荐使用类，由nest自动实例化并注入，可重复使用同一实例，减少内存使用
- 过滤器级别
  - 方法范围，仅用于单个路由处理程序（控制器中的单个方法）
  - 控制器范围
  - 全局范围
    - 方案一：在main.ts中，`app.useGlobalFilters(new exceptionFilterClass())`
    - 方案二：在app.module.ts中，传入`@Module`装饰器的providers

### 模块

_`*.module.ts` 每一个模块都是一个共享模块_

#### 全局模块

1. 在`app.module.ts`中`@Module()`装饰器的`imports`参数中注册
2. 定义模块时使用`@Global()`装饰器

#### [动态模块](https://docs.nestjs.cn/10/fundamentals?id=%e6%a8%a1%e5%9d%97%e9%85%8d%e7%bd%ae)

### 装饰器

_`@xxx aaa`，xxx为函数，意为将aaa作为参数传入xxx_

_`@xxx(bbb) aaa`，此时xxx为高阶函数，意为将bbb作为参数传入xxx，且xxx会返回一个函数_

#### 内置装饰器

##### @Module

可传入

- controllers
  - 注册本模块全局的控制器
- providers
  - 注册本模块全局的提供者
    - 注册后相当于已在该模块内全局实例化
    - `{ provide: <token-name>, useClass: <custom-provides> }`
  - 注册过滤器
    - `{ provide: APP_FILTER, useClass: exceptionFilterClass }`
  - 注册管道
    - `{ provide: APP_PIPE, useClass: <custom-pipe> }`
  - 注册守卫
    - `{ provide: APP_GUARD, useClass: <custom-guard> }`
  - 注册拦截器
    - `{ provide: APP_INTERCEPTOR, useClass: <custom-interceptor> }`
- exports
  - 注册并导出本模块内部注册的提供者
  - 注册并导出本模块导入的其它模块
- imports
  - 导入其它模块
  - 可直接使用全局模块导出的提供者，不需要imports该全局模块

##### @UsePipes

_绑定管道_

##### @UseGuards

_绑定守卫_

##### @Injectable

_可注解标记提供者、拦截器_

- 标记提供者
  - 在 `Nest IoC` 容器中注册提供者（`@Module`）
  - 当 `Nest IoC` 容器实例化控制者时，会先查找所有依赖，找到提供者类时自动实例化

#### 自定义装饰器

_接受两个参数，data和ctx_

- data
  - 使用`@decorator(xxx)`注解时，传入的xxx会被data接受
- ctx
  - 执行上下文

#### 装饰器聚合

_applyDecorators_

### 循环依赖

_前向引用 `forwardRef()`_

#### 提供者循环依赖

_循环依赖双方都使用 `@Inject()` 和前向引用 `forwardRef()` 声明成员_

```typescript
@Injectable()
export class CatsService {
  constructor(
    @Inject(forwardRef(() => CommonService))
    private readonly commonService: CommonService,
  ) {}
}
```

#### 模块循环依赖

_循环依赖双方都使用前向引用 `forwardRef()`_

```typescript
@Module({
  imports: [forwardRef(() => CatsModule)],
})
export class CommonModule {}
```

### 应用上下文

_`context: ExecutionContext`_

#### HttpArgumentsHost

```typescript
const ctx = context.switchToHttp();
const request = ctx.getRequest();
const response = ctx.getResponse();
```

#### WsArgumentsHost

```typescript
const ctx = context.switchToWs();
const data = ctx.getData();
const client = ctx.getClient();
```

#### RpcArgumentsHost

```typescript
const ctx = context.switchToRpc();
const data = ctx.getData();
const context = ctx.getContext();
```

#### getHandler()和getClass()

- `ctx.getHandler()` 返回关联控制者中定义的 `create()` 方法
- `ctx.和getClass()` 返回关联控制者类的应用（非实例）

### [生命周期事件](https://docs.nestjs.cn/10/fundamentals?id=%e7%94%9f%e5%91%bd%e5%91%a8%e6%9c%9f%e4%ba%8b%e4%bb%b6-1)
