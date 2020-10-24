import {DefaultCrudRepository} from '@loopback/repository';
import {MediaItems, MediaItemsRelations} from '../models';
import {MAtlasDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MediaItemsRepository extends DefaultCrudRepository<
  MediaItems,
  typeof MediaItems.prototype.id,
  MediaItemsRelations
> {
  constructor(
    @inject('datasources.mAtlas') dataSource: MAtlasDataSource,
  ) {
    super(MediaItems, dataSource);
  }
}
