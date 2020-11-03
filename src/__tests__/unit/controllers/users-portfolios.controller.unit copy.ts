import {CognitoController, UsersController, UsersPortfoliosController} from '../../../controllers';
import {MediaItemsRepository, PagesRepository, PortfoliosRepository, UsersRepository} from '../../../repositories';
import {test_portfolio_1, test_user_1} from '../../data';
import {TestDbDataSource} from '../../fixtures/datasources';

const assert = require("chai").assert;

describe("UsersPortfoliosController (unit)", () => {
  const testDb = new TestDbDataSource();
  const pagesRepository = new PagesRepository(testDb);
  const portfoliosRepository = new PortfoliosRepository(testDb, async () => pagesRepository);
  const mediaItemsRepository = new MediaItemsRepository(testDb);
  const usersRepository = new UsersRepository(testDb,
    async () => portfoliosRepository, async () => mediaItemsRepository);
  const cognitoController = new CognitoController();
  const usersController = new UsersController(usersRepository, cognitoController);
  const usersPortfoliosController = new UsersPortfoliosController(usersRepository);

  describe("#create user portfolio", () => {

    it("should create portfolio without error", async () => {
      const res = await usersPortfoliosController.create(test_user_1.username, test_portfolio_1);
      const picked = (({title, description}) => ({title, description}))(res)

      assert.equal(JSON.stringify(test_portfolio_1), JSON.stringify(picked));
    })
  })

  describe("#delete user portfolio", () => {

    it("should delete portfolio without error", async () => {
      const query = test_portfolio_1.toJSON()
      const res = await usersPortfoliosController.delete(test_user_1.username, query);
      assert(res.count > 0);
    })
  })
});
