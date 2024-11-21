-- CreateTable
CREATE TABLE `users-mailer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `token` VARCHAR(100) NULL,
    `isVerified` BOOLEAN NULL,

    UNIQUE INDEX `users-mailer_username_key`(`username`),
    UNIQUE INDEX `users-mailer_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
