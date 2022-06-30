import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressRepository } from '@modules/addresses/providers/Address.repository';

import { Web3Module } from '@shared/modules/web3/web3.module';

import { AddressConsumer } from './providers/crons.service';

@Module({
    imports: [TypeOrmModule.forFeature([AddressRepository]), Web3Module],
    controllers: [],
    providers: [AddressConsumer],
})
export class CronModule {}
