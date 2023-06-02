import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {FacturasDataSource} from '../datasources/facturas.datasource';
import {Facturas, FacturasRelations} from '../models';

export class FacturasRepository extends DefaultCrudRepository<
  Facturas,
  typeof Facturas.prototype.id,
  FacturasRelations
> {
  constructor(
    @inject('datasources.facturas') dataSource: FacturasDataSource,
  ) {
    super(Facturas, dataSource);
  }
}
