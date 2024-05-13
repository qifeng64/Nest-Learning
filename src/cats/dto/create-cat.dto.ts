import { IsInt, IsString } from 'class-validator';
export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}

// export class CreateCatDto {
//   readonly name: string;

//   readonly age: number;

//   readonly breed: string;
// }
