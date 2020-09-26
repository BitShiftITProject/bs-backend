import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MAtlasDataSource} from '../datasources';
import {Pages, PagesRelations} from '../models';

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
