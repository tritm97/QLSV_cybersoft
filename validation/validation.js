function kiemTraDuLieuRong(arrIdInput,arrNotiInput,sinhVien) {
    var valid = true;
    for (var z=0; z<arrIdInput.length; z++) {
        // check xem có dữ liệu trong thuộc tính hay không
        if (sinhVien[arrIdInput[z]] == '') {
            
            valid = valid && false;
            document.getElementById(arrNotiInput[z]).innerHTML = 'Vui lòng nhập dữ liệu';
        } else {
            document.getElementById(arrNotiInput[z]).innerHTML = '';
            
            valid = valid && true;
        }
    }
    return valid;
}

function kiemTraEmail(valueEmail,notiInput) {
    // tạo biến lưu chuỗi regex 
    var regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // nếu dữ liệu chuẩn là email thì khi check nó sẽ trả về true 
    // nếu dữ liệu không phải là email thì khi check nó sẽ trả về false
    if (valueEmail !== '') {
        if (!regexEmail.test(valueEmail)) {
            document.getElementById(notiInput).innerHTML = 'Định dạng email không đúng';
            
            valid = valid && false;
            
        } else {
            // đầu tiên gán giá trị vào cho biến valid, và cho thẻ p của input email giá trị chuỗi rỗng
            document.getElementById(notiInput).innerHTML = '';
            
            valid = valid && true;
        }
    }
}