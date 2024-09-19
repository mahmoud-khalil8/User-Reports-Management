import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './users.entity';


describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;
  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({ id, email: 'a', password: 'b' } as User);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'b' } as User]);
      },
    };
    fakeAuthService = {
      // signUp: (email: string, password: string) => { },
      signIn: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      }

    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UsersService, useValue: fakeUsersService },
        { provide: AuthService, useValue: fakeAuthService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('finds a user by id', async () => {
    const user = await controller.findUser('1');
    expect(user.id).toEqual(1);
  });
  it('finds a user by email', async () => {
    const users = await controller.findUserByEmail('a');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('a');
  });
  it('throws an error if user not found', async () => {
    fakeUsersService.findOne = () => null;
    try {
      await controller.findUser('1');
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
  it('signs in a user', async () => {
    const session = { userId: -99 };
    const user = await controller.signIn({ email: 'a', password: 'b' }, session);
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });

});
