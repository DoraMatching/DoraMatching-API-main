import { IsOptional, IsString } from 'class-validator';

export interface ICreateTrainerDTO {
    trainerProfile: string;
}

export class CreateTrainerDTO implements ICreateTrainerDTO {
    @IsString()
    @IsOptional()
    trainerProfile: string;
}
