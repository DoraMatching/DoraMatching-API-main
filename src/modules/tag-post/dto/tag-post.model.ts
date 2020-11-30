import { ApiProperty } from '@nestjs/swagger';

export interface ITagPostModel {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class TagPostModel implements ITagPostModel {
  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
