/*
  Warnings:

  - You are about to drop the column `moistureLevel` on the `soil_moistures` table. All the data in the column will be lost.
  - You are about to drop the column `recordedAt` on the `soil_moistures` table. All the data in the column will be lost.
  - You are about to drop the column `recordedAt` on the `switchs` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `switchs` table. All the data in the column will be lost.
  - You are about to drop the column `humidity` on the `temperature_humidities` table. All the data in the column will be lost.
  - You are about to drop the column `recordedAt` on the `temperature_humidities` table. All the data in the column will be lost.
  - You are about to drop the column `temperature` on the `temperature_humidities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `soil_moistures` DROP COLUMN `moistureLevel`,
    DROP COLUMN `recordedAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `switchs` DROP COLUMN `recordedAt`,
    DROP COLUMN `status`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `temperature_humidities` DROP COLUMN `humidity`,
    DROP COLUMN `recordedAt`,
    DROP COLUMN `temperature`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `soil_moisture_data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `soilMoistureId` INTEGER NOT NULL,
    `moistureLevel` INTEGER NOT NULL DEFAULT 0,
    `recordedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `temperature_humidity_data` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `temperatureHumidityId` INTEGER NOT NULL,
    `temperature` INTEGER NOT NULL DEFAULT 0,
    `humidity` INTEGER NOT NULL DEFAULT 0,
    `recordedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SwithData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `switchId` INTEGER NOT NULL,
    `status` ENUM('on', 'off') NOT NULL DEFAULT 'off',
    `recordedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `soil_moisture_data` ADD CONSTRAINT `soil_moisture_data_soilMoistureId_fkey` FOREIGN KEY (`soilMoistureId`) REFERENCES `soil_moistures`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `temperature_humidity_data` ADD CONSTRAINT `temperature_humidity_data_temperatureHumidityId_fkey` FOREIGN KEY (`temperatureHumidityId`) REFERENCES `temperature_humidities`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SwithData` ADD CONSTRAINT `SwithData_switchId_fkey` FOREIGN KEY (`switchId`) REFERENCES `switchs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
