import {Entity, model, property} from '@loopback/repository';

@model()
export class Users extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  first_name: string;

  @property({
    type: 'string',
    required: true,
  })
  cognito_id: string;

  @property({
    type: 'string',
    required: true,
  })
  last_name: string;

  @property({
    type: 'string',
    required: true,
    index: {
      unique: true,
    },
  })
  email: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  username: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  portfolios: string[];

  @property({
    type: 'string',
  })
  profile_email: string;

  @property({
    type: 'string',
  })
  occupation: string;

  @property({
    type: 'string',
  })
  description: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  tags: object[];

  @property({
    type: 'string',
  })
  phone: string;

  @property({
    type: 'string',
  })
  company: string;

  @property({
    type: 'string',
  })
  address_line_1: string;

  @property({
    type: 'string',
  })
  address_line_2: string;

  @property({
    type: 'string',
  })
  town_suburb: string;

  @property({
    type: 'string',
  })
  postcode: string;

  @property({
    type: 'string',
  })
  state: string;

  @property({
    type: 'string',
  })
  country: string;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
