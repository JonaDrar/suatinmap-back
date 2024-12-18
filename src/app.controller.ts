import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUser } from './dtos/create-user.dto';
import { CreatePoint } from './dtos/create-points.dto';
import { PointQueryDto } from './dtos/point-query.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/user')
  getAllUsers() {
    return this.appService.getUsers();
  }

  @Post('/user')
  async createUser(@Body() data: CreateUser): Promise<void> {
    await this.appService.createUser(data);
  }

  @Post('/points')
  async CreatePoint(@Body() data: CreatePoint): Promise<void> {
    await this.appService.createPoint(data);
  }

  @Get('/points')
  async getFilteredPoints(@Query() filters: PointQueryDto) {
    console.log(filters)
    return this.appService.getFilteredPoints(filters);
  }

  @Get('/points')
  getAllPoints() {
    return this.appService.getPoints();
  }

  @Delete('/points/:id')
  async deletePoint(@Param('id') id: string): Promise<void> {
    await this.appService.deletePoint(id);
  }

  
}
