import { createParamDecorator } from '@nestjs/common';

export const Email = createParamDecorator((_data, req) => {
  return req.email;
});
