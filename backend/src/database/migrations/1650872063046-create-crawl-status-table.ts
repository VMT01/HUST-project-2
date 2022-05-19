import { ETableName } from '@constants/entity.constant';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createCrawlStatusTable1650507235156 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: ETableName.CRAWL_STATUS,
                columns: [
                    {
                        name: 'id',
                        type: 'character varying',
                        isPrimary: true,
                    },
                    {
                        name: 'type',
                        type: 'character varying',
                    },
                    {
                        name: 'index',
                        type: 'integer',
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
        await queryRunner.dropTable(ETableName.CRAWL_STATUS);
    }
}
