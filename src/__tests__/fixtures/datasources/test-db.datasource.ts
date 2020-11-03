import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
require('dotenv').config();

const dbName = "bitshift_db_test";

const config = {
  name: 'testDb',
  connector: 'mongodb',
  url: `mongodb+srv://${process.env.ATLAS_USER_NAME}:${process.env.ATLAS_USER_PASSWORD}@cluster0.1hzjh.mongodb.net/${dbName}?retryWrites=true&w=majority`,
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class TestDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'testDb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.testDb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
