import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTransactionTable1650881300826 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'transactions',
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
                        type: 'integer',
                    },
                    {
                        name: 'block_hash',
                        type: 'character varying',
                        isNullable: true,
                    },
                    {
                        name: 'block_number',
                        type: 'integer',
                        isNullable: true,
                    },
                    {
                        name: 'transaction_index',
                        type: 'integer',
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
                        type: 'character varying',
                        isNullable: true,
                    },
                    {
                        name: 'max_fee_per_gas',
                        type: 'character varying',
                    },
                    {
                        name: 'gas',
                        type: 'integer',
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
        await queryRunner.dropTable('transactions');
    }
}
