/*
  Warnings:

  - You are about to drop the column `category` on the `switchs` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `switchs` table. All the data in the column will be lost.
  - Added the required column `recordedAt` to the `switchs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `switchs` DROP COLUMN `category`,
    DROP COLUMN `status`,
    ADD COLUMN `recordedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `pumps` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `toolId` INTEGER NOT NULL,
    `status` ENUM('on', 'off') NOT NULL,
    `recordedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pumps` ADD CONSTRAINT `pumps_toolId_fkey` FOREIGN KEY (`toolId`) REFERENCES `tools`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
