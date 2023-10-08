$(function () {
    GetSubjectAssessment();
    eventSubmitClick();
    editData();
});

var isAdded = false;
function eventSubmitClick() {
    $('#btnSave').click(function () {
        var text_is_not_zero = 0;
        var num_is_not_zero = 0;

        $.each($('input[type=text]'), function () {
            if ($(this).val().length != 0)
                text_is_not_zero++;
        });

        $.each($('input[type=number]'), function () {
            if ($(this).val().length != 0)
                num_is_not_zero++;
        });

        if (text_is_not_zero == 1 && num_is_not_zero == 2) {
            InsertUpdateSubjAssessment(isAdded);
            clearAll();
        } else {
            toastr.error('All fields are required.!');
        }
    });
}

function clearAll() {
    $('#btnSave').text("Save");
    $('#btnSave').removeClass('btn-info').addClass('btn-success');
    $('#btnCancel').addClass('d-none');

    $('#txtID').val(0);
    $('#txtSubjName').val(' ');
    $('#txtSubjItems').val(' ');
    $('#txtExamTimer').val(' ');
}
function editData() {
    var tblStrand = $('#dataTable').DataTable();

    $('#dataTable tbody').on('click', '#btnEdit', function () {
        $('#btnSave').text("Update");
        $('#btnSave').addClass('btn-info').removeClass('btn-success');
        $('#btnCancel').removeClass('d-none');

        $('#txtID').val(tblStrand.row($(this).parents('tr')).data().ID);
        $('#txtSubjName').val(tblStrand.row($(this).parents('tr')).data().SubjName);
        $('#txtSubjItems').val(tblStrand.row($(this).parents('tr')).data().SubjItems);
        $('#txtExamTimer').val(tblStrand.row($(this).parents('tr')).data().ExamTimer);

        isAdded = true;
    });

    $('#btnCancel').click(function () {
        clearAll();
    });
}