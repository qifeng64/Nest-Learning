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
- exports
  - 注册并导出本模块内部注册的提供者
  - 注册并导出本模块导入的其它模块
- imports
  - 导入其它模块
  - 可直接使用全局模块导出的提供者，不需要imports该全局模块
