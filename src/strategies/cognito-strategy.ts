import {
  HttpErrors,
  mergeSecuritySchemeToSpec,
  OASEnhancer,
  OpenApiSpec,
  Request
} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {AuthenticationStrategy} from '../types';

const {verifierFactory} = require('@southlane/cognito-jwt-verifier')

const verifier = verifierFactory({
  region: process.env.AWS_REGION || "ap-southeast-2",
  userPoolId: process.env.COGNITO_POOL_ID || "ap-southeast-2_sszL0sJDL",
  appClientId: process.env.COGNITO_CLIENT_ID || "7c772avb8631ofcue4ef0rka6l",
  tokenType: 'access', // either "access" or "id"
})

export class CognitoAuthenticationStrategy
  implements AuthenticationStrategy, OASEnhancer {
  name = 'cognito';

  constructor(
  ) {}

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token: string = this.extractCredentials(request);

    const payload = await verifier.verify(token);

    let userProfile: UserProfile = {
      [securityId]: payload["sub"]
    };

    return userProfile;
  }

  extractCredentials(request: Request): string {
    if (!request.headers.authorization) {
      throw new HttpErrors.Unauthorized(`Authorization header not found.`);
    }

    // for example : Bearer xxx.yyy.zzz
    const authHeaderValue = request.headers.authorization;

    if (!authHeaderValue.startsWith('Bearer')) {
      throw new HttpErrors.Unauthorized(
        `Authorization header is not of type 'Bearer'.`,
      );
    }

    //split the string into 2 parts : 'Bearer ' and the `xxx.yyy.zzz`
    const parts = authHeaderValue.split(' ');
    if (parts.length !== 2)
      throw new HttpErrors.Unauthorized(
        `Authorization header value has too many parts. It must follow the pattern: 'Bearer xx.yy.zz' where xx.yy.zz is a valid JWT token.`,
      );
    const token = parts[1];

    return token;
  }

  modifySpec(spec: OpenApiSpec): OpenApiSpec {
    return mergeSecuritySchemeToSpec(spec, this.name, {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    });
  }
}
