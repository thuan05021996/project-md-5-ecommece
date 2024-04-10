import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  
  import { Reflector } from '@nestjs/core';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(
      // private readonly authService: AuthService,
      private readonly reflector: Reflector,
    ) {}
  
    canActivate(context: ExecutionContext): Promise<boolean> | boolean {
      const { user } = context.switchToHttp().getRequest();
      // console.log(user);
      return user.role == 'admin' ? true : false;
    }
  }