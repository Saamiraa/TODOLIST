//!Assign to DOM
const addItemButton = document.querySelector('.addItemButton');
const categoryContainer = document.querySelector('.categoryContainer');
const categoryIcons = document.querySelectorAll('.categoryContainer i')
const input = document.querySelector('input');
const todoContainer = document.querySelector('.todoContainer ul')


//!EVENT Listener
document.addEventListener('DOMContentLoaded',getToDO)


addItemButton.addEventListener('click', ev => {
    categoryContainer.classList.toggle('add')
})
categoryIcons.forEach(icon => {
    icon.addEventListener('click', ev => {
        if(input.value == ''){
            Swal.fire(
                'error!',
                'Oops...!',
                'Fill out the form',
            )
        }
        else {
            categoryContainer.classList.toggle('add');
            const iconClass = [`${icon.classList[1]}`,`${icon.classList[2]}`]
            addItem(input.value,iconClass)
            // addItem(input.value,icon);
            input.value = ''
        }
    })
})

function addItem(text, icon , isSave = true){
    const todoitem = document.createElement('div')
    todoitem.classList.add('todoItem')
    todoitem.innerHTML = `
        <li>${text}</li>
        <i class = "fad fa-shield-check"></i>
        <i class = "fad fa-file-edit"></i>
        <i class = "fad fa-trash"></i>
    `
    //!create icon
    const catIcon = document.createElement('i');
    catIcon.classList.add('fad')
    catIcon.classList.add(icon[0])
    catIcon.classList.add(icon[1])
    console.log(catIcon)

    todoContainer.appendChild(todoitem)
    todoitem.insertBefore(catIcon,todoitem.childNodes[1]) //?منظورم اینه برو توو تودوآیتم و ایندکس ۱ که میشه اون تکس رو اضافه کن
    const bgColor = getComputedStyle(catIcon).getPropertyValue('background-color');
    todoitem.style.background = bgColor;
    if(isSave) saveTodo(text,icon) 
}

todoContainer.addEventListener('click', optiontodo)
function optiontodo(event){
    const iconTargeted = event.target.classList[1];
    const parentTargeted = event.target.parentNode;
    console.log(parentTargeted)
    if(iconTargeted === 'fa-shield-check') {
        parentTargeted.classList.toggle('completed')
    }
    else if(iconTargeted === 'fa-trash') parentTargeted.remove()
    else if(iconTargeted === 'fa-file-edit') {
        parentTargeted.childNodes[2].toggleAttribute('contenteditable');
        parentTargeted.classList.toggle('editing')
    }
}

function saveTodo(text,icon){
    const todoList = localStorage.getItem('todo') ?  
    JSON.parse(localStorage.getItem("todo")) : []
    const todoItemLocal = {
        text, 
        icon
    
    }
    todoList.push(todoItemLocal)
    localStorage.setItem('todo',JSON.stringify(todoList))
}


function getToDO(){
    const todoList = localStorage.getItem('todo') ?  
    JSON.parse(localStorage.getItem("todo")) : []
    todoList.forEach(todo => {
        addItem(todo.text, todo.icon, false) 
    })
}