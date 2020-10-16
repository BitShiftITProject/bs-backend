import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {MediaItems} from '../models';
import {MediaItemsRepository} from '../repositories';

export class MediaItemsController {
  constructor(
    @repository(MediaItemsRepository)
    public mediaItemsRepository : MediaItemsRepository,
  ) {}

  @post('/media-items', {
    responses: {
      '200': {
        description: 'MediaItems model instance',
        content: {'application/json': {schema: getModelSchemaRef(MediaItems)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MediaItems, {
            title: 'NewMediaItems',
            exclude: ['id'],
          }),
        },
      },
    })
    mediaItems: Omit<MediaItems, 'id'>,
  ): Promise<MediaItems> {
    return this.mediaItemsRepository.create(mediaItems);
  }

  @get('/media-items/count', {
    responses: {
      '200': {
        description: 'MediaItems model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(MediaItems) where?: Where<MediaItems>,
  ): Promise<Count> {
    return this.mediaItemsRepository.count(where);
  }

  @get('/media-items', {
    responses: {
      '200': {
        description: 'Array of MediaItems model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(MediaItems, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(MediaItems) filter?: Filter<MediaItems>,
  ): Promise<MediaItems[]> {
    return this.mediaItemsRepository.find(filter);
  }

  @patch('/media-items', {
    responses: {
      '200': {
        description: 'MediaItems PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MediaItems, {partial: true}),
        },
      },
    })
    mediaItems: MediaItems,
    @param.where(MediaItems) where?: Where<MediaItems>,
  ): Promise<Count> {
    return this.mediaItemsRepository.updateAll(mediaItems, where);
  }

  @get('/media-items/{id}', {
    responses: {
      '200': {
        description: 'MediaItems model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MediaItems, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MediaItems, {exclude: 'where'}) filter?: FilterExcludingWhere<MediaItems>
  ): Promise<MediaItems> {
    return this.mediaItemsRepository.findById(id, filter);
  }

  @patch('/media-items/{id}', {
    responses: {
      '204': {
        description: 'MediaItems PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MediaItems, {partial: true}),
        },
      },
    })
    mediaItems: MediaItems,
  ): Promise<void> {
    await this.mediaItemsRepository.updateById(id, mediaItems);
  }

  @put('/media-items/{id}', {
    responses: {
      '204': {
        description: 'MediaItems PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() mediaItems: MediaItems,
  ): Promise<void> {
    await this.mediaItemsRepository.replaceById(id, mediaItems);
  }

  @del('/media-items/{id}', {
    responses: {
      '204': {
        description: 'MediaItems DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.mediaItemsRepository.deleteById(id);
  }
}
