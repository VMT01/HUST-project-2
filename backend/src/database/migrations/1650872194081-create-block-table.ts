import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { ETableName } from '@constants/entity.constant';

export class createBlockTable1650872194081 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: ETableName.BLOCKS,
                columns: [
                    {
                        name: 'id',
                        type: 'character varying',
                        length: '50',
                        isPrimary: true,
                    },
                    {
                        name: 'number',
                        type: 'decimal',
                    },
                    {
                        name: 'hash',
                        type: 'character varying',
                    },
                    {
                        name: 'parent_hash',
                        type: 'character varying',
                    },
                    {
                        name: 'nonce',
                        type: 'character varying',
                    },
                    {
                        name: 'sha3_uncles',
                        type: 'character varying',
                    },
                    {
                        name: 'logs_bloom',
                        type: 'character varying',
                    },
                    {
                        name: 'transaction_root',
                        type: 'character varying',
                        isNullable: true,
                    },
                    {
                        name: 'state_root',
                        type: 'character varying',
                    },
                    {
                        name: 'receipts_root',
                        type: 'character varying',
                    },
                    {
                        name: 'miner',
                        type: 'character varying',
                    },
                    {
                        name: 'extra_data',
                        type: 'character varying',
                    },
                    {
                        name: 'gas_limit',
                        type: 'decimal',
                    },
                    {
                        name: 'gas_used',
                        type: 'decimal',
                    },
                    {
                        name: 'timestamp',
                        type: 'character varying',
                    },
                    {
                        name: 'base_fee_per_gas',
                        type: 'decimal',
                        isNullable: true,
                    },
                    {
                        name: 'size',
                        type: 'decimal',
                    },
                    {
                        name: 'difficulty',
                        type: 'decimal',
                    },
                    {
                        name: 'total_difficulty',
                        type: 'decimal',
                    },
                    {
                        name: 'uncles',
                        type: 'character varying',
                        isArray: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp without time zone',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp without time zone',
                        default: 'CURRENT_TIMESTAMP',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(ETableName.BLOCKS);
    }
}
