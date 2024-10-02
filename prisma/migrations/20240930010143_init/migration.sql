
ALTER TABLE `detail_pemesanan` DROP FOREIGN KEY `Detail_pemesanan_id_pemesanan_fkey`;

DROP INDEX `Detail_pemesanan_id_pemesanan_key` ON `detail_pemesanan`;

-- CreateIndex
CREATE INDEX `Detail_pemesanan_id_pemesanan_key` ON `detail_pemesanan`(`id_pemesanan`);

ALTER TABLE `detail_pemesanan` ADD CONSTRAINT `Detail_pemesanan_id_pemesanan_fkey` FOREIGN KEY (`id_pemesanan`) REFERENCES `pemesanan`(`id_pemesanan`) ON DELETE CASCADE ON UPDATE CASCADE;
