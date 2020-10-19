import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Users,
  MediaItems,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersMediaItemsController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/media-items', {
    responses: {
      '200': {
        description: 'Array of Users has many MediaItems',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MediaItems)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<MediaItems>,
  ): Promise<MediaItems[]> {
    return this.usersRepository.mediaItems(id).find(filter);
  }

  @post('/users/{id}/media-items', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(MediaItems)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Users.prototype.username,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MediaItems, {
            title: 'NewMediaItemsInUsers',
            exclude: ['id'],
            optional: ['usersId']
          }),
        },
      },
    }) mediaItems: Omit<MediaItems, 'id'>,
  ): Promise<MediaItems> {
    return this.usersRepository.mediaItems(id).create(mediaItems);
  }

  @patch('/users/{id}/media-items', {
    responses: {
      '200': {
        description: 'Users.MediaItems PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MediaItems, {partial: true}),
        },
      },
    })
    mediaItems: Partial<MediaItems>,
    @param.query.object('where', getWhereSchemaFor(MediaItems)) where?: Where<MediaItems>,
  ): Promise<Count> {
    return this.usersRepository.mediaItems(id).patch(mediaItems, where);
  }

  @del('/users/{id}/media-items', {
    responses: {
      '200': {
        description: 'Users.MediaItems DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(MediaItems)) where?: Where<MediaItems>,
  ): Promise<Count> {
    return this.usersRepository.mediaItems(id).delete(where);
  }
}
