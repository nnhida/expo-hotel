-- DropForeignKey
ALTER TABLE `kamar` DROP FOREIGN KEY `Kamar_id_tipe_kamar_fkey`;

-- DropIndex
DROP INDEX `Kamar_nomor_kamar_key` ON `kamar`;

-- AddForeignKey
ALTER TABLE `kamar` ADD CONSTRAINT `kamar_id_tipe_kamar_fkey` FOREIGN KEY (`id_tipe_kamar`) REFERENCES `tipe_kamar`(`id_tipe_kamar`) ON DELETE RESTRICT ON UPDATE CASCADE;
