-- AlterTable
ALTER TABLE `users` ADD COLUMN `bio` VARCHAR(500) NULL,
    ADD COLUMN `picture` VARCHAR(191) NOT NULL DEFAULT '/placeholder-user.webp';
