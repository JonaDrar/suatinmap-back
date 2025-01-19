import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUser } from './dtos/create-user.dto';
import { CreatePoint } from './dtos/create-points.dto';
import { PointQueryDto } from './dtos/point-query.dto';
import { ApiOperation, ApiBody,ApiQuery } from '@nestjs/swagger';
import { UpdatePoint } from './dtos/update-points.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/user')
  @ApiOperation({ summary: 'Obtiene todos los usuarios' })
  getAllUsers() {
    return this.appService.getUsers();
  }

  @Post('/user')
  @ApiOperation({ summary: 'Crear un usuario' }) @ApiBody({ type: CreateUser }) 
  async createUser(@Body() data: CreateUser): Promise<void> {
    await this.appService.createUser(data);
  }

  @Post('/points')
  @ApiOperation({ summary: 'Crear un punto' }) @ApiBody({ type: CreatePoint }) 
  async CreatePoint(@Body() data: CreatePoint): Promise<void> {
    await this.appService.createPoint(data);
  }

  @Get('/points?')
  @ApiOperation({ summary: 'Obtener puntos filtrados' })
  @ApiQuery({ name: 'name', required: false, type: String, description: 'Nombre' }) 
  @ApiQuery({ name: 'description', required: false, type: String, description: 'Descripcion' })
  @ApiQuery({ name: 'address', required: false, type: String, description: 'Direccion' })
  @ApiQuery({ name: 'latitud', required: false, type: Number, description: 'Latitud' })
  @ApiQuery({ name: 'longitude', required: false, type: Number, description: 'Longitud ' })
  @ApiQuery({ name: 'region', required: false, type: String, description: 'Region' })
  @ApiQuery({ name: 'commune', required: false, type: String, description: 'Comuna' })
  @ApiQuery({ name: 'services', required: false, type: String, description: 'Servicios(Separar servicios con coma)' })
  @ApiQuery({ name: 'type', required: false, type: Number, description: 'Numero de tipo(1-Peluqueria,2-Peluqueria canina,3-Centro de acopio,4-Centro de estudio)' })
  @ApiQuery({ name: 'highlighted', required: false, type: Boolean, description: 'Destacado' })
  @ApiQuery({ name: 'galleryName', required: false, type: String, description: 'Nombre de la Galeria' })
  @ApiQuery({ name: 'localNumber', required: false, type: String, description: 'Numero del local en la galeria' })
  @ApiQuery({ name: 'phone', required: false, type: String, description: 'Número de teléfono' }) 
  @ApiQuery({ name: 'facebook', required: false, type: String, description: 'URL de Facebook' }) 
  @ApiQuery({ name: 'instagram', required: false, type: String, description: 'URL de Instagram' }) 
  @ApiQuery({ name: 'twitter', required: false, type: String, description: 'URL de Twitter' }) 
  @ApiQuery({ name: 'other', required: false, type: String, description: 'URL de otra red social' })

  async getFilteredPoints(@Query() filters: PointQueryDto) {
    console.log(filters)
    return this.appService.getFilteredPoints(filters);
  }

  @Get('/points')
  @ApiOperation({ summary: 'Obtiene todos los puntos' })
  getAllPoints() {
    return this.appService.getPoints();
  }

  @Put('/points/:id')
  @ApiOperation({ summary: 'Actualiza un punto' })@ApiBody({ type: UpdatePoint }) 
  async updatePoint(@Param('id') id: string, @Body() data: UpdatePoint): Promise<void> {
    await this.appService.updatePoint(id, data);
  }

  @Delete('/points/:id')
  @ApiOperation({ summary: 'Eliminar un punto' })
  async deletePoint(@Param('id') id: string): Promise<void> {
    await this.appService.deletePoint(id);
  }

}
