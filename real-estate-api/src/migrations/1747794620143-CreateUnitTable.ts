import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUnitTable1747794620143 implements MigrationInterface {
    name = 'CreateUnitTable1747794620143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "unit" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "code" character varying NOT NULL,
                "name" character varying NOT NULL,
                "description" text,
                "location" character varying NOT NULL,
                "amenities" jsonb NOT NULL DEFAULT '[]',
                "price" decimal(10,2) NOT NULL,
                "area" decimal(10,2) NOT NULL,
                "bedroom_count" integer NOT NULL,
                "bathroom_count" integer NOT NULL,
                "furnished" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "projectId" uuid,
                CONSTRAINT "PK_4252c4be609d2533b03c82d2fad" PRIMARY KEY ("id")
            )
        `);

        await queryRunner.query(`
            ALTER TABLE "unit"
            ADD CONSTRAINT "FK_d0c555ba854452ca05fd57a0cc3"
            FOREIGN KEY ("projectId")
            REFERENCES "project"("id")
            ON DELETE SET NULL
            ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "unit" DROP CONSTRAINT "FK_d0c555ba854452ca05fd57a0cc3"
        `);

        await queryRunner.query(`
            DROP TABLE "unit"
        `);
    }
} 