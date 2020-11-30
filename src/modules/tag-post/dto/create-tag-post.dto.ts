import { ApiProperty } from '@nestjs/swagger';
import { ITagPostModel } from '@tag-post/dto';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export type ICreateTagPostDTO = Pick<ITagPostModel, 'name'>;

export class CreateTagPostDTO implements ICreateTagPostDTO {
  @ApiProperty({ example: 'java' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z][a-zA-Z0-9\-+#@]{0,42}$/, { message: 'Invalid tag name.' })
  @MinLength(1)
  @MaxLength(43, {
    message:
      'The text you wrote is longer than "the-quick-brown-fox-jumps-over-the-lazy-dog"! Please write less...',
  })
  name: string;
}
