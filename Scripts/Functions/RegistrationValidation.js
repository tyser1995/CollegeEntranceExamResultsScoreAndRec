$(function () {
    GetAllAcademicStrands();
    GetAllYearLevel();
    eventSubmitClick();
});

function eventSubmitClick() {
    $('#btnRegister').click(function () {
        var text_is_not_zero = 0;
        var pass_is_not_zero = 0;
        $.each($('input[type=text]'), function () {
            if ($(this).val().length != 0) //9
                text_is_not_zero++;
        });

        $.each($('input[type=password]'), function () {
            if ($(this).val().length != 0) //2
                pass_is_not_zero++;
        });

        if (text_is_not_zero == 10 && pass_is_not_zero == 2) {
            $('.verify_bar').removeClass('d-none');
            $(this).addClass('d-none');
            InsertRegistration();
        } else {
            toastr.error('All fields are required.!');
        }


        //$.each($('select[name="drp"]'), function () {
        //    //if ($(this).val().length != 0)
        //        //return true;
        //    console.log("select " + $(this).length);
        //});
    });
}