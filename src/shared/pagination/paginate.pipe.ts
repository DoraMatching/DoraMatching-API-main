import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class PaginatePipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any {
        return value;
    }

}
