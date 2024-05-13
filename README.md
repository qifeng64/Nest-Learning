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

### 装饰器

_`@xxx aaa`，xxx为函数，意为将aaa作为参数传入xxx_

_`@xxx(bbb) aaa`，此时xxx为高阶函数，意为将bbb作为参数传入xxx，且xxx会返回一个函数_

### 文件系统

### 控制器

_`*.controller.ts` 类似vue路由_

### 提供者

_`*.service.ts` 数据处理逻辑_

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

### 模块

_`*.module.ts` 每一个模块都是一个共享模块_

#### 全局模块

1. 在`app.module.ts`中`@Module()`装饰器的`imports`参数中注册
2. 定义模块时使用`@Global()`装饰器

### 装饰器

#### @Module

可传入

- controllers
  - 注册本模块全局的控制器
- providers
  - 注册本模块全局的提供者
    - 注册后相当于已在该模块内全局实例化
  - 注册过滤器
    - `{ provide: APP_FILTER, useClass: exceptionFilterClass }`
  - 注册管道
    - `{ provide: APP_PIPE, useClass: <custom-pipe> }`
- exports
  - 注册并导出本模块内部注册的提供者
  - 注册并导出本模块导入的其它模块
- imports
  - 导入其它模块
  - 可直接使用全局模块导出的提供者，不需要imports该全局模块

#### @UsePipes

_绑定管道_
