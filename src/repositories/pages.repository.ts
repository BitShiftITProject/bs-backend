import {DefaultCrudRepository} from '@loopback/repository';
import {Pages, PagesRelations} from '../models';
import {MAtlasDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PagesRepository extends DefaultCrudRepository<
  Pages,
  typeof Pages.prototype.id,
  PagesRelations
> {
  constructor(
    @inject('datasources.mAtlas') dataSource: MAtlasDataSource,
  ) {
    super(Pages, dataSource);
  }
}
