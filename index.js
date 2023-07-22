// CRUD: create (tạo), read (đọc), update (sửa), delete (xoá)
// nâng cao: validation dữ liệu, tìm kiếm dựa vào keyword, sort (lọc dữ liệu) 

var arrIdInput = [
    'txtMaSV', 'txtTenSV', 'txtEmail', 'txtPass', 'txtNgaySinh', 'khSV', 'txtDiemToan', 'txtDiemLy', 'txtDiemHoa',
];

var arrNotiInput = [
    'notiMaSV', 'notiTenSV', 'notiEmail', 'notiPass', 'notiNgaySinh', 'notiKHSV', 'notiDiemToan', 'notiDiemLy', 'notiDiemHoa',
];

// mảng arrSinhVien nên được để ngoài cùng nội dung file index vì nếu như để trong func thì khi  chạy hàm sẽ tạo mới lại mảng, để ngoài thì các chức năng khác mới có thể gọi tới và sử dụng mảng này
var arrSinhVien = [];

// thêm sinh viên
function themSinhVien() {
    // khi sử dụng onsubmit thì nó có 1 cơ chế chạy 1 lệnh get nên sẽ reload lại trang 
    // một hàm event.preventDefault() giúp ngăn chặn cơ chế reload lại trang của submit 
    event.preventDefault();
    console.log('submit');

    // tạo ra 1 đối tượng sinhVien từ lớp đối tượng SinhVien 
    var sinhVien = new SinhVien();
    // dùng 2 cách để lấy dữ liệu từ người dùng 
    // - cách 1: dùng vòng lặp chạy lấy dữ liệu
    for (var i = 0; i < arrIdInput.length; i++) {
        var value = document.getElementById(arrIdInput[i]).value;
        if (value == '') {
            // alert('vui lòng nhập dữ liệu');
            // console.log(arrIdInput[i]);
            
        };
        // arrIdInput[i] = 'txtMaSV'
        // value = 5 input có id là 'txtMaSV'
        sinhVien[arrIdInput[i]] = value;
    }
    console.log(sinhVien);

    // mình sẽ tạo ra 1 biến check dữ liệu, nếu như khi chạy vòng lặp, các thuộc tính có giá trị thì sẽ cho valid thành true, dùng valid để xem có nên thêm sinhVien vào mảng hay không
    var valid = true;
    
    valid = valid && kiemTraDuLieuRong(arrIdInput, arrNotiInput, sinhVien) && kiemTraEmail(sinhVien['txtEmail'], 'notiEmail');
    console.log(valid);

    

    
    



    console.log(valid);
    // dùng valid để check, nếu valid false tức là đang còn lỗi, sẽ không thêm dữ liệu vào, true thì ngược lại
    if (valid) {
        arrSinhVien.push(sinhVien);
        luuDuLieuLocal();
        renderGiaoDien();
        document.getElementById('formSinhVien').reset();
    }


    // chúng ta cần thêm 1 mảng giúp chứa tất cả các đối tượng sinh viên mà người dùng tạo ra 
    
    // arrSinhVien.push(sinhVien);
    // luuDuLieuLocal();
    // console.log(arrSinhVien);
    

    // clear các dữ liệu bên trên input khi 1 sinh viên đã được thêm thành công
    // document.getElementById('formSinhVien').reset();

    // renderGiaoDien();

    // - cách 2: dùng FormData 
    // event.target có nghĩa là đang trỏ tới thẻ đang có sự kiện đó xảy ra 
    // var arrValues = new FormData(event.target);
    // console.log(arrValues);
}

// function xoá sinh viên 
function xoaSinhVien(maSV) {
    console.log(maSV);
    // tạo ra 1 biến index 
    var index = -1;
    for (var i = 0; i < arrSinhVien.length; i++) {
        if (arrSinhVien[i].txtMaSV == maSV) {
            index = i;
        }
    }
    arrSinhVien.splice(index, 1);
    luuDuLieuLocal();
    console.log(arrSinhVien);
    renderGiaoDien();
}

function renderGiaoDien(newArr) {
    if (!newArr) {
        newArr = arrSinhVien;
    }
    // sau khi thêm sinh viên vào mảng sẽ chạy 1 vòng lặp để hiển thị dữ liệu lên người dùng
    var content = '';
    for (var i = 0; i < newArr.length; i++) {
        var sinhVien = newArr[i];
        // ở trong vòng lặp vì dữ liệu arrIdInput[i] nó được lấy lên từ local mà các Object được được lưu xuống local bị mất đi phương thức nên sinhVien.tinhDiemTrungBinh sẽ bị lỗi

        var newSinhVien = new SinhVien();
        // Object.assign giúp clone (truyền dữ liệu) 
        // Object.assign có 2 tham số, tham số đầu tiên là đối tượng muốn nhận dữ liệu, tham số thứ 2 là đối tượng muốn cho 
        Object.assign(newSinhVien, sinhVien);

        content += `
        <tr>
            <td>${newSinhVien.txtMaSV}</td>
            <td>${newSinhVien.txtTenSV}</td>
            <td>${newSinhVien.txtEmail}</td>
            <td>${newSinhVien.txtNgaySinh}</td>
            <td>${newSinhVien.khSV}</td>
            <td>${newSinhVien.tinhDiemTrungBinh()}</td>
            <td>
            <button class="btn btn-danger" onclick="xoaSinhVien('${newSinhVien.txtMaSV}')">Xoá</button>
            <button class="btn btn-warning" onclick="layThongTinSinhVien('${newSinhVien.txtMaSV}')">Sửa</button>
            </td>
        </tr>
        `;
    }
    // dom tới tbodySinhVien và gán content vào 
    document.getElementById('tbodySinhVien').innerHTML = content;
}

