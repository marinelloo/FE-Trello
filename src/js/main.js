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


// Philippov Pop ups

let cardsTodos = document.querySelectorAll(".card__todo");
let trash = document.querySelector('.trash');
let btnDeleteAll = document.querySelector('.btn__delete');
btnDeleteAll.addEventListener("click", (event) => {
	
});
for(let i = 0; i < cardsTodos.length; i++) {
	cardsTodos[i].addEventListener("click", (event) => {
		if(JSON.stringify(event.target) === JSON.stringify(trash)) {
			cardsTodos[i].innerHTML = '';
		}
	});
}





// let dashboard = document.querySelector('.wrapper__dashboard');
// let trash = dashboard.querySelector('.trash');
// let cardsTodos = dashboard.querySelectorAll('.card__todo');
// let btnDeleteAll = document.querySelector('.btn__delete');
// dashboard.addEventListener('click', (event) => {
// 	const arr = [];
// 	for (let i = 0; i < cardsTodos.length; i++) {
// 		arr.push(cardsTodos[i]);
// 	}
// 	console.log(arr);
// 	let o = arr.indexOf(event.target);
// 	cardsTodos[o].innerHTML = '';
	// if(JSON.stringify(event.target) === JSON.stringify(trash)) {
		
	// }
// })




// dashboardTodo.addEventListener('click', (event) => {
// 	if (event.target === cardTodoDelete[event.target]) {
// 	cardsTodos[event.target].innerHTML = ''}});
// let cardTodo = document.querySelector('.card__todo');
// console.log(cardTodo);
// cardTodo.addEventListener('click', (event) => {
// 	if (event.target === cardTodoDelete) {
// 		alert('hello');
// 	}});



//   for (let elem of elements) {
//     alert(elem.innerHTML); // "тест", "пройден"
//   }
// const btnDeleteAll = document.querySelector('.btn__delete');
// btnDeleteAll.addEventListener('click', (event) => {
// 	if (event.target === btnDeleteAll) {
// 	alert('hello');
// }});