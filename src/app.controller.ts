import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUser } from './dtos/create-user.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @Get("/user")
  getAllData(){
    return this.appService.getData();
  }

  @Post("/user")
  async createData(@Body() data:CreateUser):Promise<void>{
     await this.appService.createData(data)
  }


}
