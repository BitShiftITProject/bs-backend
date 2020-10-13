import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Users, UsersRelations, Portfolios} from '../models';
import {MAtlasDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PortfoliosRepository} from './portfolios.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.email,
  UsersRelations
> {

  public readonly portfolios: HasManyRepositoryFactory<Portfolios, typeof Users.prototype.username>;

  constructor(
    @inject('datasources.mAtlas') dataSource: MAtlasDataSource, @repository.getter('PortfoliosRepository') protected portfoliosRepositoryGetter: Getter<PortfoliosRepository>,
  ) {
    super(Users, dataSource);
    this.portfolios = this.createHasManyRepositoryFactoryFor('portfolios', portfoliosRepositoryGetter,);
    this.registerInclusionResolver('portfolios', this.portfolios.inclusionResolver);
  }
}
