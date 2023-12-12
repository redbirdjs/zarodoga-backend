/*
  Warnings:

  - You are about to drop the column `ladasidatum` on the `zarodolgozatok` table. All the data in the column will be lost.
  - Added the required column `leadasidatum` to the `zarodolgozatok` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `zarodolgozatok` DROP COLUMN `ladasidatum`,
    ADD COLUMN `leadasidatum` DATE NOT NULL;
