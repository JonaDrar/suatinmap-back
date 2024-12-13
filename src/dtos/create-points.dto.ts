import { ArrayMaxSize, IsArray, IsBoolean, IsLatitude, IsLongitude, isLongitude, IsOptional, IsString, IsUrl, isURL, MaxLength, MinLength } from "class-validator";

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

    @IsString()
    type : string;

    @IsBoolean()
    highlighted : boolean;

    @IsBoolean()
    @IsOptional()
    deleted : boolean = false;


}