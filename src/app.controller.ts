import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @Get()
  getAllData(){
    return this.appService.getData();
  }

  @Post()
  async createData(@Body() data:any):Promise<void>{
     const datos ={
       nombre:String,
       edad:Number
     };
     await this.appService.createData(data)
  }


}
