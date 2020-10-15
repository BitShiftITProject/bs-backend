import {Entity, model, property} from '@loopback/repository';

@model()
export class MediaItems extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  public_name: string;


  constructor(data?: Partial<MediaItems>) {
    super(data);
  }
}

export interface MediaItemsRelations {
  // describe navigational properties here
}

export type MediaItemsWithRelations = MediaItems & MediaItemsRelations;
