import {Entity, model, property} from '@loopback/repository';

@model()
export class Pages extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'object',
    required: true,
  })
  content: object;

  @property({
    type: 'string',
  })
  portfoliosId?: string;

  constructor(data?: Partial<Pages>) {
    super(data);
  }
}

export interface PagesRelations {
  // describe navigational properties here
}

export type PagesWithRelations = Pages & PagesRelations;
