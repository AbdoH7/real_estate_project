import { IsNotEmpty, IsOptional, IsUrl, IsString } from 'class-validator';

export class CreateDeveloperDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  website?: string;
}
