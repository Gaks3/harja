/*
  Warnings:

  - You are about to drop the column `createdAt` on the `soil_moistures` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `temperature_humidities` table. All the data in the column will be lost.
  - You are about to drop the `soil_moisture_data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `swithdata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `temperature_humidity_data` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `soil_moisture_data` DROP FOREIGN KEY `soil_moisture_data_soilMoistureId_fkey`;

-- DropForeignKey
ALTER TABLE `swithdata` DROP FOREIGN KEY `SwithData_switchId_fkey`;

-- DropForeignKey
ALTER TABLE `temperature_humidity_data` DROP FOREIGN KEY `temperature_humidity_data_temperatureHumidityId_fkey`;

-- AlterTable
ALTER TABLE `soil_moistures` DROP COLUMN `createdAt`,
    ADD COLUMN `moistureLevel` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `recordedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `switchs` ADD COLUMN `status` ENUM('on', 'off') NOT NULL DEFAULT 'off';

-- AlterTable
ALTER TABLE `temperature_humidities` DROP COLUMN `createdAt`,
    ADD COLUMN `humidity` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `recordedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `temperature` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `soil_moisture_data`;

-- DropTable
DROP TABLE `swithdata`;

-- DropTable
DROP TABLE `temperature_humidity_data`;
