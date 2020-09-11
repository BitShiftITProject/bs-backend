import {DefaultCrudRepository} from '@loopback/repository';
import {Users, UsersRelations} from '../models';
import {MAtlasDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.email,
  UsersRelations
> {
  constructor(
    @inject('datasources.mAtlas') dataSource: MAtlasDataSource,
  ) {
    super(Users, dataSource);
  }
}
