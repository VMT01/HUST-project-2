import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlockController } from './Address.controller';
import { AddressRepository } from './providers/Address.repository';
import { AddressService } from './providers/Address.service';

@Module({
    imports: [TypeOrmModule.forFeature([AddressRepository])],
    controllers: [BlockController],
    providers: [AddressService],
})
export class AddressModule {}
