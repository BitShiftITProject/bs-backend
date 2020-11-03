import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Pages, PagesRelations} from '../../../models';
import {TestDbDataSource} from '../datasources';

export class PagesRepository extends DefaultCrudRepository<
  Pages,
  typeof Pages.prototype.id,
  PagesRelations
  > {
  constructor(
    @inject('datasources.testDb') dataSource: TestDbDataSource,
  ) {
    super(Pages, dataSource);
  }
}
