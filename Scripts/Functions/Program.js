function GetAllCourseProgram() {
    $('#dataTable').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
        className: 'select-checkbox',
        ajax: {
            url: document.location.origin + '/Management/GetAllCourseProgram'
        },
        columns: [
            {
                data: 'ID',
                searchable: false,
                className: 'text-center',
            },
            {
                data: 'CourseName',

            }
        ],
        columnDefs: [
            {
                targets: 0,
                'checkboxes': {
                    'selectRow': true
                }
            }
        ],
        select: {
            style: 'multi'
        },
    });
}

function InsertCourseProgramSeleceted(courseProgramID) {
    var form = {
        'courseProgramID': courseProgramID
    };
    $.post(document.location.origin + '/Assessment/InsertCourseProgramSeleceted', form, function (data) {
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
                window.location.href = document.location.origin + '/Assessment/Assessment';
            }
        });
    });
}