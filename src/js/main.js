const btnAdd = document.getElementById('btn-add');

btnAdd.addEventListener('click', () => {
    $('.ui.modal.add__todo').modal({blurring: true}).modal('show');
    $('.ui.dropdown').dropdown();
})

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

const searchModul = document.querySelector('.search__box');


searchModul.addEventListener('keyup', (event) => {
    const searchModul = document.querySelector(".search__txt");
    const todosArr = document.querySelectorAll('.card__todo');
    let input = searchModul.value;
    input = input.toLowerCase();

    for (const item of todosArr) {
        if (!item.textContent.toLowerCase().includes(input)){
            item.style.display = 'none';
        } else {
            item.style.display = 'block';
        }
    }
})
