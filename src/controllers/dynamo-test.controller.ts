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
import {DynamoTest} from '../models';
import {DynamoTestRepository} from '../repositories';

export class DynamoTestController {
  constructor(
    @repository(DynamoTestRepository)
    public dynamoTestRepository : DynamoTestRepository,
  ) {}

  @post('/dynamo-tests', {
    responses: {
      '200': {
        description: 'DynamoTest model instance',
        content: {'application/json': {schema: getModelSchemaRef(DynamoTest)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DynamoTest, {
            title: 'NewDynamoTest',
            exclude: ['id'],
          }),
        },
      },
    })
    dynamoTest: Omit<DynamoTest, 'id'>,
  ): Promise<DynamoTest> {
    return this.dynamoTestRepository.create(dynamoTest);
  }

  @get('/dynamo-tests/count', {
    responses: {
      '200': {
        description: 'DynamoTest model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(DynamoTest) where?: Where<DynamoTest>,
  ): Promise<Count> {
    return this.dynamoTestRepository.count(where);
  }

  @get('/dynamo-tests', {
    responses: {
      '200': {
        description: 'Array of DynamoTest model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(DynamoTest, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(DynamoTest) filter?: Filter<DynamoTest>,
  ): Promise<DynamoTest[]> {
    return this.dynamoTestRepository.find(filter);
  }

  @patch('/dynamo-tests', {
    responses: {
      '200': {
        description: 'DynamoTest PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DynamoTest, {partial: true}),
        },
      },
    })
    dynamoTest: DynamoTest,
    @param.where(DynamoTest) where?: Where<DynamoTest>,
  ): Promise<Count> {
    return this.dynamoTestRepository.updateAll(dynamoTest, where);
  }

  @get('/dynamo-tests/{id}', {
    responses: {
      '200': {
        description: 'DynamoTest model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DynamoTest, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DynamoTest, {exclude: 'where'}) filter?: FilterExcludingWhere<DynamoTest>
  ): Promise<DynamoTest> {
    return this.dynamoTestRepository.findById(id, filter);
  }

  @patch('/dynamo-tests/{id}', {
    responses: {
      '204': {
        description: 'DynamoTest PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DynamoTest, {partial: true}),
        },
      },
    })
    dynamoTest: DynamoTest,
  ): Promise<void> {
    await this.dynamoTestRepository.updateById(id, dynamoTest);
  }

  @put('/dynamo-tests/{id}', {
    responses: {
      '204': {
        description: 'DynamoTest PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() dynamoTest: DynamoTest,
  ): Promise<void> {
    await this.dynamoTestRepository.replaceById(id, dynamoTest);
  }

  @del('/dynamo-tests/{id}', {
    responses: {
      '204': {
        description: 'DynamoTest DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.dynamoTestRepository.deleteById(id);
  }
}
