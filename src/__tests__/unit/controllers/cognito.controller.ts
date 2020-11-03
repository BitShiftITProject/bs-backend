import {CognitoController, UsersController, UsersPortfoliosController} from '../../../controllers';
import {MediaItemsRepository, PagesRepository, PortfoliosRepository, UsersRepository} from '../../../repositories';
import {TestDbDataSource} from '../../fixtures/datasources';

describe('CognitoController (unit)', () => {
  const testDb = new TestDbDataSource();
  const pagesRepository = new PagesRepository(testDb);
  const portfoliosRepository = new PortfoliosRepository(testDb, async () => pagesRepository);
  const mediaItemsRepository = new MediaItemsRepository(testDb);
  const usersRepository = new UsersRepository(testDb,
    async () => portfoliosRepository, async () => mediaItemsRepository);
  const cognitoController = new CognitoController();
  const usersController = new UsersController(usersRepository, cognitoController);
  const usersPortfoliosController = new UsersPortfoliosController(usersRepository);

  describe('creating user in Cognito', () => {
    it('should create a user without error', () => {
      const user = {
        Email: "test@test.com",
        Password: "Test123!"
      }
      const res = cognitoController.create(user);
    });
  })
});
