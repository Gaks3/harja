/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `tools` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `tools_token_key` ON `tools`(`token`);
