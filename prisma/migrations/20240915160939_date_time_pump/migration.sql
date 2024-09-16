/*
  Warnings:

  - Added the required column `dateAt` to the `pumps` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeAt` to the `pumps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pumps` ADD COLUMN `dateAt` DATE NOT NULL,
    ADD COLUMN `timeAt` TIME NOT NULL;
