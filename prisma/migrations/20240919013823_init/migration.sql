-- CreateTable
CREATE TABLE `User` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_user` VARCHAR(100) NOT NULL,
    `foto` TEXT NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` TEXT NOT NULL,
    `role` ENUM('ADMIN', 'RESEPSIONIS') NOT NULL DEFAULT 'RESEPSIONIS',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kamar` (
    `id_kamar` INTEGER NOT NULL AUTO_INCREMENT,
    `nomor_kamar` INTEGER NOT NULL,
    `id_tipe_kamar` INTEGER NOT NULL,

    UNIQUE INDEX `Kamar_nomor_kamar_key`(`nomor_kamar`),
    UNIQUE INDEX `Kamar_id_tipe_kamar_key`(`id_tipe_kamar`),
    PRIMARY KEY (`id_kamar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tipe_kamar` (
    `id_tipe_kamar` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_tipe_kamar` VARCHAR(100) NOT NULL,
    `harga` INTEGER NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `foto` TEXT NOT NULL,

    PRIMARY KEY (`id_tipe_kamar`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Detail_pemesanan` (
    `id_detail_pemesanan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_pemesanan` INTEGER NOT NULL,
    `id_kamar` INTEGER NOT NULL,
    `tgl_akses` DATE NOT NULL,
    `harga` INTEGER NOT NULL,

    UNIQUE INDEX `Detail_pemesanan_id_pemesanan_key`(`id_pemesanan`),
    PRIMARY KEY (`id_detail_pemesanan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pemesanan` (
    `id_pemesanan` INTEGER NOT NULL AUTO_INCREMENT,
    `nomor_pemesanan` INTEGER NOT NULL,
    `nama_pemesanan` VARCHAR(100) NOT NULL,
    `email_pemesanan` VARCHAR(100) NOT NULL,
    `tgl_pemesanan` TIMESTAMP NOT NULL,
    `tgl_check_in` DATE NOT NULL,
    `tgl_check_out` DATE NOT NULL,
    `nama_tamu` VARCHAR(100) NOT NULL,
    `jumlah_kamar` INTEGER NOT NULL,
    `id_tipe_kamar` INTEGER NOT NULL,
    `status_pemesanan` ENUM('BARU', 'CHECK_IN', 'CHECK_OUT') NOT NULL DEFAULT 'BARU',
    `id_user` INTEGER NOT NULL,

    UNIQUE INDEX `Pemesanan_nomor_pemesanan_key`(`nomor_pemesanan`),
    UNIQUE INDEX `Pemesanan_email_pemesanan_key`(`email_pemesanan`),
    PRIMARY KEY (`id_pemesanan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Kamar` ADD CONSTRAINT `Kamar_id_tipe_kamar_fkey` FOREIGN KEY (`id_tipe_kamar`) REFERENCES `Tipe_kamar`(`id_tipe_kamar`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_pemesanan` ADD CONSTRAINT `Detail_pemesanan_id_kamar_fkey` FOREIGN KEY (`id_kamar`) REFERENCES `Kamar`(`id_kamar`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Detail_pemesanan` ADD CONSTRAINT `Detail_pemesanan_id_pemesanan_fkey` FOREIGN KEY (`id_pemesanan`) REFERENCES `Pemesanan`(`id_pemesanan`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pemesanan` ADD CONSTRAINT `Pemesanan_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pemesanan` ADD CONSTRAINT `Pemesanan_id_tipe_kamar_fkey` FOREIGN KEY (`id_tipe_kamar`) REFERENCES `Tipe_kamar`(`id_tipe_kamar`) ON DELETE RESTRICT ON UPDATE CASCADE;
