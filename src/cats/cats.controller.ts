import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  UseFilters,
  // UseGuards,
  ValidationPipe,
  // UsePipes,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
// import { ForbiddenException } from '../forbidden.exception';
import { HttpExceptionFilter } from 'src/http-exception.filter';
// import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
// import { JoiValidationPipe } from './cats.pipe';
// import { Cat } from 'src/cats/interfaces/cat.interface';

@Controller('cats')
// @UseGuards(new RolesGuard())
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  // 1.状态码：post 默认201；其余请求类型默认200。此处更改默认状态码
  @HttpCode(204)
  // 2.自定义响应头
  @Header('Cache-Control', 'none')
  // @UsePipes(new JoiValidationPipe())
  @Roles('admin') // 自定义装饰器
  async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    console.log(createCatDto);
    this.catsService.create(createCatDto);
  }

  @Get()
  @UseFilters(new HttpExceptionFilter()) // 使用异常过滤器
  async findAll() {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // throw new ForbiddenException();
    return this.catsService.findAll();
  }

  // 3.路由模式匹配，如 * 表示任意字符
  @Get('card*')
  findWildCard() {
    return 'This route uses a wildCard';
  }

  // 4.重定向
  // 默认状态码302，此处自定义为301
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 301)
  // 5.query: ?version=5
  getDocs(@Query('version') version: string) {
    console.log(version);
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  // 6.params(路由参数): /id
  // @Get(':id')
  // // findOne(@Param() params: { id: number }): string {
  // // 显示将参数标记传递给装饰器
  // findOne(@Param('id') id: number): string {
  //   console.log(id);
  //   return `This action returns a #${id} cat`;
  // }

  // Pipes，管道
  // 内置管道：ParseIntPipe
  @Get(':age')
  findOneByAge(
    @Param(
      'age',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    age: number,
  ) {
    return this.catsService.findOne(age);
  }
}
