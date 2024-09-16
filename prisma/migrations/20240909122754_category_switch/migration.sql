/*
  Warnings:

  - You are about to alter the column `inputName` on the `switchs` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `VarChar(191)`.
  - Added the required column `category` to the `switchs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `switchs` ADD COLUMN `category` ENUM('lamp', 'pump') NOT NULL,
    MODIFY `inputName` VARCHAR(191) NOT NULL;
