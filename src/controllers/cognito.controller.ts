// import {inject} from '@loopback/core';
import {post, requestBody} from '@loopback/rest';
import AWS from 'aws-sdk';

AWS.config.region = 'ap-southeast-2';

const config = {
  region: process.env.S3_REGION,
  accessKeyId: process.env.S3_ACCESSKEYID,
  secretAccessKey: process.env.S3_SECRETACCESSKEY,
  endpoint: process.env.S3_ENDPOINT,
  AWS_REGION: process.env.S3_REGION
}

var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(config);
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
              Username: {type: 'string'},
              Password: {type: 'string'}
            },
          },
        },
      },
    })
    userData: {Username: string, Password: string},
  ) {
    var params = {
      ClientId: '5kd7oe2cm5gn26g5ip8sbvp1al',
      Password: 'Admin123!',
      Username: 'test@gmail.com'
    };
    cognitoidentityserviceprovider.signUp(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
        return err;
      } // an error occurred
      else {
        console.log(data);
        return data;
      };           // successful response
    })
  }
}
