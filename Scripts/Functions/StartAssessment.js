function GetSubject() {
    $('#dataTable').DataTable({
        "paging": false,
        "lengthChange": false,
        "searching": false,
        "ordering": false,
        "info": false,
        "autoWidth": false,
        "responsive": true,
        ajax: {
            url: document.location.origin + '/Assessment/GetExamBySubject?exam_id=' + $('#exam_id').val()
        },
        columns: [
            {
                data: 'ID',
                visible: false,
                searchable: false
            },
            {
                data: 'SubjName',
                visible: false,
                searchable: false

            },
            {
                data: 'ItemQuestion',

            },
            {
                data: 'ItemChoicesA',
                className: 'text-center text-uppercase'

            },
            {
                data: 'ItemChoicesB',
                className: 'text-center text-uppercase'

            },
            {
                data: 'ItemChoicesC',
                className: 'text-center text-uppercase'

            },
            {
                data: 'ItemChoicesD',
                className: 'text-center text-uppercase'

            },
            {
                data: 'ItemAnswer',
                className: 'text-center text-uppercase',
                visible: false,
                searchable: false

            },
            {
                defaultContent: `<select class="form-control" id="drpItemAnswer">
                    <option selected disabled value="0" hidden>Select</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                </select>`,
                className: 'text-center'
            }
        ]
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