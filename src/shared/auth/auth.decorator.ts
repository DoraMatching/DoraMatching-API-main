import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ACGuard, Role, UseRoles } from 'nest-access-control';
import { AuthGuard } from './auth.guard';

export function Auth(...roles: Role[]) {
    return applyDecorators(UseGuards(AuthGuard, ACGuard), UseRoles(...roles), ApiBearerAuth());
}
