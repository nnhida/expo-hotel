-- CreateIndex
CREATE INDEX `Kamar_nomor_kamar_key` ON `kamar`(`nomor_kamar`);


ALTER TABLE `kamar` DROP FOREIGN KEY `Kamar_id_tipe_kamar_fkey`;
-- CreateIndex
DROP INDEX `Kamar_id_tipe_kamar_key` ON `kamar`;

-- CreateIndex
CREATE INDEX `Kamar_id_tipe_kamar_key` ON `kamar`(`id_tipe_kamar`);

ALTER TABLE `kamar` ADD CONSTRAINT `Kamar_id_tipe_kamar_fkey` FOREIGN KEY (`id_tipe_kamar`) REFERENCES `tipe_kamar`(`id_tipe_kamar`) ON DELETE CASCADE ON UPDATE CASCADE;