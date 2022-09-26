import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1664208934371 implements MigrationInterface {
    name = 'createTables1664208934371'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "emailsContact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "contactId" uuid, CONSTRAINT "PK_ac65d314a2b7f24683569a4218f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "phonesContact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone" character varying NOT NULL, "contactId" uuid, CONSTRAINT "PK_83c3d47bbdd4e8f975ff1f11444" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "emailsUser" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_4e31f07fa33d38dc3a1271cecfb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "phonesUser" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_d2d74be65e0d8a1304cbc87959d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying NOT NULL, "password" character varying, "isAdm" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "emailsContact" ADD CONSTRAINT "FK_e4e95b0562dd5e0cd510a97865a" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "phonesContact" ADD CONSTRAINT "FK_9a1b70f54048bffca7b37ee5685" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "emailsUser" ADD CONSTRAINT "FK_c6ad6ac937d814f54c6ef1c3df5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "phonesUser" ADD CONSTRAINT "FK_0945bf25c80964845e7d0869527" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_30ef77942fc8c05fcb829dcc61d"`);
        await queryRunner.query(`ALTER TABLE "phonesUser" DROP CONSTRAINT "FK_0945bf25c80964845e7d0869527"`);
        await queryRunner.query(`ALTER TABLE "emailsUser" DROP CONSTRAINT "FK_c6ad6ac937d814f54c6ef1c3df5"`);
        await queryRunner.query(`ALTER TABLE "phonesContact" DROP CONSTRAINT "FK_9a1b70f54048bffca7b37ee5685"`);
        await queryRunner.query(`ALTER TABLE "emailsContact" DROP CONSTRAINT "FK_e4e95b0562dd5e0cd510a97865a"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "phonesUser"`);
        await queryRunner.query(`DROP TABLE "emailsUser"`);
        await queryRunner.query(`DROP TABLE "phonesContact"`);
        await queryRunner.query(`DROP TABLE "emailsContact"`);
    }

}
