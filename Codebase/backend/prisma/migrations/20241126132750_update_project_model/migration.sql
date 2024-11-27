/*
  Warnings:

  - You are about to drop the column `technologiesId` on the `project` table. All the data in the column will be lost.
  - You are about to drop the `_projecttechnologytouser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projecttechnology` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_projecttechnologytouser` DROP FOREIGN KEY `_ProjectTechnologyToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_projecttechnologytouser` DROP FOREIGN KEY `_ProjectTechnologyToUser_B_fkey`;

-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_technologiesId_fkey`;

-- DropIndex
DROP INDEX `Project_technologiesId_key` ON `project`;

-- AlterTable
ALTER TABLE `project` DROP COLUMN `technologiesId`,
    ADD COLUMN `tecnology` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_projecttechnologytouser`;

-- DropTable
DROP TABLE `projecttechnology`;
