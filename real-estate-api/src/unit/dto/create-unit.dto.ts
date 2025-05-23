import { IsString, IsNumber, IsArray, IsBoolean, IsOptional, IsUUID, Min, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUnitDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsArray()
  @IsString({ each: true })
  amenities: string[];

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  area: number;

  @IsNumber()
  @Min(0)
  bedroom_count: number;

  @IsNumber()
  @Min(0)
  bathroom_count: number;

  @IsBoolean()
  furnished: boolean;

  @IsUUID()
  @IsOptional()
  projectId?: string;

  @IsString()
  @IsOptional()
  main_image_url?: string;
} 