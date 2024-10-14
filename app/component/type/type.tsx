export interface Iuser {
    id_user: number;
    nama_user: string;
    foto: string | null;
    email: string;
    password: string;
    role: string;
}

export interface ITipekamar {
    id_tipe_kamar?: number,
    nama_tipe_kamar: string,
    harga: number,
    deskripsi: string,
    foto: string,
}

export interface IKamar {
    id_kamar?: number,
    nomor_kamar: number,
    id_tipe_kamar: number,
}

export interface Ipesanan {
    id_pemesanan?: number,
    nomor_pemesanan: number,
    nama_pemesanan: string,
    email_pemesanan: string,
    tgl_pemesanan: Date,
    tgl_check_in: Date,
    tgl_check_out: Date,
    nama_tamu: string,
    jumlah_kamar: number,
    id_tipe_kamar: number,
    status_pemesanan: string,
    id_user: number
}

export interface Idetail{
    id_detail_pemesanan? :number,
    id_pemesanan: number,
    id_kamar: number,
    tgl_akses: Date,
    harga: number
}