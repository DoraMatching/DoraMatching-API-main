import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class UserQuery {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  userId: string;
}
