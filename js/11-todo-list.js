const todoList = ['make dinner', 'wash dishes', 'make some noise'];

renderTodoList();

function addTodo() {
    const inputElement = document.querySelector('.js-input-p1');
    todoList.push(inputElement.value);
    console.log(todoList);
    inputElement.value = '';
}

function renderTodoList() {
    const inputElement = document.querySelector('.js-input-p2');
    todoList.push(inputElement.value);
    console.log(todoList);
    inputElement.value = '';

    const todoListElement = document.querySelector('.js-show-list');
    let todoListHtml = '';

    for (const todoListElement of todoList) {
        const html = `<p>${todoListElement}</p>`;
        todoListHtml += html;
    }
    todoListElement.innerHTML = todoListHtml;
}

