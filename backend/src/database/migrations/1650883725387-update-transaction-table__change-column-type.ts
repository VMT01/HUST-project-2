import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateTransactionTable_changeColumnType1650883725387 implements MigrationInterface {
    name = 'updateTransactionTable_changeColumnType1650883725387';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "maxPriorityFeePerGas"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "maxPriorityFeePerGas" integer`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "maxFeePerGas"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "maxFeePerGas" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "maxFeePerGas"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "maxFeePerGas" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "maxPriorityFeePerGas"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "maxPriorityFeePerGas" character varying`);
    }
}
