const searchModul = document.querySelector('.search__box');
const todoList = document.querySelector('.wrapper__dashboard');

searchModul.addEventListener('keyup', (event) => {
    const searchModul = document.querySelector(".search__txt");
    const todosArr = todoList.children;
    let input = searchModul.value;
    input = input.toLowerCase();

    for (const drake of todosArr) {
        if (!drake.querySelector('.todo-item__input').value.toLowerCase().includes(input)){
            drake.style.display = 'none';
        } else {
            drake.style.display = 'grid';
        }
    }
})