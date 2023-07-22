function SinhVien() {
    // thuộc tính
    this.txtMaSV = '';
    this.txtTenSV = '';
    this.txtEmail = '';
    this.txtPass = '';
    this.txtNgaySinh = '';
    this.khSV = '';
    this.txtDiemToan = 0;
    this.txtDiemLy = 0;
    this.txtDiemHoa = 0;

    // phương thức 
    this.tinhDiemTrungBinh = function () {
        var tong = this.txtDiemToan*1 + this.txtDiemLy*1 + this.txtDiemHoa*1;
        return tong / 3;
    };
}

