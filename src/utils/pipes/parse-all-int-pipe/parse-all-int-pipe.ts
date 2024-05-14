import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseAllIntPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
      return value;
    }

    const transformedValue = {};
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        transformedValue[key] = parseInt(value[key], 10);
      }
    }
    return transformedValue;
  }
}
