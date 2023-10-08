$(function () {
    GetSubjectAssessment();
    GetItemAssessment(0);
    eventSubmitClick();
    editData();

    $('#drpSubjAssessmentID').change(function () {
        $('#dataTable').DataTable().destroy();
        GetItemAssessment($(this).val());
        editData();
    });
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

        $.each($('select option:selected'), function () {
            if ($(this).val() != 0)
                num_is_not_zero++;
        });

        if (text_is_not_zero == 5 && num_is_not_zero == 2) {
            InsertUpdateItemAssessment(isAdded);
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
    $('#txtItemQuestion').val(' ');
    $('#txtItemChoicesA').val(' ');
    $('#txtItemChoicesB').val(' ');
    $('#txtItemChoicesC').val(' ');
    $('#txtItemChoicesD').val(' ');
    $('#drpSubjAssessmentID option:selected').val(0);
    $("#drpItemAnswer").val($("#drpItemAnswer option:first").val());
}
function editData() {
    var tblStrand = $('#dataTable').DataTable();

    $('#dataTable tbody').on('click', '.btnEdit', function () {
        $('#btnSave').text("Update");
        $('#btnSave').addClass('btn-info').removeClass('btn-success');
        $('#btnCancel').removeClass('d-none');
        
        //$('#txtID').val(tblStrand.row($(this).parents('tr')).data().ID);
        //$('#txtItemQuestion').val(tblStrand.row($(this).parents('tr')).data().ItemQuestion);
        //$('#txtItemChoicesA').val(tblStrand.row($(this).parents('tr')).data().ItemChoicesA);
        //$('#txtItemChoicesB').val(tblStrand.row($(this).parents('tr')).data().ItemChoicesB);
        //$('#txtItemChoicesC').val(tblStrand.row($(this).parents('tr')).data().ItemChoicesC);
        //$('#txtItemChoicesD').val(tblStrand.row($(this).parents('tr')).data().ItemChoicesD);
        //$('#drpSubjAssessmentID option:selected').text(tblStrand.row($(this).parents('tr')).data().SubjName);
        //$('#drpItemAnswer').val(tblStrand.row($(this).parents('tr')).data().ItemAnswer.toUpperCase());

        isAdded = true;
    });

    $('#btnCancel').click(function () {
        clearAll();
    });
}