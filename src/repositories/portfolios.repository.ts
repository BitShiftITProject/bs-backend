import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Portfolios, PortfoliosRelations, Pages} from '../models';
import {MAtlasDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PagesRepository} from './pages.repository';

export class PortfoliosRepository extends DefaultCrudRepository<
  Portfolios,
  typeof Portfolios.prototype.title,
  PortfoliosRelations
> {

  public readonly pages: HasManyRepositoryFactory<Pages, typeof Portfolios.prototype.id>;

  constructor(
    @inject('datasources.mAtlas') dataSource: MAtlasDataSource, @repository.getter('PagesRepository') protected pagesRepositoryGetter: Getter<PagesRepository>,
  ) {
    super(Portfolios, dataSource);
    this.pages = this.createHasManyRepositoryFactoryFor('pages', pagesRepositoryGetter,);
    this.registerInclusionResolver('pages', this.pages.inclusionResolver);
  }
}
