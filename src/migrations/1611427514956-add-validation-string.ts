import {MigrationInterface, QueryRunner} from "typeorm";

export class addValidationString1611427514956 implements MigrationInterface {
    name = 'addValidationString1611427514956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_entity` ADD `validation_string` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `user_entity` CHANGE `updated_at` `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_entity` CHANGE `updated_at` `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)");
        await queryRunner.query("ALTER TABLE `user_entity` DROP COLUMN `validation_string`");
    }

}
