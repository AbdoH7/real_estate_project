import { MigrationInterface, QueryRunner } from "typeorm";

export class AddMainImageUrl1747918932116 implements MigrationInterface {
    name = 'AddMainImageUrl1747918932116'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unit" DROP CONSTRAINT "FK_d0c555ba854452ca05fd57a0cc3"`);
        await queryRunner.query(`ALTER TABLE "unit" ADD "main_image_url" text`);
        await queryRunner.query(`ALTER TABLE "unit" ADD CONSTRAINT "FK_081a1021523202d85962a6ef10c" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "unit" DROP CONSTRAINT "FK_081a1021523202d85962a6ef10c"`);
        await queryRunner.query(`ALTER TABLE "unit" DROP COLUMN "main_image_url"`);
        await queryRunner.query(`ALTER TABLE "unit" ADD CONSTRAINT "FK_d0c555ba854452ca05fd57a0cc3" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
