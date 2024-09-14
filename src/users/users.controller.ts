import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
@Controller('auth')
@Serialize(UserDto)
export class UsersController {

    constructor(private userService: UsersService) { }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto) {
        this.userService.create(body.email, body.password)
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
