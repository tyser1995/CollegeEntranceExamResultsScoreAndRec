$(function () {
    GetAllUserList();
    editData();

    eventSubmitClick();
});

var isAdded = false;
function eventSubmitClick() {
    $('#btnSave').click(function () {
        var text_is_not_zero = 0;
        var pass_is_not_zero = 0;

        var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

        $.each($('input[type=text]'), function () {
            if ($(this).val().length != 0)
                text_is_not_zero++;
        });

        $.each($('input[type=password]'), function () {
            if ($(this).val().length != 0)
                pass_is_not_zero++;
        });

        if (text_is_not_zero == 1 && pass_is_not_zero == 1 && $('#drpRole').val() != 0) {
            if (pattern.test($('#txtEmail').val())) {
                InsertUpdateUserWithRoles(isAdded);
                clearAll();
            } else {
                toastr.error('Not a valid e-mail address.!');
            }
            
        } else {
            toastr.error('All fields are required.!');
        }
    });
}

function clearAll() {
    $('#btnSave').text("Save");
    $('#btnSave').removeClass('btn-info').addClass('btn-success');
    $('#btnCancel').addClass('d-none');

    $('#txtEmail').val(' ');
    $('#txtPassword').val(' ');
    $('#drpRole').val($('#drpRole option:first').val());
}

function editData() {
    var tblUser = $('#dataTable').DataTable();

    $('#dataTable tbody').on('click', '#btnEdit', function () {
        let timerInterval
        Swal.fire({
            title: tblUser.row($(this).parents('tr')).data().EmailAddress + ' user verified.',
            html: 'I will close in <b></b> milliseconds.',
            allowOutsideClick: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                //console.log('I was closed by the timer')
            }
        });

        VerifiedUser(tblUser.row($(this).parents('tr')).data().EmailAddress);
    });
}