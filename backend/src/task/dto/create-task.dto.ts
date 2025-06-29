import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsArray,
  IsDate,
  IsOptional,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsDate()
  @IsOptional()
  dueDate?: Date;
}