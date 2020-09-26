import {Entity, model, property, hasMany} from '@loopback/repository';
import {Pages} from './pages.model';

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
    type: 'string',
    required: true,
  })
  owner: string;

  @property({
    type: 'string',
  })
  usersId?: string;

  @hasMany(() => Pages)
  pages: Pages[];

  constructor(data?: Partial<Portfolios>) {
    super(data);
  }
}

export interface PortfoliosRelations {
  // describe navigational properties here
}

export type PortfoliosWithRelations = Portfolios & PortfoliosRelations;
