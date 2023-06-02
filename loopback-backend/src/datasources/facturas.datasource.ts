import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'facturas',
  connector: 'mongodb',
  url: '',
  host: '127.0.0.1',
  port: 0,
  user: 'root',
  password: '',
  database: 'facturas',
  useNewUrlParser: false
};

@lifeCycleObserver('datasource')
export class FacturasDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'facturas';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.facturas', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
