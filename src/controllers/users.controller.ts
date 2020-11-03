import {authenticate, TokenService} from '@loopback/authentication';
import {
  MyUserService,
  TokenServiceBindings,
  UserServiceBindings,
} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
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
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {Users} from '../models';
import {UsersRepository} from '../repositories';
import {CognitoController} from './cognito.controller';

const userSchema = {
  type: 'object',
  properties: {
    first_name: {type: 'string'},
    last_name: {type: 'string'},
    email: {type: 'string'},
    password: {type: 'string'},
    username: {type: 'string'},
  },
};

@authenticate('cognito')
export class UsersController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @inject('controllers.CognitoController')
    public cognitoController: CognitoController,
  ) {}

  @get('/getUser', {
    responses: {
      '200': {
        description: 'Model instance for user from access token',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Users, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async getUser(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<Users[]> {
    const sub = currentUserProfile[securityId];
    return this.usersRepository.find({where: {cognito_id: sub}, limit: 3});
  }

  @get('/getUserSub', {
    responses: {
      '200': {
        description: '',
        schema: {
          type: 'string',
        },
      },
    },
  })
  async getUserSub(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<string> {
    return currentUserProfile[securityId];
  }

  @post('/users', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Users)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUsers',
          }),
        },
      },
    })
    users: Users,
  ): Promise<Users> {
    return this.usersRepository.create(users);
  }

  @authenticate.skip()
  @post('/addUser', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {
          'application/json': {
            schema: userSchema,
          },
        },
      },
    },
  })
  async addUser(
    @requestBody({
      content: {
        'application/json': {
          schema: userSchema,
        },
      },
    })
    userData: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      username: string;
    },
  ): Promise<object> {
    const cognitoUser = await this.cognitoController.createUser(
      userData.email,
      userData.password,
    );
    if (cognitoUser) {
      var users = {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        username: userData.username,
        cognito_id: cognitoUser.UserSub,
      };
      return this.usersRepository.create(users);
    } else {
      return {
        res: 'Failed creating user in cognito id',
      };
    }
  }

  @get('/users/count', {
    responses: {
      '200': {
        description: 'Users model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(@param.where(Users) where?: Where<Users>): Promise<Count> {
    return this.usersRepository.count(where);
  }

  @get('/users', {
    responses: {
      '200': {
        description: 'Array of Users model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Users, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(Users) filter?: Filter<Users>): Promise<Users[]> {
    return this.usersRepository.find(filter);
  }

  @patch('/users', {
    responses: {
      '200': {
        description: 'Users PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Users,
    @param.where(Users) where?: Where<Users>,
  ): Promise<Count> {
    return this.usersRepository.updateAll(users, where);
  }

  @get('/users/{id}', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Users, {exclude: 'where'})
    filter?: FilterExcludingWhere<Users>,
  ): Promise<Users> {
    return this.usersRepository.findById(id, filter);
  }

  @patch('/users/{id}', {
    responses: {
      '200': {
        description: 'Users PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Users,
  ): Promise<Object> {
    await this.usersRepository.updateById(id, users);
    return {id: id};
  }

  @put('/users/{id}', {
    responses: {
      '204': {
        description: 'Users PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() users: Users,
  ): Promise<void> {
    await this.usersRepository.replaceById(id, users);
  }

  @del('/users/{id}', {
    responses: {
      '204': {
        description: 'Users DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usersRepository.deleteById(id);
  }
}
