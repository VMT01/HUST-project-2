import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { ETableName } from '@constants/entity.constant';

export class createTransactionTable1650881300826 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: ETableName.TRANSACTIONS,
                columns: [
                    {
                        name: 'id',
                        type: 'character varying',
                        length: '50',
                        isPrimary: true,
                    },
                    {
                        name: 'hash',
                        type: 'character varying',
                    },
                    {
                        name: 'nonce',
                        type: 'decimal',
                    },
                    {
                        name: 'block_hash',
                        type: 'character varying',
                        isNullable: true,
                    },
                    {
                        name: 'block_number',
                        type: 'decimal',
                
                        isNullable: true,
                    },
                    {
                        name: 'transaction_index',
                        type: 'decimal',
                        isNullable: true,
                    },
                    {
                        name: 'from',
                        type: 'character varying',
                    },
                    {
                        name: 'to',
                        type: 'character varying',
                        isNullable: true,
                    },
                    {
                        name: 'value',
                        type: 'character varying',
                    },
                    {
                        name: 'gas_price',
                        type: 'character varying',
                    },
                    {
                        name: 'max_priority_fee_per_gas',
                        type: 'decimal',
                        isNullable: true,
                    },
                    {
                        name: 'max_fee_per_gas',
                        type: 'decimal',
                        isNullable: true,
                    },
                    {
                        name: 'gas',
                        type: 'decimal',
                    },
                    {
                        name: 'input',
                        type: 'character varying',
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
        await queryRunner.dropTable(ETableName.TRANSACTIONS);
    }
}
