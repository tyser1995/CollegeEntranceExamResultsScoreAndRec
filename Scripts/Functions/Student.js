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
            url: document.location.origin + '/Account/GetAllUserList'
        },
        columns: [
            {
                data: 'No',
                visible: false,
                searchable: false
            },
            {
                data: 'Name',

            },
            {
                data: 'EmailAdd',

            },
            {
                data: 'CreatedDate',
                render: function (data, type, row) {
                    return moment(Number(row.CreatedDate.replace(/\D/g,''))).format('MMM D YYYY, hh:mm A');
                }
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