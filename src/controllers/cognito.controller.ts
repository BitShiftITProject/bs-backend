// import {inject} from '@loopback/core';
import {post, requestBody} from '@loopback/rest';
import AWS from 'aws-sdk';

require('dotenv').config();
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  region: 'ap-southeast-2',
});

export class CognitoController {
  constructor() {}

  @post('/cognito/signup', {
    responses: {
      '200': {
        description: 'Create new user in Cognito',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                Location: {type: 'string'},
                headers: {
                  type: 'object',
                  properties: {
                    'Content-Type': {type: 'string'},
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              Username: {
                type: 'string',
                id: 'true',
              },
              FirstName: {type: 'string'},
              LastName: {type: 'string'},
              Email: {type: 'string'},
              Password: {type: 'string'},
            },
          },
        },
      },
    })
    userData: {
      Email: string;
      Password: string;
      Username: string;
      FirstName: string;
      LastName: string;
    },
  ) {
    var params = {
      ClientId: process.env.COGNITO_CLIENT_ID!,
      Username: userData.Email,
      Password: userData.Password,
    };
    try {
      const res = await cognitoidentityserviceprovider.signUp(params).promise();
      return res;
    } catch (err) {
      throw err;
    }
  }

  @post('/cognito/authenticate', {
    responses: {
      '200': {
        description: 'Authenticate user with username and password',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                Location: {type: 'string'},
                headers: {
                  type: 'object',
                  properties: {
                    'Content-Type': {type: 'string'},
                  },
                },
              },
            },
          },
        },
      },
    },
  })
  async authenticate(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              Email: {type: 'string'},
              Password: {type: 'string'},
            },
          },
        },
      },
    })
    userData: {
      Email: string;
      Password: string;
    },
  ) {
    var params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: process.env.COGNITO_CLIENT_ID!,
      AuthParameters: {
        USERNAME: userData.Email,
        PASSWORD: userData.Password,
      },
    };

    try {
      const res = await cognitoidentityserviceprovider
        .initiateAuth(params)
        .promise();
      return res;
    } catch (err) {
      throw err;
    }
  }
}
