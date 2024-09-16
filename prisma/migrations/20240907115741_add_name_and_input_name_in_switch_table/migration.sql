/*
  Warnings:

  - Added the required column `inputName` to the `switchs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `switchs` ADD COLUMN `inputName` ENUM('lamp', 'pump') NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NULL;
