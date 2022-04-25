import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createCrawlStatusTable1650507235156 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'crawl_status',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        length: '50',
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
        await queryRunner.dropTable('crawl_status');
    }
}
