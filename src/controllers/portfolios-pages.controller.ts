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
  Portfolios,
  Pages,
} from '../models';
import {PortfoliosRepository} from '../repositories';

export class PortfoliosPagesController {
  constructor(
    @repository(PortfoliosRepository) protected portfoliosRepository: PortfoliosRepository,
  ) { }

  @get('/portfolios/{id}/pages', {
    responses: {
      '200': {
        description: 'Array of Portfolios has many Pages',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pages)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pages>,
  ): Promise<Pages[]> {
    return this.portfoliosRepository.pages(id).find(filter);
  }

  @post('/portfolios/{id}/pages', {
    responses: {
      '200': {
        description: 'Portfolios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pages)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Portfolios.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pages, {
            title: 'NewPagesInPortfolios',
            exclude: ['id'],
            optional: ['portfoliosId']
          }),
        },
      },
    }) pages: Omit<Pages, 'id'>,
  ): Promise<Pages> {
    return this.portfoliosRepository.pages(id).create(pages);
  }

  @patch('/portfolios/{id}/pages', {
    responses: {
      '200': {
        description: 'Portfolios.Pages PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pages, {partial: true}),
        },
      },
    })
    pages: Partial<Pages>,
    @param.query.object('where', getWhereSchemaFor(Pages)) where?: Where<Pages>,
  ): Promise<Count> {
    return this.portfoliosRepository.pages(id).patch(pages, where);
  }

  @del('/portfolios/{id}/pages', {
    responses: {
      '200': {
        description: 'Portfolios.Pages DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pages)) where?: Where<Pages>,
  ): Promise<Count> {
    return this.portfoliosRepository.pages(id).delete(where);
  }
}
