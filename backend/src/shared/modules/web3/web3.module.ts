import { Module } from '@nestjs/common';

import { Connection } from './providers/web3.service';

@Module({
    exports: [Connection],
    providers: [Connection],
})
export class Web3Module {}
