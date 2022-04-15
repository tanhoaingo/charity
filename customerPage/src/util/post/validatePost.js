export default function validatePost(values){
    let errors = {};

    if(!values.title.trim()){
        errors.title = "Tên bài viết không được bỏ trống";
    }
    if(!values.organization.trim()){
        errors.organization = "Tên tổ chức không được bỏ trống";
    }
    if(!values.expectation.trim()){
        errors.expectation = "Số tiền không được bỏ trống";
    }
    if(!values.expirationDate.trim()){
        errors.expirationDate = "Ngày hết hạn không được bỏ trống";
    }
    if(!values.type.trim()){
        errors.type = "Loại không được bỏ trống";
    }
    if(!values.content.trim()){
        errors.content = "Nội dung không được bỏ trống";
    }

    return errors;
}
