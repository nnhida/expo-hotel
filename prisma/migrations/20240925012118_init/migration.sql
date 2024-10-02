/*
  Warnings:

  - You are about to alter the column `tgl_pemesanan` on the `pemesanan` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `pemesanan` MODIFY `tgl_pemesanan` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `foto` TEXT NULL;
