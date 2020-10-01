import { ApiProperty } from '@nestjs/swagger';

export interface IDeleteResultDTO {
    message: string;
}

export class DeleteResultDTO implements IDeleteResultDTO {
    @ApiProperty()
    message: string;
}
