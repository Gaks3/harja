-- AlterTable
ALTER TABLE `pumps` MODIFY `status` ENUM('on', 'off') NOT NULL DEFAULT 'off';

-- AlterTable
ALTER TABLE `switchs` MODIFY `status` ENUM('on', 'off') NOT NULL DEFAULT 'off';
