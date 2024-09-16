import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { promisify } from "util";
import { scrypt as _scrypt, randomBytes } from "crypto";


const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) { }
    async signUp(email: string, password: string) {
        const user = await this.userService.find(email);
        if (user.length) {
            throw new BadRequestException('User already exists');
        }

        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const result = salt + '.' + hash.toString('hex');
        const newUser = await this.userService.create(email, result);
        return newUser;
    }
    async signIn(email: string, password: string) {
        const [user] = await this.userService.find(email);
        if (!user) {
            throw new BadRequestException('User not found');
        }

        const [salt, storedHash] = user.password.split('.');
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Bad password');
        }
        else {

            return user;
        }

    }

}