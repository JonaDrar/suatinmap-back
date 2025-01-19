import { Type } from "class-transformer";
import { ArrayMaxSize, IsArray, IsBoolean, IsInt, IsLatitude, IsLongitude, IsNumber, IsObject, IsOptional, IsString, IsUrl, Max, MaxLength, Min, MinLength, ValidateNested ,} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


class JsonObjectDTo{
    @IsOptional()
    @IsString()
    @ApiProperty({description:'Nombre de la galería'})
    galleryName:string;
    
    @IsOptional()
    @IsString()
    @ApiProperty({description:'Número del local'})
    localNumber:string;

}

class SocialMediaLinks {
    @IsOptional()
    @IsUrl()
    @ApiPropertyOptional({ description: 'URL de Facebook' })
    facebook?: string;

    @IsOptional()
    @IsUrl()
    @ApiPropertyOptional({ description: 'URL de Instagram' })
    instagram?: string;

    @IsOptional()
    @IsUrl()
    @ApiPropertyOptional({ description: 'URL de Twitter' })
    twitter?: string;

    @IsOptional()
    @IsUrl()
    @ApiPropertyOptional({ description: 'URL de otra red social' })
    other?: string;
}


export class CreatePoint {

    @IsString()
    @MaxLength(30)
    @MinLength(2)
    @ApiProperty({description:'Nombre',maxLength:30,minLength:2})
    name : string;

    @IsString()
    @MaxLength(140)
    @ApiProperty({description:'Descripcion',maxLength:140})
    description : string;

    @IsString()
    @MaxLength(30)
    @MinLength(2)
    @ApiProperty({description:'Direccion',maxLength:30,minLength:2})
    address : string;

    @IsLatitude()
    @ApiProperty({description:'Latitud'})
    latitud: number;

    @IsLongitude()
    @ApiProperty({description:'Longitud'})
    longitude : number;

    @IsUrl()
    @ApiProperty({description:'URL Imagen'})
    photo_url : string;

    @IsString()
    @MaxLength(30)
    @MinLength(2)
    @ApiProperty({description:'Region',maxLength:30,minLength:2})
    region: string;

    @IsString()
    @MaxLength(30)
    @MinLength(2)
    @ApiProperty({description:'Comuna',type:'string',maxLength:30,minLength:2})
    commune : string;

    @IsArray()
    @ArrayMaxSize(10)
    @IsOptional()
    @IsString({each:true})
    @ApiPropertyOptional({description:'Servicios'})
    services : string[];

    @IsInt()
    @Min(1)
    @Max(4)
    @ApiProperty({description:'Numero de tipo(1-Peluqueria,2-Peluqueria canina,3-Centro de acopio,4-Centro de estudio)',minimum:1,maximum:4})
    type : number;

    @IsBoolean()
    @ApiProperty({description:'Destacado'})
    highlighted : boolean;

    @IsObject()
    @ValidateNested()
    @IsOptional()
    @ApiPropertyOptional({description:'Galeria'})
    @Type(() => JsonObjectDTo)
    gallery: JsonObjectDTo;


    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional({description:"Eliminar(Eliminado=true/No Eliminado=false)",default:false})
    deleted : boolean = false;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @ApiPropertyOptional({ description: 'Redes sociales' })
    @Type(() => SocialMediaLinks)
    rrss?: SocialMediaLinks;

    @IsString()
    @MinLength(7)
    @MaxLength(15)
    @IsOptional()
    @ApiPropertyOptional({ description: 'Teléfono de contacto' })
    phone: string;
}