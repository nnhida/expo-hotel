import { user_role } from "@prisma/client";

export interface Iuser {
    id_user: string;
    nama_user: string;
    foto: string | null;
    email: string;
    password: string;
    role: user_role;
}

export interface ITipekamar {
    id_tipe_kamar?: string,
    nama_tipe_kamar: string,
    harga: number,
    deskripsi: string,
    foto: string,
}

export interface IKamar {
    id_kamar?: string,
    nomor_kamar: number,
    id_tipe_kamar: string,
}

export interface Ipesanan {
    id_pemesanan?: string,
    nomor_pemesanan: number,
    nama_pemesanan: string,
    email_pemesanan: string,
    tgl_pemesanan: Date,
    tgl_check_in: Date,
    tgl_check_out: Date,
    nama_tamu: string,
    jumlah_kamar: number,
    id_tipe_kamar: string,
    status_pemesanan: string,
    id_user: string
}

export interface Idetail{
    id_detail_pemesanan? :string,
    id_pemesanan: string,
    id_kamar: string,
    tgl_akses: Date,
    harga: number
}