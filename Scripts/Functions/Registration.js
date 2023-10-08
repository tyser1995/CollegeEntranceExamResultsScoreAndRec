function GetAllAcademicStrands() {
    $.get(document.location.origin + '/Management/GetAllAcademicStrands', function (data) {
        JSON.parse(data.data).map(function (data) {
            $('#drpAcademicStrand').append('<option value=' + data.ID + '>' + data.StrandName + " - (" + data.StrandAbbrev+ " )"+'</option>');
        });
    });
}

function GetAllYearLevel() {
    $.get(document.location.origin + '/Management/GetAllYearLevel', function (data) {
        JSON.parse(data.data).map(function (data) {
            $('#drpEnrolleeType').append('<option value=' + data.ID + '>' + data.YearLevelInName + '</option>');
        });
    });
}

function InsertRegistration() {
    $('.verify_bar').removeClass('d-none');
    $('#btnRegister').addClass('d-none');
    var form = {
        'Username': $('#txtEmailAdd').val(),
        'Password': $('#txtPassword').val(),
        'FirstName': $('#txtFirstName').val(),
        'MiddleName': $('#txtMiddleName').val(),
        'LastName': $('#txtLastName').val(),
        'ContactNo': $('#txtContactNo').val(),
        'EmailAdd': $('#txtEmailAdd').val(),
        'EnrolleeType': $('#drpEnrolleeType').val(),
        'Sex': $('#drpSex').val(),
        'MailingAdd': $('#txtMailingAdd').val(),
        'ParentsName': $('#txtParentsName').val(),
        'ParentsContactNo': $('#txtParentsContactNo').val(),
        'AcademicStrand': $('#drpAcademicStrand').val(),
        'AcademicStrandID': $('#drpAcademicStrand').val(),
        'LastSchoolAttended': $('#txtLastSchoolAttended').val(),
        'LastSchoolAdd': $('#txtLastSchoolAdd').val()
    };

    $('#btnRegister').addClass('d-none');

    $.post(document.location.origin + '/Registration/InsertRegistration', form, function (data) {
        let timerInterval
        Swal.fire({
            title: "Please wait...",
            html: 'I will close in <b></b> milliseconds.',
            allowOutsideClick: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                //console.log('I was closed by the timer')
                /*window.location.href = document.location.origin + '/Account/toHomePage';*/
                window.location.href = document.location.origin + '/Account/Verification';
            }
        });
    });
}