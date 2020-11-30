import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1606726443212 implements MigrationInterface {
    name = 'initialMigration1606726443212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user_entity` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `first_name` varchar(255) NULL, `last_name` varchar(255) NULL, `email` varchar(255) NOT NULL, `email_validated` tinyint NOT NULL DEFAULT 0, `role` enum ('super-admin', 'admin', 'moderator', 'user') NOT NULL DEFAULT 'user', `profile_image` varchar(255) NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `deleted_at` datetime(6) NULL, UNIQUE INDEX `IDX_fc3498378d1b4b10f0f72824b3` (`username`, `email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP INDEX `IDX_fc3498378d1b4b10f0f72824b3` ON `user_entity`");
        await queryRunner.query("DROP TABLE `user_entity`");
    }

}
