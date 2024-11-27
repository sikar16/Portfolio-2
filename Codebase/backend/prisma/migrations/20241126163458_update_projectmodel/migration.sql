/*
  Warnings:

  - You are about to drop the column `projectImagesId` on the `project` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `ProjectImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_projectImagesId_fkey`;

-- DropIndex
DROP INDEX `Project_projectImagesId_key` ON `project`;

-- AlterTable
ALTER TABLE `project` DROP COLUMN `projectImagesId`;

-- AlterTable
ALTER TABLE `projectimage` ADD COLUMN `projectId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ProjectImage` ADD CONSTRAINT `ProjectImage_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
