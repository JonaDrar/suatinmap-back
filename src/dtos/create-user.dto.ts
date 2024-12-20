import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString, Min, MinLength } from 'class-validator';


export class CreateUser {
  @IsString()
  @MinLength(3)
  @ApiProperty({description:"Nombre"})
  name: string;

  @IsEmail()
  @ApiProperty({description:"Correo electronico"})
  email: string;

  @IsString()
  @ApiProperty({description:"Rol de usuario"})
  roles: string;

  @IsString()
  @ApiProperty({description:"Contraseña"})
  pass: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({description:"Eliminar(Eliminado=true/No Eliminado=false)",default:false})
  delete: boolean = false;
}
