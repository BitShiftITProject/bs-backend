import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Portfolios, Users
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersPortfoliosController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) {}

  @get('/users/{id}/portfolios', {
    responses: {
      '200': {
        description: 'Array of Users has many Portfolios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Portfolios)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Portfolios>,
  ): Promise<Portfolios[]> {
    return this.usersRepository.portfolios(id).find(filter);
  }

  @post('/users/{id}/portfolios', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Portfolios)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Users.prototype.username,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Portfolios, {
            title: 'NewPortfoliosInUsers',
            exclude: ['id'],
            optional: ['usersId']
          }),
        },
      },
    }) portfolios: Omit<Portfolios, 'id'>,
  ): Promise<Portfolios> {
    return this.usersRepository.portfolios(id).create(portfolios);
  }

  @patch('/users/{id}/portfolios', {
    responses: {
      '200': {
        description: 'Users.Portfolios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Portfolios, {partial: true}),
        },
      },
    })
    portfolios: Partial<Portfolios>,
    @param.query.object('where', getWhereSchemaFor(Portfolios)) where?: Where<Portfolios>,
  ): Promise<Count> {
    return this.usersRepository.portfolios(id).patch(portfolios, where);
  }

  @del('/users/{id}/portfolios', {
    responses: {
      '200': {
        description: 'Users.Portfolios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Portfolios)) where?: Where<Portfolios>,
  ): Promise<Count> {
    return this.usersRepository.portfolios(id).delete(where);
  }
}
