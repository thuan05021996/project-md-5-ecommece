// import { message } from 'antd';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(Body: any) {
    const newUser = await this.userRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(Body)
      .execute();
    return {
      message: 'Thành công',
      data: newUser,
    };
  }

  findAll() {
    const listUser = this.userRepository
      .createQueryBuilder()
      .select()
      .getMany();
    return listUser;
  }

  async findOneUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }
  async findOneUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async BandOrUnBand(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    user.active = !user.active;
    await this.userRepository.save(user);
    return {
      message: 'Đã cập nhật thành công',
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    const user = this.userRepository.delete(id);
    return `This action removes a #${id} user`;
  }

  async fogotpassword(data: any) {
    // console.log("cuoc sông bvuof")
    const {password,email} = data
    // mã hoá password
    const hasdPassword =  await argon2.hash(password);
     
    const user = await this.userRepository.findOneBy({ email });
    user.password = hasdPassword;
    await this.userRepository.save(user);
    return {
      message: 'Thay đổi mật khẩu thành công',
    }
   console.log(user)
  }
}
