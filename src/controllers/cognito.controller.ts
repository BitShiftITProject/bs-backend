// import {inject} from '@loopback/core';
import {post, requestBody} from '@loopback/rest';
import AWS from 'aws-sdk';

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  region: 'ap-southeast-2'
});

const clientId = "1845v8gfosmuf8ftpgjuuqm6fe";

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
              Email: {type: 'string'},
              Password: {type: 'string'}
            },
          },
        },
      },
    })
    userData: {Email: string, Password: string},
  ) {
    var params = {
      ClientId: clientId,
      Username: userData.Email,
      Password: userData.Password,
    };

    try {
      const res = await cognitoidentityserviceprovider.signUp(params).promise();
      return res
    } catch (err) {
      throw err
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
              Password: {type: 'string'}
            },
          },
        },
      },
    })
    userData: {Email: string, Password: string},
  ) {
    var params = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: clientId,
      AuthParameters: {
        USERNAME: userData.Email,
        PASSWORD: userData.Password,
      }
    };

    try {
      const res = await cognitoidentityserviceprovider.initiateAuth(params).promise();
      return res
    } catch (err) {
      throw err
    }
  }
}
