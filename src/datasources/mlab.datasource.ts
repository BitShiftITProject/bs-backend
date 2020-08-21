import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mlab',
  connector: 'mongodb',
  url: '',
  host: 'ds117868.mlab.com',
  port: 17868,
  user: 'admin',
  password: 'Admin123!',
  database: 'bitshift_db',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MlabDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mlab';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mlab', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
