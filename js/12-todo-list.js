let todoList = JSON.parse ( localStorage.getItem ( 'todoList' ) );
/*
let todoList = [{name: 'make dinner', date: '2023-7-21'},
    {name: 'wash dishes', date: '2023-7-21'},
    {name: 'make some noise', date: '2023-7-21'},
];
*/

renderTodoList ();

function addTodo() {
    const inputNameElement = document.querySelector ( '.js-input' );
    const inputDateElement = document.querySelector ( '.js-input-date' );
    todoList.push ( {name: inputNameElement.value, date: inputDateElement.value} );
    inputNameElement.value = '';
    inputDateElement.value = '';
    localStorage.setItem ( 'todoList', JSON.stringify ( todoList ) );
    renderTodoList ();
}

function renderTodoList() {
    const inputElement = document.querySelector ( '.js-input' );
    inputElement.value = '';

    const todoListDiv = document.querySelector ( '.js-show-list' );
    let todoListHtml = '';

    todoList.forEach ( (item, index) => {
        const html = `
                <div class="col-span-6 ps-2 h-8 leading-4">${item.name}</div>
                <div class="col-span-3 ps-2">${item.date}</div>
                <button 
                class="col-span-3 bg-red-700 text-gray-50 h-8"
                onclick="
                    todoList.splice(${index}, 1);
                    renderTodoList();
                ">Delete</button>
            
        `;
        todoListHtml += html;
    } );
    todoListDiv.innerHTML = todoListHtml;
}

