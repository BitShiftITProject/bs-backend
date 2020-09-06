// import {inject} from '@loopback/core';
import {post, requestBody} from '@loopback/rest';
import AWS from 'aws-sdk';

const config = {
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_ACCESSKEYID,
  secretAccessKey: process.env.S3_SECRETACCESSKEY,
  endpoint: process.env.S3_ENDPOINT,
  AWS_REGION: process.env.S3_REGION
}

const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({
  region: 'ap-southeast-2'
});

export class CognitoController {
  constructor() {}

  @post('/cognito/signup', {
    responses: {
      '200': {
        description: 'Bucket creation response',
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
      ClientId: "1845v8gfosmuf8ftpgjuuqm6fe",
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
}
