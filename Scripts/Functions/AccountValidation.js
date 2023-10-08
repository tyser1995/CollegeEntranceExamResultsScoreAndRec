$(function () {
    eventSubmitClick();
});

function eventSubmitClick() {
    $('#btnSubmit').click(function () {
        if ($('#txtUsername').val() != "" && $('#txtPassword').val() != "") {
            //$('#btnSubmit').attr('disabled', disabled);
            ValidateUser();
        } else {
            toastr.error('All fields are requried.');
        }
    });
}

//function loginUser() {
//    document.user_form.action = ValidateUser();
//    return false;
//}