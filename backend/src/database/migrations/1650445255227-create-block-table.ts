import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createBlockTable1650445255227 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'blocks',
                columns: [
                    { name: 'id', type: 'character varying', length: '50', isPrimary: true },
                    { name: 'block_hash', type: 'character varying' },
                    { name: 'block_number', type: 'integer' },
                    { name: 'difficulty', type: 'character varying' },
                    { name: 'gas_limit', type: 'integer' },
                    { name: 'gas_used', type: 'integer' },
                    { name: 'logs_bloom', type: 'character varying' },
                    { name: 'miner', type: 'character varying' },
                    { name: 'nonce', type: 'character varying' },
                    { name: 'parent_hash', type: 'character varying' },
                    { name: 'receipts_root', type: 'character varying' },
                    { name: 'sha3_uncles', type: 'character varying' },
                    { name: 'size', type: 'integer' },
                    { name: 'state_root', type: 'character varying' },
                    { name: 'timestamp', type: 'character varying' },
                    { name: 'total_difficulty', type: 'character varying' },
                    { name: 'created_at', type: 'timestamp without time zone', default: 'CURRENT_TIMESTAMP' },
                    { name: 'updated_at', type: 'timestamp without time zone', default: 'CURRENT_TIMESTAMP' },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('blocks');
    }
}
