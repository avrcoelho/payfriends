import { UserRepository } from '@/infrastructure/repositories/UserRepository';
import { GetUserId } from '../GetUserId';

let getUserId: GetUserId;
let userRepository: UserRepository;

describe('Get user id use case', () => {
  beforeEach(() => {
    userRepository = new UserRepository();
    getUserId = new GetUserId(userRepository);
  });

  it('should not be able to user id ', () => {
    const userId = getUserId.execute();

    expect(userId).toBeNull();
  });
});
