import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from 'src/module/user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';



@Injectable()
export class AuthService {
  constructor( private readonly UserService: UserService,
    private readonly jwtService: JwtService) {}
  async  create(body: CreateAuthDto) {
    // console.log(body);
    // mã hoá mật khẩu
    const {password, ...rest} = body;
    const hasdPassword =  await argon2.hash(password);
    // khởi tạo lại newusser với mat khau da dc ma hoa
    const newuser = {...rest, password: hasdPassword};
     await this.UserService.create(newuser);


    return {
      message : "Bạn đã đăng ký thành công ",
      data : new HttpException("Đăng ký thành công", HttpStatus.OK,)
    };
  }


  async login(body :any) {
    const user = await this.UserService.findOneUserByEmail(body.email);
    // console.log(user,"111111")
    if(!user) throw new HttpException(
      'Bạn đã nhập sai email hoặc password',
      HttpStatus.BAD_REQUEST,)
  
    const isMatch = await argon2.verify(user.password, body.password);
    if(!isMatch) throw new HttpException(
      'Bạn đã nhập sai email hoặc password',
      HttpStatus.BAD_REQUEST,)

    return  {
      message : "Đăng nhập thành công",
      data : user,
      token : await this.generateAccessToken({
        id : user.id,
        email : user.email,
        role : user.role
      })

    }
  }

  async loginGoogle(body :any) {
    const user = await this.UserService.findOneUserByEmail(body.email);
    // console.log(body,"111111")
    // kiểm tra xem co user đăng nhập vao bằng tài khoản google chưa có thì trả về user đó luôn, chưa có thì đi tạo mới
    if(user) {

      return  {
        message : "Đăng nhập bằng tài khoản google thành công",
        data : user,
        token: await this.generateAccessToken({
          id : user.id,
          email : user.email,
          role : user.role
        })
      }
    }
    const newUserWithGoogle = await this.UserService.create(body);
    //  tạo xong rồi sẽ đi tìm user với email đang đăng ký qua id
    const userGoogle = await this.UserService.findOneUserById(newUserWithGoogle.data.raw.insertId);
    console.log(userGoogle,"111111")
    return {
      message : "Đăng nhập bằng tài khoản google này",
      data : userGoogle,
      token: await this.generateAccessToken({
        id : userGoogle.id,
        email : userGoogle.email,
        role : userGoogle.role,
        
      })
    }
  }
  
  async generateAccessToken(payload) {
    return this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: 'nestjs',
    });
  }

  verifyAccessToken(token) {
    return this.jwtService.verify(token, {
      secret: 'nestjs',
    });
  }

}
