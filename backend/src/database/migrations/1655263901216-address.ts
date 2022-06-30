import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { ETableName } from '@constants/entity.constant';

export class address1655263901216 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: ETableName.ADDRESSES,
                columns: [
                    {
                        name: 'id',
                        type: 'character varying',
                        isPrimary: true,
                    },
                    {
                        name: 'type',
                        type: 'integer',
                    },
                    {
                        name: 'address',
                        type: 'character varying',
                        length: '70',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(ETableName.CRAWL_STATUS);
    }
}
