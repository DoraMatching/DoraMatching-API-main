import { applyDecorators, UseGuards } from '@nestjs/common';
import { ACGuard, Role, UseRoles } from "nest-access-control";
import { AuthGuard } from './auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth(...roles: Role[]) {
    return applyDecorators(
        UseGuards(AuthGuard, ACGuard),
        UseRoles(...roles),
        ApiBearerAuth()
    );
}