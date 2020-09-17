import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginateParams } from 'src/shared/pipes.params';
import { Repository } from 'typeorm';
import { UserDTO, UserRO } from './user.dto';
import { UserEntity } from './user.entity';

export interface IPagination<T> {
    items: T[];
    meta: any;
    links: any;
}

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    async showAll({ limit, page, order, route }: PaginateParams): Promise<IPagination<UserRO>> {
        // const users = await this.userRepository.find({});
        // return users.map(user => user.toResponseObject(false));
        const { items, meta, links } = await paginate<UserEntity>(this.userRepository, { limit, page, route }, { order: { id: order } });

        const result : IPagination<UserRO> =  {
            items: items.map(user => user.toResponseObject(false)),
            meta, links
        }

        return result;
    }

    async findByUsername(username: string): Promise<UserRO> {
        const user = await this.userRepository.findOne({
            where: { username }
        });
        return user.toResponseObject(false);
    }

    async login(data: UserDTO): Promise<UserRO> {
        const { username, password } = data;
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException('Invalid username/password', HttpStatus.FORBIDDEN);
        }
        return user.toResponseObject();
    }

    async register(data: UserDTO): Promise<UserRO> {
        const { username } = data;
        let user = await this.userRepository.findOne({ where: { username } });
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        user = await this.userRepository.create(data);
        await this.userRepository.save(user);
        return user.toResponseObject();
    }
}
