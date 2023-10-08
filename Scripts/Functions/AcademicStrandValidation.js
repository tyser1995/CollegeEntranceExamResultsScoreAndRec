$(function () {
    GetAllAcademicStrands();
    eventSubmitClick();
    editData();
});

var isAdded = false;
function eventSubmitClick() {
    $('#btnSave').click(function () {
        var text_is_not_zero = 0;
        $.each($('input[type=text]'), function () {
            if ($(this).val().length != 0)
                text_is_not_zero++;
        });

        if (text_is_not_zero == 2) {
            InsertAcademicStrand(isAdded);
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
    $('#txtStrandName').val(' ');
    $('#txtStrandAbbrev').val(' ');
}
function editData() {
    var tblStrand = $('#dataTable').DataTable();

    $('#dataTable tbody').on('click', '#btnEdit', function () {
        $('#btnSave').text("Update");
        $('#btnSave').addClass('btn-info').removeClass('btn-success');
        $('#btnCancel').removeClass('d-none');

        $('#txtID').val(tblStrand.row($(this).parents('tr')).data().ID);
        $('#txtStrandName').val(tblStrand.row($(this).parents('tr')).data().StrandName);
        $('#txtStrandAbbrev').val(tblStrand.row($(this).parents('tr')).data().StrandAbbrev);

        isAdded = true;
    });

    $('#btnCancel').click(function () {
        clearAll();
    });
}