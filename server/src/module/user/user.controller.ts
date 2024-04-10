import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() Body) {
    return this.userService.create(Body);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Body() email: string) {
    return this.userService.findOneUserByEmail(email);
  }

  @Get(':id')
  findOneUserById(@Param('id') id: string) {
    return this.userService.findOneUserById(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: any) {
    // console.log(updateUserDto,"1111")
    await this.userService.update(+id, updateUserDto);
    // console.log(id)
    // cập nhật rồi trả lại user mới cập nhật cho client
    const user = await this.userService.findOneUserById(+id);
    return user
  }

  @Patch('admin/:id')
  BandOrUnBand(@Param('id') id: string) {
    
    return this.userService.BandOrUnBand(+id);
  } 
  @Patch("fogotpassword")
  fogotpassword(@Body() data: string) {
    
    return this.userService.fogotpassword(data)
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
