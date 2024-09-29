import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { Auth } from '../entities/user.entity';
import { access } from 'fs';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const userRoles = this.reflector.get(Roles, context.getHandler());
    if (!userRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: Auth = request.user;
    return this.matchRoles(userRoles, user.userRoles);
  }
  matchRoles(roles: string[], userRoles: string[]){
    let access= false;
    userRoles.forEach((userRoles)=>{
        if(roles.includes(userRoles)) access = true
    })
    return access;
  }
}