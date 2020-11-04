import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {Portfolios} from '../models';
import {PortfoliosRepository} from '../repositories';

export class PortfoliosController {
  constructor(
    @repository(PortfoliosRepository)
    public portfoliosRepository: PortfoliosRepository,
  ) {}

  @post('/portfolios', {
    responses: {
      '200': {
        description: 'Portfolios model instance',
        content: {'application/json': {schema: getModelSchemaRef(Portfolios)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Portfolios, {
            title: 'NewPortfolios',
          }),
        },
      },
    })
    portfolios: Portfolios,
  ): Promise<Portfolios> {
    return this.portfoliosRepository.create(portfolios);
  }

  @get('/portfolios/count', {
    responses: {
      '200': {
        description: 'Portfolios model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Portfolios) where?: Where<Portfolios>,
  ): Promise<Count> {
    return this.portfoliosRepository.count(where);
  }

  @get('/portfolios', {
    responses: {
      '200': {
        description: 'Array of Portfolios model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Portfolios, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Portfolios) filter?: Filter<Portfolios>,
  ): Promise<Portfolios[]> {
    return this.portfoliosRepository.find(filter);
  }

  @patch('/portfolios', {
    responses: {
      '200': {
        description: 'Portfolios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Portfolios, {partial: true}),
        },
      },
    })
    portfolios: Portfolios,
    @param.where(Portfolios) where?: Where<Portfolios>,
  ): Promise<Count> {
    return this.portfoliosRepository.updateAll(portfolios, where);
  }

  @get('/portfolios/{id}', {
    responses: {
      '200': {
        description: 'Portfolios model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Portfolios, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Portfolios, {exclude: 'where'})
    filter?: FilterExcludingWhere<Portfolios>,
  ): Promise<Portfolios> {
    return this.portfoliosRepository.findById(id, filter);
  }

  @patch('/portfolios/{id}', {
    responses: {
      '200': {
        description: 'Portfolios PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Portfolios, {partial: true}),
        },
      },
    })
    portfolios: Portfolios,
    @param.filter(Portfolios, {exclude: 'where'})
    filter?: FilterExcludingWhere<Portfolios>,
  ): Promise<Portfolios> {
    await this.portfoliosRepository.updateById(id, portfolios);
    return this.portfoliosRepository.findById(id, filter);
  }

  @put('/portfolios/{id}', {
    responses: {
      '204': {
        description: 'Portfolios PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() portfolios: Portfolios,
  ): Promise<void> {
    await this.portfoliosRepository.replaceById(id, portfolios);
  }

  @del('/portfolios/{id}', {
    responses: {
      '200': {
        description: 'Portfolios DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<Object> {
    await this.portfoliosRepository.deleteById(id);
    return {id: id};
  }
}
