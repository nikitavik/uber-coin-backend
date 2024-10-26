import 'fastify';

import { ExtendedJwtPayload } from './domian/auth/auth.service';

declare module 'fastify' {
  interface FastifyRequest {
    user?: ExtendedJwtPayload;
  }
}
