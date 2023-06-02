import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Facturas extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
  })
  fecha?: Date;

  @property.array(Object)
  articulos?: Array<{
    iditem: string;
    detalle: string;
    nombre: string;
    precio: number;
  }>;

  @property({
    type: 'number',
  })
  subtotal?: number;

  @property({
    type: 'number',
  })
  iva?: number;

  @property({
    type: 'number',
  })
  descuento?: number;

  @property({
    type: 'number',
  })
  total?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Facturas>) {
    super(data);
  }
}

export interface FacturasRelations {
  // describe navigational properties here
}

export type FacturasWithRelations = Facturas & FacturasRelations;
