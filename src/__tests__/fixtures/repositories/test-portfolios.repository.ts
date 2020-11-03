import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {Pages, Portfolios, PortfoliosRelations} from '../../../models';
import {TestDbDataSource} from '../datasources';
import {PagesRepository} from './test-pages.repository';

export class PortfoliosRepository extends DefaultCrudRepository<
  Portfolios,
  typeof Portfolios.prototype.title,
  PortfoliosRelations
  > {

  public readonly pages: HasManyRepositoryFactory<Pages, typeof Portfolios.prototype.id>;

  constructor(
    @inject('datasources.testDb') dataSource: TestDbDataSource, @repository.getter('PagesRepository') protected pagesRepositoryGetter: Getter<PagesRepository>,
  ) {
    super(Portfolios, dataSource);
    this.pages = this.createHasManyRepositoryFactoryFor('pages', pagesRepositoryGetter,);
    this.registerInclusionResolver('pages', this.pages.inclusionResolver);
  }
}