function luuDuLieuLocal() {
    // chuyển mảng thành dạng dữ liệu JSON.stringify trước khi lưu 
    var newArr = JSON.stringify(arrSinhVien);
    localStorage.setItem('arrSinhVien', newArr);
}

function layDuLieuLocal() {
    var arr = localStorage.getItem('arrSinhVien');
    console.log(arr);
    // lưu ý khi gọi dữ liệu từ local lên nếu khi đó dưới local không có key mà chúng ta cần tìm thì giá trị nhận được sẽ là null 
    if (arr != null) {
        // chuyển đổi dữ liệu về lại kiểu dữ liệu ban đầu
        var newArr = JSON.parse(arr);
        // vì các phương thức xử lý: thêm, xoá đều tác động vào arrSinhVien nhưng khi mới thì giá trị của arrSinhVien là [] nên ta sẽ gán mảng dưới local lên lại cho arrSinhVien
        arrSinhVien = newArr;
        renderGiaoDien();
    }
}
layDuLieuLocal();

function layThongTinSinhVien(maSV) {
    // vòng lặp để lấy được object thoả mãn maSV
    var sinhVien = {};
    for (var i = 0; i < arrSinhVien.length; i++) {
        if (arrSinhVien[i].txtMaSV == maSV) {
            sinhVien = arrSinhVien[i];
        }
    }
    // lấy dữ liệu từ sinhVien và gán lên các input 
    for (var z = 0; z < arrIdInput.length; z++) {
        document.getElementById(arrIdInput[z]).value = sinhVien[arrIdInput[z]];
    }
    // chỉnh thuộc tính readonly cho cho input maSV chặn ng dùng sửa
    document.getElementById('txtMaSV').readOnly = true;
    document.getElementById('btnCapNhat').style.display = 'inline-block';
}

function capNhatSinhVien() {
    // lấy dữ liệu từ người dùng về
    var sinhVien = new SinhVien;
    for (var i=0; i<arrIdInput.length; i++) {
        var value = document.getElementById(arrIdInput[i]).value;
        sinhVien[arrIdInput[i]] = value;
    }
    console.log(sinhVien);
    // tìm kiếm tới vị trí của dữ liệu sinh viên cũ đang đứng
    for (var z = 0; z<arrSinhVien.length; z++) {
        if (sinhVien.txtMaSV == arrSinhVien[z].txtMaSV) {
            arrSinhVien[z] = sinhVien;
            // mở lại input maSV
            document.getElementById('txtMaSV').readOnly = false;
            // cập nhật xong clear hết dữ liệu input 
            document.getElementById('formSinhVien').reset();
            // gọi render để cập nhật lại dữ liệu mới nhất lên giao diện
            renderGiaoDien();
            luuDuLieuLocal();
            // sau khi cập nhật xong, display none cho nút cập nhật 
            document.getElementById('btnCapNhat').style.display = 'none';
        }
    }
}
document.getElementById('btnCapNhat').onclick = capNhatSinhVien;

function timKiemSinhVien() {
    // phương thức event.target sẽ giúp tương tác với thẻ đang sử dụng function, giúp lấy ra Id, value, class... của thẻ
    var keyword = event.target.value.toLowerCase().trim();
    // chuyển đổi về lowercase và bỏ hết các khoảng cách
    // loại bỏ dấu khỏi keyword
    var newKeyWord = removeVietnameseTones(keyword);
    console.log(newKeyWord);
    // khi mà chức năng so sánh các chuỗi thì phải lưu ý

    var arrTimKiem = [];
    // hàm giúp kiểm tra xem ký tự này có nằm trong chữ đó hay không
    // includes
    for (var i=0; i<arrSinhVien.length; i++) {
        var tenSinhVien = arrSinhVien[i].txtTenSV.toLowerCase().trim();
        var newTenSinhVien = removeVietnameseTones(tenSinhVien);
        if (newTenSinhVien.includes(newKeyWord)) {
            arrTimKiem.push(arrSinhVien[i]);
        }
    }
    console.log(arrTimKiem);
}





// demo về tương tác với localStorage 
// phương thức setItem giúp thêm dữ liệu vào localStorage 
// tham số đầu tiên sẽ là tên của dữ liệu cần lưu xuống local 
// tham số thứ 2 là giá trị muốn lưu xuống local 
// chuyển đổi array hoặc Object thành 1 chuỗi JSON trước khi lưu xuống local 
// var stringSinhVien = JSON.stringify({
//     hoTen: 'Cường',
// });
// console.log(typeof stringSinhVien);
// localStorage.setItem('họ tên', stringSinhVien);

// // phương thức getItem giúp lấy dữ liệu từ local lên
// // tham số nhận vào sẽ là tên key muốn lấy
// var hoTen = localStorage.getItem('họ tên');
// // JSON.parse để chuyển chuỗi JSON thành định dạng dữ liệu ban đầu 
// var objectHoTen = JSON.parse(hoTen);
// console.log(typeof objectHoTen);

// phương thức removeItem giúp xoá đi dữ liệu lưu trữ dưới local 
// localStorage.removeItem('họ tên');