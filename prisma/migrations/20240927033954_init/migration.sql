-- DropForeignKey
ALTER TABLE `kamar` DROP FOREIGN KEY `Kamar_id_tipe_kamar_fkey`;

-- CreateIndex (conditional)
CREATE INDEX IF NOT EXISTS `Kamar_id_tipe_kamar_key` ON `kamar`(`id_tipe_kamar`);

-- AddForeignKey
ALTER TABLE `kamar` ADD CONSTRAINT `Kamar_id_tipe_kamar_fkey` FOREIGN KEY (`id_tipe_kamar`) REFERENCES `tipe_kamar`(`id_tipe_kamar`) ON DELETE CASCADE ON UPDATE CASCADE;