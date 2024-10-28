/*
  Warnings:

  - Changed the type of `tgl_pemesanan` on the `pemesanan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `pemesanan` DROP COLUMN `tgl_pemesanan`,
    ADD COLUMN `tgl_pemesanan` TIMESTAMP NOT NULL;
