import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UserService } from 'src/module/user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
// import { log } from 'console';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly UserService: UserService
    ) {}

  @Post("register")
  async register(@Body() body :CreateAuthDto)  {
    //  tìm xem đã có email nào đăng ký hay chưa
    const user = await this.UserService.findOneUserByEmail(body.email);
    console.log(user,"12312")
    if (user) {
     return new HttpException("Email đã được đăng ký", HttpStatus.BAD_REQUEST);
    }
    return await this.authService.create(body);

  }
  
  @Post("login")
  @HttpCode(201)
  login(@Body() body :any)  {
    return  this.authService.login(body)
  }

  @Post("loginGoogle")  
  @HttpCode(201)
  loginGoogle(@Body() body :any)  {
    return  this.authService.loginGoogle(body)
  }
 
}
