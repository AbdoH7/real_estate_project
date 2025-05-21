import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1747789144545 implements MigrationInterface {
    name = ' $npmConfigName1747789144545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "website" character varying, "developerId" uuid, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_d0c555ba854452ca05fd57a0cc2" FOREIGN KEY ("developerId") REFERENCES "developer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_d0c555ba854452ca05fd57a0cc2"`);
        await queryRunner.query(`DROP TABLE "project"`);
    }

}
