/*
  Warnings:

  - You are about to drop the column `projectId` on the `projectimage` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `projecttechnology` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectImagesId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[technologiesId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectImagesId` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `technologiesId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `projectimage` DROP FOREIGN KEY `ProjectImage_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `projecttechnology` DROP FOREIGN KEY `ProjectTechnology_projectId_fkey`;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `projectImagesId` INTEGER NOT NULL,
    ADD COLUMN `technologiesId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `projectimage` DROP COLUMN `projectId`;

-- AlterTable
ALTER TABLE `projecttechnology` DROP COLUMN `projectId`;

-- CreateIndex
CREATE UNIQUE INDEX `Project_projectImagesId_key` ON `Project`(`projectImagesId`);

-- CreateIndex
CREATE UNIQUE INDEX `Project_technologiesId_key` ON `Project`(`technologiesId`);

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_projectImagesId_fkey` FOREIGN KEY (`projectImagesId`) REFERENCES `ProjectImage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_technologiesId_fkey` FOREIGN KEY (`technologiesId`) REFERENCES `ProjectTechnology`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
