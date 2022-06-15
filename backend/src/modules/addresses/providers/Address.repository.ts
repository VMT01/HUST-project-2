import { EntityRepository } from 'typeorm';

import { ETableName } from '@constants/entity.constant';

import { BaseRepository } from '@core/base-repository';

import { AddressesRequestDto } from './dtos/address-request.dto';
import { AddressEntity } from '@entities/Address.entity';

@EntityRepository(AddressEntity)
export class AddressRepository extends BaseRepository<AddressEntity> {
    protected alias: ETableName = ETableName.ADDRESSES;
    buildQueryBuilder(params: AddressesRequestDto) {
        const { id, address, type } = params;
        const qb = this.createQb();
        qb.select([
            `${this.alias}.id`,
            `${this.alias}.address`,
            `${this.alias}.type`,
        ]);
        if (id) qb.where(`${this.alias}.id = :id`, { id });
        if (address) qb.where(`${this.alias}.address = :address`, { address });
        if (type) qb.where(`${this.alias}.type = :type`, { type });

        return qb;
    }
    async getMany(options: AddressesRequestDto) {
        const qb = this.buildQueryBuilder(options);

        this.queryBuilderAddPagination(qb, options);
        return await qb.getManyAndCount();
    }

    async getOne(options: AddressesRequestDto) {
        const qb = this.buildQueryBuilder(options);
        return await qb.getOne();
    }
    // mutate
    async createOne(newAddress:AddressEntity){

       return await this.create(newAddress);
    }
}
