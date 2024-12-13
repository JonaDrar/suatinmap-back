import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUser } from './dtos/create-user.dto';
import { CreatePoint } from './dtos/create-points.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @Get("/user")
  getAllUsers(){
    return this.appService.getUsers();
  }

  @Post("/user")
  async createUser(@Body() data:CreateUser):Promise<void>{
     await this.appService.createUser(data)
  }

  @Get("/points")
  getAllPoints(){
    return this.appService.getPoints();
  }

  @Post("/points")
  async CreatePoint(@Body() data:CreatePoint):Promise<void>{
     await this.appService.createPoint(data)
  }


}
