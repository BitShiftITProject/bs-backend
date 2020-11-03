import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Users, UsersRelations, Portfolios, MediaItems} from '../models';
import {MAtlasDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PortfoliosRepository} from './portfolios.repository';
import {MediaItemsRepository} from './media-items.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.email,
  UsersRelations
> {

  public readonly portfolios: HasManyRepositoryFactory<Portfolios, typeof Users.prototype.username>;

  public readonly mediaItems: HasManyRepositoryFactory<MediaItems, typeof Users.prototype.username>;

  constructor(
    @inject('datasources.mAtlas') dataSource: MAtlasDataSource, @repository.getter('PortfoliosRepository') protected portfoliosRepositoryGetter: Getter<PortfoliosRepository>, @repository.getter('MediaItemsRepository') protected mediaItemsRepositoryGetter: Getter<MediaItemsRepository>,
  ) {
    super(Users, dataSource);
    this.mediaItems = this.createHasManyRepositoryFactoryFor('mediaItems', mediaItemsRepositoryGetter,);
    this.registerInclusionResolver('mediaItems', this.mediaItems.inclusionResolver);
    this.portfolios = this.createHasManyRepositoryFactoryFor('portfolios', portfoliosRepositoryGetter,);
    this.registerInclusionResolver('portfolios', this.portfolios.inclusionResolver);
  }
}
