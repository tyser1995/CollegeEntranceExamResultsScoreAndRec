function GetAllUserList() {
    $('#dataTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
        processing: true,
        ajax: {
            url: document.location.origin + '/Account/GetAllUsersEmp'
        },
        columns: [
            {
                data: 'ID',
                visible: false,
                searchable: false
            },
            {
                data: 'EmailAddress',

            },
            {
                data: 'RoleName',

            },
            {
                data: 'IsVerified',
                className: 'text-center',
                render: function (data) {
                    return data ? `<button type="button" class="btn btn-success btn-sm" title='Verified' disabled><i class='fa fa-check-square' ></i></button>` : `<button id="btnEdit" type="button" class="btn btn-danger btn-sm" title='Not Verified'><i class='fa fa-minus-square' ></i></button>`;
                       
                }
            }
        ]
    });
}

function VerifiedUser(email) {
    var form = {
        'email': email
    };
    $.post(document.location.origin + '/Account/VerifiedUser', form, function (data) {
        setTimeout(() => {
            $('#dataTable').DataTable().ajax.reload();
        },1500);
    });
}

function InsertUpdateUserWithRoles(isAdded) {
    var form = {
        'emailAddress': $('#txtEmail').val(),
        'password': $('#txtPassword').val(),
        "roleName": $('#drpRole').val()
    };
    $.post(document.location.origin + '/Account/InsertUpdateUserWithRoles', form, function (data) {
        !isAdded ?
            toastr.success('Successfully Added')
            : toastr.success('Successfully Updated');
        setTimeout(() => {
            $('#dataTable').DataTable().ajax.reload();
        }, 1500);

    });
}