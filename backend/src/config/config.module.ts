import { Global, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { EEnvKey } from '@constants/env.constant';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
            validationSchema: Joi.object({
                [EEnvKey.NODE_ENV]: Joi.string().valid('development', 'production'),
                [EEnvKey.PORT]: Joi.number().default(3000),
                [EEnvKey.GLOBAL_PREFIX]: Joi.string(),
                [EEnvKey.SWAGGER_PATH]: Joi.string(),

                /* Crawler */
                [EEnvKey.PROVIDER]: Joi.string(),
                [EEnvKey.START_BLOCK]: Joi.number().default(1),
            }),
        }),
        BullModule.registerQueue({
            name:"address",
            redis: {
                host: 'localhost',
                port: 6379,
            },
        }),
    ],
    providers: [ConfigService],
    exports: [ConfigService,BullModule],
})
export class ConfigurationModule { }
