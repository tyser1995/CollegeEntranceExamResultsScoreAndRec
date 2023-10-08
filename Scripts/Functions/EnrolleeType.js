function GetAllYearLevel() {
    $('#dataTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
        ajax: {
            url: document.location.origin + '/Management/GetAllYearLevelList'
        },
        columns: [
            {
                data: 'ID',
                visible: false,
                searchable: false
            },
            {
                data: 'YearLevelInName',

            },
            {
                data: 'YearLevelInNo',

            },
            {
                data: 'CreateDate',
                render: function (data, type, row) {
                    return moment(Number(row.CreateDate.replace(/\D/g,''))).format('MMM D YYYY, hh:mm A');
                }
            },
            {
                data: 'DeletedFlag',
                visible: false,
                searchable: false
            },
            {
                defaultContent: `<button id="btnEdit" type="button" class="btn btn-primary"><i class="fas fa-edit"></i></button>`,
                className:'text-center'
            }
        ]
    });
}

function InsertUpdateYearLevel(isAdded) {
    var form = {
        'ID': $('#txtID').val(),
        'yearLevelInName': $('#txtYearLevelInName').val(),
        'yearLevelInNo': $('#txtYearLevelInNo').val().replace("_",""),
    };
    $.post(document.location.origin + '/Management/InsertUpdateYearLevel', form, function (data) {
        !isAdded ?
            toastr.success('Successfully Added')
            : toastr.success('Successfully Updated');
        setTimeout(() => {
            window.location.reload();
        },1500);
        
    });
}