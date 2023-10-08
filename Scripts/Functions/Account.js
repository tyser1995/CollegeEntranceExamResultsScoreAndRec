function ValidateUser() {
    $.get(document.location.origin + '/Account/ValidateUser', {
        "Username": $('#txtUsername').val(),
        "Password": $('#txtPassword').val(),
    }, function (data) {
        if (data.data.length > 0) {
            $('.verify_bar').removeClass('d-none');
            $('.btn_bar').addClass('d-none');
            if (data.data[0] == "False" && data.data[1] > 0)
                toastr.info('User account not yet verified.');
            else if ($('#txtUsername').val() != data.data[2] && $('#txtPassword').val() != data.data[3])
                toastr.warning('Account do not matched.');
            else if ($('#txtUsername').val() == data.data[2] && $('#txtPassword').val() == data.data[3])
                window.location.href = document.location.origin + '/Account/toHomePage';
            else
                toastr.warning('Unknown.');
        } else {
            toastr.error('Account not matched/registered.');
        }

        setTimeout(e => {
            $('.verify_bar').addClass('d-none');
            $('.btn_bar').removeClass('d-none');
        },2500);
        
    });
}