import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const OrderBy = createParamDecorator(
  (data: Array<string>, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const orderBy = request.query.orderBy as string;

    if (!orderBy) return;

    const [rule, dir] = orderBy.split(':');

    if (!data.includes(rule)) {
      throw new BadRequestException('Invalid orderBy field');
    }

    if (!['asc', 'desc'].includes(dir) || !rule) {
      throw new BadRequestException('Invalid orderBy format');
    }

    return {
      [rule]: dir,
    };
  },
);
