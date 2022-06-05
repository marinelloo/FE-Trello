const btnAdd = document.getElementById('btn-add');
const btnEditModal = document.querySelectorAll('.card__todo-edit').length;

//Open Modal Create Card
btnAdd.addEventListener('click', () => {
    $('.ui.modal.add__todo').modal({blurring: true}).modal('show');
    $('.ui.dropdown').dropdown();
})

//Open Modal Edit
for(let i = 0; i < btnEditModal; i++) {
    document.querySelectorAll('.card__todo-edit')[i].addEventListener('click', () => {
        $('.ui.modal.edit__todo').modal({blurring: true}).modal('show');
        $('.ui.dropdown').dropdown();
    })
}

// DragNDrop
let containerTdo = document.querySelector('.dashboard__cards-todo');
let containerInProgress = document.querySelector('.dashboard__cards-inProgress');
let containerDone = document.querySelector('.dashboard__cards-done');

let drake = dragula([containerTdo, containerInProgress, containerDone]);

drake.on('drop', function(el, target, source, sibling) {
    if (target === containerInProgress && target.children.length >= 6) {
        $('.ui.modal.pop-up__inprogress').modal({blurring: true}).modal('show');

    }
});
