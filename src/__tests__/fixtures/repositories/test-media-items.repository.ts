import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MediaItems, MediaItemsRelations} from '../../../models';
import {TestDbDataSource} from '../datasources';

export class MediaItemsRepository extends DefaultCrudRepository<
  MediaItems,
  typeof MediaItems.prototype.id,
  MediaItemsRelations
  > {
  constructor(
    @inject('datasources.testDb') dataSource: TestDbDataSource,
  ) {
    super(MediaItems, dataSource);
  }
}
