import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressRepository } from '@modules/addresses/providers/Address.repository';
import { AddressConsumer } from './providers/crons.service';
import { Web3Module } from '@shared/modules/web3/web3.module';
@Module({
    imports: [TypeOrmModule.forFeature([AddressRepository]),Web3Module],
    controllers: [],
    providers: [AddressConsumer],
})
export class CronModule {}
