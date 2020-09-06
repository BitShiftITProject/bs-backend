import {Entity, model, property} from '@loopback/repository';

@model()
export class DynamoTest extends Entity {
  @property({
    type: 'string',
    id: true,
    keyType: "hash"
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  desc: string;


  constructor(data?: Partial<DynamoTest>) {
    super(data);
  }
}

export interface DynamoTestRelations {
  // describe navigational properties here
}

export type DynamoTestWithRelations = DynamoTest & DynamoTestRelations;
