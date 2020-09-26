import {Entity, model, property} from '@loopback/repository';

@model()
export class Portfolios extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    generated: false,
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  description: string;

  @property({
    type: 'object',
  })
  pages: object;

  @property({
    type: 'string',
    required: true,
  })
  owner: string;

  @property({
    type: 'string',
  })
  usersId?: string;

  constructor(data?: Partial<Portfolios>) {
    super(data);
  }
}

export interface PortfoliosRelations {
  // describe navigational properties here
}

export type PortfoliosWithRelations = Portfolios & PortfoliosRelations;
