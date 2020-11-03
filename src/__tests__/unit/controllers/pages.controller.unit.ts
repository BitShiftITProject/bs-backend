import {PagesController} from '../../../controllers';
import {PagesRepository} from '../../../repositories';
import {test_page_basic, test_page_empty} from '../../data';
import {TestDbDataSource} from '../../fixtures/datasources';

const assert = require("chai").assert;

describe('PagesController (unit)', () => {
  const testDb = new TestDbDataSource();
  const pagesRepository = new PagesRepository(testDb);
  const pagesController = new PagesController(pagesRepository);

  describe('#create pages', () => {

    it('should create an empty page', async () => {
      const res = await pagesController.create(test_page_empty);
      // Extract sections array
      const content = (({content}) => (content))(res)
      assert(content["sections"].length == 0);
    })

    it('should create a basic page', async () => {
      const res = await pagesController.create(test_page_basic);
      // Extract sections array
      const content = (({content}) => (content))(res)
      const sections = content["sections"]
      assert(JSON.stringify(sections) == JSON.stringify(test_page_basic["content"]["sections"]))
    })

  })

});
