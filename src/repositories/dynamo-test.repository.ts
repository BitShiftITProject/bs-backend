import {DefaultCrudRepository} from '@loopback/repository';
import {DynamoTest, DynamoTestRelations} from '../models';
import {DynamodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class DynamoTestRepository extends DefaultCrudRepository<
  DynamoTest,
  typeof DynamoTest.prototype.id,
  DynamoTestRelations
> {
  constructor(
    @inject('datasources.dynamodb') dataSource: DynamodbDataSource,
  ) {
    super(DynamoTest, dataSource);
  }
}
