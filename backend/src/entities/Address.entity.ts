import { Column, Entity } from 'typeorm';

import { BaseEntityIncludeTime } from '@core/base-entity';

import { IAddressAttribute } from './attributes/Address.interface';

@Entity('Addresses')
export class AddressEntity extends BaseEntityIncludeTime implements IAddressAttribute {
    @Column({ name: 'address', type: 'character varying' })
    address: string;

    @Column({ name: 'type', type: 'integer' })
    type: number;
}
