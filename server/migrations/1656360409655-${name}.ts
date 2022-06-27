import { MigrationInterface, QueryRunner } from "typeorm";

export class ${name}1656360409655 implements MigrationInterface {
    name = '${name}1656360409655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "userUuid" character varying NOT NULL, "title" character varying NOT NULL, "tel" integer NOT NULL, "teg" integer NOT NULL, "price" integer NOT NULL, "about" character varying NOT NULL, "photoUrl" text, "address" character varying NOT NULL, "mapXY" text DEFAULT '{"t":"0","expires_at":"0"}', "views" integer DEFAULT '0', "createDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "role" character varying DEFAULT 'user', "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "hashpassword" character varying NOT NULL, "salt" character varying NOT NULL, "token" text DEFAULT '{"t":"0","expires_at":"0"}', "createDate" TIMESTAMP NOT NULL DEFAULT now(), "updateDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tegs" ("id" SERIAL NOT NULL, "teg" character varying NOT NULL, CONSTRAINT "PK_8f613ded71761c75b2c30c31e99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_329b8ae12068b23da547d3b4798" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_329b8ae12068b23da547d3b4798"`);
        await queryRunner.query(`DROP TABLE "tegs"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
