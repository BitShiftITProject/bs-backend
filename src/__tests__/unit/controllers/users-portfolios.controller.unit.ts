import {UsersPortfoliosController} from '../../../controllers';
import {MediaItemsRepository, PagesRepository, PortfoliosRepository, UsersRepository} from '../../../repositories';
import {test_portfolio_1, test_portfolio_2, test_user_1} from '../../data';
import {TestDbDataSource} from '../../fixtures/datasources';
const assert = require("chai").assert;

describe("UsersPortfoliosController (unit)", () => {
  const testDb = new TestDbDataSource();
  const pagesRepository = new PagesRepository(testDb);
  const portfoliosRepository = new PortfoliosRepository(testDb, async () => pagesRepository);
  const mediaItemsRepository = new MediaItemsRepository(testDb);
  const usersRepository = new UsersRepository(testDb,
    async () => portfoliosRepository, async () => mediaItemsRepository);
  const usersPortfoliosController = new UsersPortfoliosController(usersRepository);

  describe("#create user portfolios", () => {

    it("should create user portfolio #1", async () => {
      const res = await usersPortfoliosController.create(test_user_1.username, test_portfolio_1);
      // Extract title, description from res
      const picked = (({title, description}) => ({title, description}))(res)

      assert(JSON.stringify(test_portfolio_1) == JSON.stringify(picked) &&
        res.usersId == test_user_1.username);
    })

    it("should create user portfolio #2", async () => {
      const res = await usersPortfoliosController.create(test_user_1.username, test_portfolio_2);
      // Extract title, description, theme, and pageOrder from res
      const picked = (({title, description, theme, pageOrder}) =>
        ({title, description, theme, pageOrder}))(res)

      assert(JSON.stringify(test_portfolio_2) == JSON.stringify(picked) &&
        res.usersId == test_user_1.username);
    })
  })

  describe("#get user portfolios", () => {

    it("should retrieve both user portfolios", async () => {
      const res = await usersPortfoliosController.find(test_user_1.username);

      var res_filtered = res.map((portfolio) => {
        let portfolio_json = portfolio.toJSON()
        delete portfolio_json["id"]
        return portfolio_json
      })

      // expected userIds for created portfolios
      test_portfolio_1["usersId"] = test_user_1.username
      test_portfolio_2["usersId"] = test_user_1.username
      const match = [test_portfolio_1, test_portfolio_2]

      assert.equal(JSON.stringify(match), JSON.stringify(res_filtered))
    })

  })

  describe("#delete user portfolios", () => {

    it("should delete both user portfolios", async () => {
      const query = {title: test_portfolio_1.title}
      const res = await usersPortfoliosController.delete(test_user_1.username, query);
      assert.equal(res.count, 2);
    })
  })
});
