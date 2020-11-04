import {PagesController} from '../../../controllers';
import {PagesRepository} from '../../../repositories';
import {test_page_basic, test_page_empty} from '../../data';
import {TestDbDataSource} from '../../fixtures/datasources';

const assert = require("chai").assert;

describe('PagesController (unit)', () => {
  const testDb = new TestDbDataSource();
  const pagesRepository = new PagesRepository(testDb);
  const pagesController = new PagesController(pagesRepository);

  let id_page_empty, id_page_basic;

  describe('#create pages', () => {

    it('should create an empty page', async () => {
      const res = await pagesController.create(test_page_empty);
      // Store the id
      id_page_empty = res["id"];
      // Extract sections array
      const content = (({content}) => (content))(res)
      assert(content["sections"].length == 0);
    })

    it('should create a basic page', async () => {
      const res = await pagesController.create(test_page_basic);
      // Store the id
      id_page_basic = res["id"];
      // Extract sections array
      const content = (({content}) => (content))(res)
      const sections = content["sections"]
      assert(JSON.stringify(sections) == JSON.stringify(test_page_basic["content"]["sections"]))
    })

  })

  describe('#get pages', () => {

    it('should get a page by its id', async () => {
      const res = await pagesController.findById(id_page_empty);
      const picked = (({title, content}) => ({title, content}))(res)
      assert(JSON.stringify(test_page_empty) == JSON.stringify(picked));
    })

  })

  describe('#delete pages', () => {

  })

});
