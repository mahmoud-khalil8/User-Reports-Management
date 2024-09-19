import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { currentUser } from './decorators/current-user.decorator';
import { User } from './users.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private userService: UsersService,
        private authService: AuthService
    ) { }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@currentUser() user: User) {
        return user;
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {

        const user = await this.authService.signUp(body.email, body.password)
        session.userId = user.id
        return user
    }
    @Post('/signin')
    async signIn(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signIn(body.email, body.password)
        session.userId = user.id
        return user
    }
    @Post('/signout')
    async signOut(@Session() session: any) {
        session.userId = null
        return 'You have logged out'
    }
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        console.log('Handler is running');
        const user = await this.userService.findOne(parseInt(id))
        if (!user) {
            throw new NotFoundException('User not found')
        }
        return user
    }

    @Get()
    findAllUsers() {
        return this.userService.findAll()
    }


    @Get()
    findUserByEmail(@Query('email') email: string) {
        return this.userService.find(email)
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.userService.remove(parseInt(id))
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.update(parseInt(id), body);

    }
}
