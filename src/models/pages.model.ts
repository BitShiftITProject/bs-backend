import {Entity, model, property} from '@loopback/repository';

@model()
export class Pages extends Entity {
  @property({
    type: 'object',
    required: true,
  })
  content: object;


  constructor(data?: Partial<Pages>) {
    super(data);
  }
}

export interface PagesRelations {
  // describe navigational properties here
}

export type PagesWithRelations = Pages & PagesRelations;
