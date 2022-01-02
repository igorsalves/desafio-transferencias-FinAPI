import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;
let createUserUseCase: CreateUserUseCase;


describe('Show User Profile', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository);

    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to show user profile', async () => {
    const user: ICreateUserDTO = {
      email: 'user.test@finapi.com',
      name: 'User Test',
      password: '1234'
    }

    const userCreated = await createUserUseCase.execute(user);
    const userProfileCreated = await showUserProfileUseCase.execute(userCreated.id as string);

    expect(userProfileCreated).toHaveProperty('id');
  });

  it('should not be able to show user profile non existing user', async () => {
    await expect(async () => {
      await showUserProfileUseCase.execute('non-existing-user');
    }).rejects.toBeInstanceOf(ShowUserProfileError);
  });
});
