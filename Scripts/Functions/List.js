function GetSubjectAssessment() {
    $('#dataTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
        ajax: {
            url: document.location.origin + '/Assessment/GetSubjectAssessment'
        },
        columns: [
            {
                data: 'ID',
                visible: false,
                searchable: false
            },
            {
                data: 'SubjName',

            },
            {
                data: 'SubjItems',

            },
            {
                data: 'ExamTimer',

            },
            {
                data: 'CreatedDate',
                render: function (data, type, row) {
                    return moment(Number(row.CreatedDate.replace(/\D/g, ''))).format('MMM D YYYY, hh:mm A');
                }
            },
            {
                defaultContent: `<button id="btnEdit" type="button" class="btn btn-primary"><i class="fas fa-edit"></i></button>`,
                className: 'text-center'
            }
        ]
    });
}

function InsertUpdateSubjAssessment(isAdded) {
    var form = {
        'iD': $('#txtID').val(),
        'subjName': $('#txtSubjName').val(),
        'subjItems': $('#txtSubjItems').val(),
        'examTimer': $('#txtExamTimer').val()
    };

    $.post(document.location.origin + '/Assessment/InsertUpdateSubjAssessment', form, function (data) {
        !isAdded ?
            toastr.success('Successfully Added')
            : toastr.success('Successfully Updated');

        $('#dataTable').DataTable().ajax.reload();
    });
}