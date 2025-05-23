import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUniqueConstraintToUnitCode1747923513714 implements MigrationInterface {
    name = 'AddUniqueConstraintToUnitCode1747923513714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unit" ADD CONSTRAINT "UQ_dfb75cdb2a790fb84327e1d1b15" UNIQUE ("code")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unit" DROP CONSTRAINT "UQ_dfb75cdb2a790fb84327e1d1b15"`);
    }

}
