import {Entity, hasMany, model, property} from '@loopback/repository';
import {MediaItems} from './media-items.model';
import {Portfolios} from './portfolios.model';

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

  @hasMany(() => Portfolios)
  portfolios: Portfolios[];

  @hasMany(() => MediaItems)
  mediaItems: MediaItems[];

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
