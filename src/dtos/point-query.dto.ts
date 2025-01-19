import { IsOptional, IsString, IsBoolean, IsLatitude, IsLongitude, MaxLength, MinLength, IsInt, Min, Max, IsObject, ValidateNested } from "class-validator";
import { Transform, Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

class SocialMediaLinks {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'URL de Facebook' })
  facebook?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'URL de Instagram' })
  instagram?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'URL de Twitter' })
  twitter?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'URL de otra red social' })
  other?: string;
}

export class PointQueryDto {

  @IsOptional()
  @IsString()
  @MaxLength(30)
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(140)
  description? : string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  @MinLength(2)
  address? : string;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsLatitude()
  latitud?: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsLongitude()
  longitude? : number;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  @MinLength(2)
  region?: string;

  @IsOptional()
  @IsString()
  @MaxLength(30)
  @MinLength(2)
  commune? : string;

  @IsOptional()
  @Transform(({ value }) => {
    // Si el valor es una cadena, lo convertimos en un array
    if (typeof value === 'string') {
      return value.split(',').map(item => item.trim());
    }
    // Si ya es un array, lo dejamos como está
    return value;
  })
  services?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(4)
  type? : number;

  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return value;
  })
  @IsBoolean()
  highlighted? : boolean;

  @IsOptional()
  @IsString()
  galleryName?:string

  @IsOptional()
  @IsString()
  localNumber?:string

  // Redes sociales
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SocialMediaLinks)
  @ApiPropertyOptional({ description: 'Redes sociales' })
  rrss?: SocialMediaLinks;

  // Campo para teléfono
  @IsOptional()
  @IsString()
  @MaxLength(15)
  @MinLength(5)
  phone?: string;
}