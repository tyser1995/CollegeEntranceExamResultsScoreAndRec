function GetSubjectAssessment() {
    $.get(document.location.origin + '/Assessment/GetSubjectAssessment', function (data) {
        if (data.data.length != 0) {
            $.each(data.data, function (index, res) {
                $('.subj_assessment').append(
                    `<div class="info-box mb-3 bg-info">
                                <span class="info-box-icon"><i class="far fa-comment"></i></span>
                                <div class="info-box-content">
                                    <h4 class="info-box-number text-uppercase">`+ res.SubjName + `</h4>
                                    <span class="info-box-text">`+ res.SubjItems + ` Items</span>
                                    <span class="info-box-text">TIME LIMIT: `+ res.ExamTimer + `mins</span>
                                </div>
                            <div style="display:flex; align-items:center">
                            <a href=`+ document.location.origin + '/Assessment/StartAssessment?exam_id=' + res.ID +'&start='+res.ExamTimer+`  class="btn btn-sm btn-success">Start</a>
                            </div>
</div>
                `);
            });
        } else {
            $('.subj_assessment').append(
                `<div class="info-box mb-3 bg-danger">
                    <span class="info-box-icon"><i class="far fa-comment"></i></span>
                    <div class="info-box-content">
                        <span class="info-box-text">data not found.</span>
                    </div>
            </div>
            `);
        }
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
                window.location.href = document.location.origin + '/Account/toHomePage';
            }
        });
    });
}