-- AlterTable
ALTER TABLE `soil_moistures` MODIFY `moistureLevel` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `temperature_humidities` MODIFY `temperature` INTEGER NOT NULL DEFAULT 0,
    MODIFY `humidity` INTEGER NOT NULL DEFAULT 0;
