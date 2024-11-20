/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `mail` on the `users` table. All the data in the column will be lost.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    DROP COLUMN `mail`,
    ADD COLUMN `email` VARCHAR(100) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);