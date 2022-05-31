const btnAdd = document.getElementById('btn-add');

btnAdd.addEventListener('click', () => {
    $('.ui.modal').modal({blurring: true}).modal('show');
    $('.ui.dropdown').dropdown();
})

