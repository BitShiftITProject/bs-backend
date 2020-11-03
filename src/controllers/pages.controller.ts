import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,
  patch, post,
  put,
  requestBody
} from '@loopback/rest';
import {Pages} from '../models';
import {PagesRepository} from '../repositories';

export class PagesController {
  constructor(
    @repository(PagesRepository)
    public pagesRepository: PagesRepository,
  ) {}

  @post('/pages', {
    responses: {
      '200': {
        description: 'Pages model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pages)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pages, {
            title: 'NewPages',
          }),
        },
      },
    })
    pages: Pages,
  ): Promise<Pages> {
    return this.pagesRepository.create(pages);
  }

  @get('/pages/count', {
    responses: {
      '200': {
        description: 'Pages model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Pages) where?: Where<Pages>,
  ): Promise<Count> {
    return this.pagesRepository.count(where);
  }

  @get('/pages', {
    responses: {
      '200': {
        description: 'Array of Pages model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Pages, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Pages) filter?: Filter<Pages>,
  ): Promise<Pages[]> {
    return this.pagesRepository.find(filter);
  }

  @patch('/pages', {
    responses: {
      '200': {
        description: 'Pages PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pages, {partial: true}),
        },
      },
    })
    pages: Pages,
    @param.where(Pages) where?: Where<Pages>,
  ): Promise<Count> {
    return this.pagesRepository.updateAll(pages, where);
  }

  @get('/pages/{id}', {
    responses: {
      '200': {
        description: 'Pages model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Pages, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pages, {exclude: 'where'}) filter?: FilterExcludingWhere<Pages>
  ): Promise<Pages> {
    return this.pagesRepository.findById(id, filter);
  }

  @patch('/pages/{id}', {
    responses: {
      '204': {
        description: 'Pages PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pages, {partial: true}),
        },
      },
    })
    pages: Pages,
  ): Promise<void> {
    await this.pagesRepository.updateById(id, pages);
  }

  @put('/pages/{id}', {
    responses: {
      '204': {
        description: 'Pages PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pages: Pages,
  ): Promise<void> {
    await this.pagesRepository.replaceById(id, pages);
  }

  @del('/pages/{id}', {
    responses: {
      '204': {
        description: 'Pages DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pagesRepository.deleteById(id);
  }
}
