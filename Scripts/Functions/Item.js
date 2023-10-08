function GetSubjectAssessment() {
    $.get(document.location.origin + '/Assessment/GetSubjectAssessment', function (data) {
        data.data.map(function (res) {
            $('#drpSubjAssessmentID').append(`
                <option value=`+ res.ID + `>` + res.SubjName + `</option>
            `);
        });
    });
}
function GetItemAssessment(subjAssessmentID) {
    $('#dataTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
        ajax: {
            url: document.location.origin + '/Assessment/GetItemAssessment?subjAssessmentID=' + subjAssessmentID
        },
        //data: {
        //    'subjAssessmentID': 0
        //},
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
                data: 'ItemQuestion',

            },
            {
                data: 'ItemChoicesA',

            },
            {
                data: 'ItemChoicesB',

            },
            {
                data: 'ItemChoicesC',

            },
            {
                data: 'ItemChoicesD',

            },
            {
                data: 'ItemAnswer',

            },
            {
                data: 'CreatedDate',
                render: function (data, type, row) {
                    return moment(Number(row.CreatedDate.replace(/\D/g, ''))).format('MMM D YYYY, hh:mm A');
                }
            },
            //{
            //    defaultContent: `<button type="button" class="btnEdit btn btn-primary"><i class="fas fa-edit"></i></button>`,
            //    className: 'text-center'
            //}
        ]
    });
}

function InsertUpdateItemAssessment(isAdded) {
    var form = {
        'iD': $('#txtID').val(),
        'subjAssessmentID': $('#drpSubjAssessmentID').val(),
        'itemQuestion': $('#txtItemQuestion').val(),
        'itemChoicesA': $('#txtItemChoicesA').val(),
        'itemChoicesB': $('#txtItemChoicesB').val(),
        'itemChoicesC': $('#txtItemChoicesC').val(),
        'itemChoicesD': $('#txtItemChoicesD').val(),
        'itemAnswer': $('#drpItemAnswer').val()
    };

    $.post(document.location.origin + '/Assessment/InsertUpdateItemAssessment', form, function (data) {
        !isAdded ?
            toastr.success('Successfully Added')
            : toastr.success('Successfully Updated');

        $('#dataTable').DataTable().ajax.reload();
    });
}