//retrieve current todos list and name from localStorage on load
window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');
	const username = localStorage.getItem('username') || '';
//event listener for a new name and save to localStorage
	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

// Declared class 
class List {
	constructor(content, category, done, date) {
		this.content = content;
		this.category = category;
		this.done = done;
	    this.date = date;
	}
}
//event listener on submit button to get data for a new todo
	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		let date = document.getElementById('datepicker').value;
		const todo = new List(e.target.elements.content.value, e.target.elements.category.value,false, date);

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

// Reset the form
		e.target.reset();

		DisplayTodos()
	})

	DisplayTodos()
})
//sort function that sorts automatically with each new todo admission
function AlphabetSort(x, y){
	return x.content.localeCompare(y.content)
}
//function to create elements for a new todo
function DisplayTodos () {
	todos.sort(AlphabetSort);
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";
	console.log(todos);
//looping through each element to build todolist
	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const date = document.createElement('input');
		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');
//check to see which checkbox was selected by the user and appropriate css added to show correct selection				
		
		date.type = 'date';
		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else {
			span.classList.add('business');
		}
//additional buttons added for CRUD application
		content.classList.add('todo-content');
		actions.classList.add('actions');
		edit.classList.add('edit');
		deleteButton.classList.add('delete');
//creation of each todo item		
		content.innerHTML = `<input type="text" style="width: 1200px;" 
		value="${todo.content}" readonly> <input type="date" value="${todo.date}" required/> `;
		
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';
//appends		
		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);
		

//check for todo list completion and adding strike out class based on event listener 
		todoList.appendChild(todoItem);
		
		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})
//edit button event listener for each todo
		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})
//delete button event listener for each todo
		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
}