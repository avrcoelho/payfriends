import { LocalStorage } from '../../storage/LocalStorage';
import { UserRepository } from '../UserRepository';

let userRepository: UserRepository;

describe('UserRepository', () => {
  beforeEach(() => {
    userRepository = new UserRepository();
  });

  it('should be able to get user id', () => {
    const userId = userRepository.getId();

    expect(userId).toBeNull();
  });

  it('should be able to get user id', () => {
    const localstorageSaveSpied = jest.spyOn(Storage.prototype, 'setItem');
    userRepository.saveId('test-id');

    expect(localstorageSaveSpied).toBeCalled();
  });

  it('should be able to delete user id', () => {
    const localstorageRemoveSpied = jest.spyOn(Storage.prototype, 'removeItem');
    userRepository.delete();

    expect(localstorageRemoveSpied).toBeCalled();
  });
});
