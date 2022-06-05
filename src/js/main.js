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
let trash = document.querySelectorAll('.trash');
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
	trash[i].addEventListener("click", (event) => {
		if(event.target === trash[i]) {
			cardsTodos[i].remove();
		}
	});
}


// Search

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

