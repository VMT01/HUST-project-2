import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

import { EEnvKey } from '@constants/env.constant';

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
    ],
    providers: [ConfigService],
    exports: [ConfigService],
})
export class ConfigurationModule {}
