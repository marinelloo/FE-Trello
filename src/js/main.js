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


// Pop ups

let cardsTodos = document.querySelectorAll(".card__todo");
let trash = document.querySelector('.trash');
let btnDeleteAll = document.querySelector('.btn__delete');
let btnDeleteConfirm = document.querySelector('.btn--dark');
let dashboardDone = document.querySelector('.dashboard__cards-done');

btnDeleteConfirm.addEventListener("click", (event) => {
	dashboardDone.innerHTML = '';
});

btnDeleteAll.addEventListener("click", (event) => {
	$('.ui.modal.pop-up__delete-all').modal({blurring: true}).modal('show');
});


for(let i = 0; i < cardsTodos.length; i++) {
	cardsTodos[i].addEventListener("click", (event) => {
		if(JSON.stringify(event.target) === JSON.stringify(trash)) {
			cardsTodos[i].remove();
		}
	});
}