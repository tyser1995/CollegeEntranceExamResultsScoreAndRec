$(function () {
    GetAllCourseProgram();
    eventSubmitClick();
    editData();
});

var isAdded = false;
function eventSubmitClick() {
    $('#btnNext').click(function (e) {
        var tblProgram = $('#dataTable').DataTable();
        var form = this;
        var rows_selected = tblProgram.column(0).checkboxes.selected();
        if (rows_selected.length > 2) {
            // Iterate over all selected checkboxes
            $.each(rows_selected, function (index, rowId) {
                // Create a hidden element 
                $(form).append(
                    $('<input>')
                        .attr('type', 'hidden')
                        .attr('name', 'id[]')
                        .val(rowId)
                );
                InsertCourseProgramSeleceted(
                    rowId
                );
            });
        } else {
            toastr.success('You must select atleast 3 program course.');
        }


        /*$('#example-console-rows').text(rows_selected.join(","));*/
        //// Remove added elements
        $('input[name="id\[\]"]', form).remove();

        // Prevent actual form submission
        e.preventDefault();
    });
}


function editData() {
    var tblStrand = $('#dataTable').DataTable();

    $('#dataTable tbody').on('click', '#chkSelect', function () {
        console.log($('#chkSelect').is(':checked'));
    });
}