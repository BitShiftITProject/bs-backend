import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MediaItems, Portfolios, Users, UsersRelations} from '../../../models';
import {TestDbDataSource} from '../datasources';
import {MediaItemsRepository} from './test-media-items.repository';
import {PortfoliosRepository} from './test-portfolios.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.email,
  UsersRelations
  > {

  public readonly portfolios: HasManyRepositoryFactory<Portfolios, typeof Users.prototype.username>;

  public readonly mediaItems: HasManyRepositoryFactory<MediaItems, typeof Users.prototype.username>;

  constructor(
    @inject('datasources.testDb') dataSource: TestDbDataSource, @repository.getter('PortfoliosRepository') public portfoliosRepositoryGetter: Getter<PortfoliosRepository>, @repository.getter('MediaItemsRepository') public mediaItemsRepositoryGetter: Getter<MediaItemsRepository>,
  ) {
    super(Users, dataSource);
    this.mediaItems = this.createHasManyRepositoryFactoryFor('mediaItems', mediaItemsRepositoryGetter,);
    this.registerInclusionResolver('mediaItems', this.mediaItems.inclusionResolver);
    this.portfolios = this.createHasManyRepositoryFactoryFor('portfolios', portfoliosRepositoryGetter,);
    this.registerInclusionResolver('portfolios', this.portfolios.inclusionResolver);
  }
}
