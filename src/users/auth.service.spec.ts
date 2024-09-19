import { Test } from "@nestjs/testing"
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { before } from "node:test";
import { User } from "./users.entity";
describe('AuthService', () => {

    let service: AuthService;
    let fakeUsersService: Partial<UsersService>;
    beforeEach(async () => {
        let users: User[] = [];
        fakeUsersService = {

            find: (email: string) => {
                const user = users.filter(user => user.email === email);
                return Promise.resolve(user)
            },
            create: (email: string, password: string) => {
                const user = { id: Math.floor(Math.random() * 999), email, password } as User;
                users.push(user);
                return Promise.resolve(user)
            }
        }


        const module = await Test.createTestingModule({
            providers: [AuthService, {
                provide: UsersService,
                useValue: fakeUsersService
            }]
        }).compile();

        service = module.get(AuthService);
    });
    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();

    })
    it('creates a new user with a salted and hashed password', async () => {
        const user = await service.signUp('ssdas@sdsd.com', 'sdsdsd');
        expect(user.password).not.toEqual('sdsdsd');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    })
    it('throws an error if user signs up with email that is in use', async () => {
        fakeUsersService.find = () => Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
        try {
            await service.signUp('a', 'b');
        }
        catch (err) {
            expect(err).toBeDefined();
        }
    });
    it('throws if user signs in with unused email ', async () => {
        try {
            await service.signIn('a', 'b');
        } catch (err) {
            expect(err).toBeDefined();
        }
    })
    it('throws if an invalid password is provided', async () => {
        fakeUsersService.find = () => Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
        try {
            await service.signIn('a', 'b');
        } catch (err) {
            expect(err).toBeDefined();
        }
    })
    it('returns a user if correct password is provided', async () => {
        await service.signUp('a', 'password');
        const user = await service.signIn('a', 'password');

        expect(user).toBeDefined();


    })
})