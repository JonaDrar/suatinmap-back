import { Type } from "class-transformer";
import { ArrayMaxSize, IsArray, IsBoolean, IsInt, IsLatitude, IsLongitude, IsNumber, IsObject, IsOptional, IsString, IsUrl, Max, MaxLength, Min, MinLength, ValidateNested ,} from "class-validator";

class JsonObjectDTo{
    @IsString()
    galleryName:string;
    
    @IsNumber()
    localNumber:number;

}


export class CreatePoint {

    @IsString()
    @MaxLength(30)
    @MinLength(2)
    name : string;

    @IsString()
    @MaxLength(140)
    description : string;

    @IsString()
    @MaxLength(30)
    @MinLength(2)
    address : string;

    @IsLatitude()
    latitud: number;

    @IsLongitude()
    longitude : number;

    @IsUrl()
    photo_url : string;

    @IsString()
    @MaxLength(30)
    @MinLength(2)
    region: string;

    @IsString()
    @MaxLength(30)
    @MinLength(2)
    commune : string;

    @IsArray()
    @ArrayMaxSize(10)
    @IsOptional()
    services : string[];

    @IsInt()
    @Min(1)
    @Max(4)
    type : number;

    @IsBoolean()
    highlighted : boolean;

    @IsObject()
    @ValidateNested()
    @Type(() => JsonObjectDTo)
    gallery: JsonObjectDTo;


    @IsBoolean()
    @IsOptional()
    deleted : boolean = false;


}