-- DropForeignKey
ALTER TABLE `detail_pemesanan` DROP FOREIGN KEY `Detail_pemesanan_id_pemesanan_fkey`;

-- AddForeignKey
ALTER TABLE `detail_pemesanan` ADD CONSTRAINT `Detail_pemesanan_id_pemesanan_fkey` FOREIGN KEY (`id_pemesanan`) REFERENCES `pemesanan`(`id_pemesanan`) ON DELETE RESTRICT ON UPDATE CASCADE;
