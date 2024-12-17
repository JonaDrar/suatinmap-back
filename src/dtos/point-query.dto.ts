import { IsOptional, IsString, IsBoolean, IsLatitude, IsLongitude, MaxLength, MinLength} from "class-validator";
import { Transform } from "class-transformer";

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
      @IsLatitude()
      latitud?: number;
  
      @IsOptional()
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
      @IsString()
      type? : string;
  
      @IsOptional()
      @IsBoolean()
      highlighted? : boolean;
}