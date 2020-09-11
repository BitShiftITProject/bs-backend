import {Model, model, property} from '@loopback/repository';

@model()
export class Portfolios extends Model {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  title: string;

  @property({
    type: 'object',
  })
  pages: object;

  @property({
    type: 'date',
    required: true,
  })
  date_created: string;

  @property({
    type: 'date',
    required: true,
  })
  owner: string;

  constructor(data?: Partial<Portfolios>) {
    super(data);
  }
}

export interface PortfoliosRelations {
  // describe navigational properties here
}

export type PortfoliosWithRelations = Portfolios & PortfoliosRelations;
