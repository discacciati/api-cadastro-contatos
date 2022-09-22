import { MigrationInterface, QueryRunner } from "typeorm";

export class createTable1663848913280 implements MigrationInterface {
    name = 'createTable1663848913280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "emailContact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "contactId" uuid, CONSTRAINT "UQ_b4280b1bbac8c1d8ab66bd66ddc" UNIQUE ("email"), CONSTRAINT "UQ_b4280b1bbac8c1d8ab66bd66ddc" UNIQUE ("email"), CONSTRAINT "PK_941c622e6fed05ae4f8a9dcb4c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "phoneContact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone" character varying NOT NULL, "contactId" uuid, CONSTRAINT "PK_4e64ee9566af7e493125d1731c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "phoneUser" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_9b0eb0731b9c4e4a899813fe15e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "emailUser" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "userId" uuid, CONSTRAINT "UQ_2ea0edb37d18523e2e4d1ef0029" UNIQUE ("email"), CONSTRAINT "UQ_2ea0edb37d18523e2e4d1ef0029" UNIQUE ("email"), CONSTRAINT "PK_013150ccf4da877b0cf7482acf8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isAdm" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "emailContact" ADD CONSTRAINT "FK_3de3023f5e05bdbe663272e4790" FOREIGN KEY ("contactId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "phoneContact" ADD CONSTRAINT "FK_3ced1dcb0e2f8e4ad6c32e0bc0c" FOREIGN KEY ("contactId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "phoneUser" ADD CONSTRAINT "FK_867c8b785c624c483dcd6c73d9a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "emailUser" ADD CONSTRAINT "FK_8c1092daffae578f3539bf4e916" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "emailUser" DROP CONSTRAINT "FK_8c1092daffae578f3539bf4e916"`);
        await queryRunner.query(`ALTER TABLE "phoneUser" DROP CONSTRAINT "FK_867c8b785c624c483dcd6c73d9a"`);
        await queryRunner.query(`ALTER TABLE "phoneContact" DROP CONSTRAINT "FK_3ced1dcb0e2f8e4ad6c32e0bc0c"`);
        await queryRunner.query(`ALTER TABLE "emailContact" DROP CONSTRAINT "FK_3de3023f5e05bdbe663272e4790"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isAdm"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`DROP TABLE "emailUser"`);
        await queryRunner.query(`DROP TABLE "phoneUser"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "phoneContact"`);
        await queryRunner.query(`DROP TABLE "emailContact"`);
    }

}
