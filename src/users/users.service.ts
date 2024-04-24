import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {

    }
    create(email: string, password: string) {

        //create is to create a new instance of the entity
        const user = this.repo.create({ email, password });

        //save is to save the entity to the database
        return this.repo.save(user);

    }
    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }
    find(email: string) {

        return this.repo.find({ where: { email: email } });
    }
    findAll() {
        return this.repo.find();
    }
    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new Error('User not found');
        }
        //Object.assign is to copy the values of all enumerable own properties from one or more source objects to a target object
        Object.assign(user, attrs);
        return this.repo.save(user);
    }
    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new Error('User not found');
        }
        return this.repo.remove(user);

    }

}
