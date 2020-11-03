import {PortfoliosController, UsersPortfoliosController} from '../../../controllers';
import {Portfolios} from '../../../models';
import {MediaItemsRepository, PagesRepository, PortfoliosRepository, UsersRepository} from '../../../repositories';
import {test_portfolio_1, test_portfolio_2} from '../../data';
import {TestDbDataSource} from '../../fixtures/datasources';

const assert = require("chai").assert;

describe("PortfoliosController (unit)", () => {
  const testDb = new TestDbDataSource();
  const pagesRepository = new PagesRepository(testDb);
  const portfoliosRepository = new PortfoliosRepository(testDb, async () => pagesRepository);
  const mediaItemsRepository = new MediaItemsRepository(testDb);
  const usersRepository = new UsersRepository(testDb,
    async () => portfoliosRepository, async () => mediaItemsRepository);
  const usersPortfoliosController = new UsersPortfoliosController(usersRepository);
  const portfoliosController = new PortfoliosController(portfoliosRepository)

  let test_portfolio_1_id;
  let test_portfolio_2_id;

  describe("#create portfolios", () => {

    it("should create portfolio #1", async () => {
      const res = await portfoliosController.create(test_portfolio_1);
      test_portfolio_1_id = res.id
      // Extract title, description from res
      const picked = (({title, description}) => ({title, description}))(res)

      assert(JSON.stringify(test_portfolio_1) == JSON.stringify(picked));
    })

    it("should create portfolio #2", async () => {
      const res = await portfoliosController.create(test_portfolio_2);
      test_portfolio_2_id = res.id
      // Extract title, description, theme, and pageOrder from res
      const picked = (({title, description, theme, pageOrder}) =>
        ({title, description, theme, pageOrder}))(res)

      assert(JSON.stringify(test_portfolio_2) == JSON.stringify(picked));
    })
  })

  describe("#get portfolios", () => {

    it("should retrieve portfolio #1", async () => {
      const res = await portfoliosController.findById(test_portfolio_1_id);
      const picked = (({title, description}) => ({title, description}))(res)

      assert.equal(JSON.stringify(picked), JSON.stringify(test_portfolio_1))
    })

    it("should retrieve portfolio #2", async () => {
      const res = await portfoliosController.findById(test_portfolio_2_id);
      const picked = (({title, description, theme, pageOrder}) =>
        ({title, description, theme, pageOrder}))(res)

      assert.equal(JSON.stringify(picked), JSON.stringify(test_portfolio_2))
    })

  })

  describe("#patch portfolios", () => {

    it("should patch portfolio #1 description", async () => {
      const query = new Portfolios({description: "Updated portfolio #1 description"})
      const res = await portfoliosController.updateById(test_portfolio_1_id, query);
      // const picked = (({title, description}) => ({title, description}))(res)
      console.log(res)

      // assert.equal(JSON.stringify(picked), JSON.stringify(test_portfolio_1))
    })

    it("should patch portfolio #1 description", async () => {
      const query = new Portfolios({description: "Updated portfolio #2 description"})
      const res = await portfoliosController.updateById(test_portfolio_2_id, query);
      const picked = (({title, description}) => ({title, description}))(res)

      // assert.equal(JSON.stringify(picked), JSON.stringify(test_portfolio_1))
    })
  })

  describe("#delete portfolios", () => {

    it("should delete portfolio #1", async () => {
      const res = await portfoliosController.deleteById(test_portfolio_1_id);
      assert.equal(res["id"], test_portfolio_1_id);
    })

    it("should delete portfolio #2", async () => {
      const res = await portfoliosController.deleteById(test_portfolio_2_id);
      assert.equal(res["id"], test_portfolio_2_id);
    })
  })
});
