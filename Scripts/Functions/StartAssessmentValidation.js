$(function () {
    GetSubject();
    eventSubmitClick();
});

function eventSubmitClick() {
    var tblStrand = $('#dataTable').DataTable();
    var count_correct = 0;
    var count_wrong = 0;
    var total = 0;
    $('#btnSubmit').click(function () {
        console.log(count_correct);
    });

   
    $('#dataTable tbody').on('change', '#drpItemAnswer', function () {
        console.log(tblStrand.row($(this).parents('tr')).data().ItemAnswer);
        console.log(tblStrand.row($(this).val()).selector.rows);
        tblStrand.row($(this).parents('tr')).data().ItemAnswer == tblStrand.row($(this).val()).selector.rows
            ? count_correct++
            : count_correct--;

        //$('#txtID').val(tblStrand.row($(this).parents('tr')).data().ID);
        //$('#txtItemQuestion').val(tblStrand.row($(this).parents('tr')).data().ItemQuestion);
        //$('#txtItemChoicesA').val(tblStrand.row($(this).parents('tr')).data().ItemChoicesA);
        //$('#txtItemChoicesB').val(tblStrand.row($(this).parents('tr')).data().ItemChoicesB);
        //$('#txtItemChoicesC').val(tblStrand.row($(this).parents('tr')).data().ItemChoicesC);
        //$('#txtItemChoicesD').val(tblStrand.row($(this).parents('tr')).data().ItemChoicesD);
        //$('#drpSubjAssessmentID option:selected').text(tblStrand.row($(this).parents('tr')).data().SubjName);
        //$('#drpItemAnswer').val(tblStrand.row($(this).parents('tr')).data().ItemAnswer.toUpperCase());
    });
}
