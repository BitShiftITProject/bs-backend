import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
require('dotenv').config();

const config = {
  name: 'mAtlas',
  connector: 'mongodb',
  url: `mongodb+srv://${process.env.ATLAS_USER_NAME}:${process.env.ATLAS_USER_PASSWORD}@cluster0.1hzjh.mongodb.net/${process.env.ATLAS_DB_NAME}?retryWrites=true&w=majority`,
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
export class MAtlasDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mAtlas';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mAtlas', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
