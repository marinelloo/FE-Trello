const btnAdd = document.getElementById('btn-add');

btnAdd.addEventListener('click', () => {
    $('.ui.modal').modal({blurring: true}).modal('show');
    $('.ui.dropdown').dropdown();
})

// DragNDrop

let containerTdo = document.querySelector('.dashboard__cards-todo');
let containerInProgress = document.querySelector('.dashboard__cards-inProgress');
let containerDone = document.querySelector('.dashboard__cards-done');

dragula([containerTdo, containerInProgress, containerDone]);


