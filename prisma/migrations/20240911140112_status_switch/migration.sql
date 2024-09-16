/*
  Warnings:

  - Added the required column `status` to the `switchs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `switchs` ADD COLUMN `status` ENUM('on', 'off') NOT NULL;
