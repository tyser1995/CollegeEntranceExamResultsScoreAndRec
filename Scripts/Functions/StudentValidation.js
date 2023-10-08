$(function () {
    GetAllUserList();
    editData();
});

function editData() {
    var tblUser = $('#dataTable').DataTable();

    $('#dataTable tbody').on('click', '#btnEdit', function () {
        let timerInterval
        Swal.fire({
            title: tblUser.row($(this).parents('tr')).data().Name + ' user verified.',
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
            }
        });

        VerifiedUser(tblUser.row($(this).parents('tr')).data().EmailAdd);
    });
}