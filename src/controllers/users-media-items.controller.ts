import {
  Count,
  CountSchema,
  Filter,
  repository, Where
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
import AWS from 'aws-sdk';
import {
  MediaItems, Users
} from '../models';
import {UsersRepository} from '../repositories';

const config = {
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint: process.env.S3_ENDPOINT
}
const s3 = new AWS.S3(config)
const bucket = "media-storage-bucket12"

export class UsersMediaItemsController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) {}

  // --------------------------------------------------------------------------
  @get('/users/{id}/media-items', {
    responses: {
      '200': {
        description: 'Array of Users has many MediaItems',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MediaItems)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<MediaItems>,
  ): Promise<MediaItems[]> {
    return this.usersRepository.mediaItems(id).find(filter);
  }

  // --------------------------------------------------------------------------
  @post('/users/{id}/media-items', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(MediaItems)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Users.prototype.username,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              public_name: {type: 'string'},
              file_type: {type: 'string'},
              stream: {type: 'string'}
            }
          }
          // schema: getModelSchemaRef(MediaItems, {
          //   title: 'NewMediaItemsInUsers',
          //   exclude: ['id'],
          //   optional: ['usersId']
          // }),
        },
      },
    }) mediaItems: {public_name: string, file_type: string, stream: string},
  ): Promise<Object> {
    const mediaItem = {
      public_name: mediaItems.public_name,
      file_type: mediaItems.file_type
    }
    try {
      var response = (await this.usersRepository.mediaItems(id).create(mediaItem))
      var media_id = response.getId().toString()
    } catch (err) {
      return (err)
    }

    return new Promise<Object>((resolve, reject) => {
      const params = {
        Bucket: bucket,
        Key: media_id,
        ContentEncoding: 'base64',
        ContentType: mediaItems.file_type,
        Body: mediaItems.stream
      }
      s3.upload(params, (err, result) => {
        if (err) return (err);
        else resolve(result)
      })
    })
    // return response
  }

  // --------------------------------------------------------------------------
  @patch('/users/{id}/media-items', {
    responses: {
      '200': {
        description: 'Users.MediaItems PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MediaItems, {partial: true}),
        },
      },
    })
    mediaItems: Partial<MediaItems>,
    @param.query.object('where', getWhereSchemaFor(MediaItems)) where?: Where<MediaItems>,
  ): Promise<Count> {
    return this.usersRepository.mediaItems(id).patch(mediaItems, where);
  }

  // --------------------------------------------------------------------------
  @del('/users/{id}/media-items', {
    responses: {
      '200': {
        description: 'Users.MediaItems DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(MediaItems)) where?: Where<MediaItems>,
  ): Promise<Count> {
    let self = this;
    let promise: Promise<Count> = Promise.resolve({count: 0});
    const params = {
      Bucket: bucket,
      Key: id
    }

    s3.deleteObject(params, function (err, data) {
      if (err) {
        console.log(err, err.stack);
      }
      else {
        console.log(data);
        promise = self.usersRepository.mediaItems(id).delete(where);
      };
    })

    return promise;
  }
}
