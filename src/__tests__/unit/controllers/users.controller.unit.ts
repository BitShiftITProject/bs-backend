import {TokenService} from '@loopback/authentication';
import {MyUserService} from '@loopback/authentication-jwt';
import {UserProfile} from '@loopback/security';
import {
  createStubInstance,

  expect, sinon,

  StubbedInstanceWithSinonAccessor
} from '@loopback/testlab';
import {CognitoController, UsersController} from '../../../controllers';
import {Users} from "../../../models/index";
import {UsersRepository} from '../../../repositories';
import {givenUser} from '../../helpers';



describe('UsersController (unit)', () => {
  let jwtService: TokenService;
  let userService: MyUserService;
  let userProfile: UserProfile
  let usersRepository: StubbedInstanceWithSinonAccessor<UsersRepository>;
  let cognitoController: CognitoController;
  let usersController: UsersController;

  let aUser: Users;
  let aUserWithId: Users;
  let aChangedUser: Users;
  let aListOfUsers: Users[];
  beforeEach(resetRepositories);

  jwtService = {} as TokenService;
  userService = {} as MyUserService;
  userProfile = {} as UserProfile;

  usersRepository = createStubInstance(UsersRepository);
  cognitoController = new CognitoController();
  usersController = new UsersController(jwtService, userService, userProfile, usersRepository, cognitoController);

  describe('createUser', () => {
    it('creates a new user in database', async () => {
      const create = usersRepository.stubs.create;
      create.resolves(aUserWithId);
      const result = await usersController.create(aUser);
      expect(aUserWithId).to.eql(aUserWithId);
      sinon.assert.calledWith(create, aUser);

    });
  });

  function resetRepositories() {
    usersRepository = createStubInstance(UsersRepository);

    aUser = givenUser();

    aUserWithId = givenUser({
      username: 'steph',
    });

    aListOfUsers = [
      aUserWithId,
      givenUser({
        username: 'lebron',
        occupation: 'goat',
      }),
    ] as Users[];

    aChangedUser = givenUser({
      username: aUserWithId.username,
      occupation: 'chef',
    });
  }
});
