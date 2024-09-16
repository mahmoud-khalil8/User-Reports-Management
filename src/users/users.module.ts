import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './intreceptors/current-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService,
    AuthService,
    CurrentUserInterceptor
    , {
      provide: 'APP_INTERCEPTOR',
      useClass: CurrentUserInterceptor
    }
  ]
})
export class UsersModule { }
