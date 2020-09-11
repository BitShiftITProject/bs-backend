import {DefaultCrudRepository} from '@loopback/repository';
import {Portfolios, PortfoliosRelations} from '../models';
import {MAtlasDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PortfoliosRepository extends DefaultCrudRepository<
  Portfolios,
  typeof Portfolios.prototype.title,
  PortfoliosRelations
> {
  constructor(
    @inject('datasources.mAtlas') dataSource: MAtlasDataSource,
  ) {
    super(Portfolios, dataSource);
  }
}
