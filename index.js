//!Assign to DOM
const addItemButton = document.querySelector('.addItemButton');
const categoryContainer = document.querySelector('.categoryContainer');
const categoryIcons = document.querySelectorAll('.categoryContainer i')
const input = document.querySelector('input');
const todoContainer = document.querySelector('.todoContainer ul')
//input has values not innerhtml


//!EVENT Listener
document.addEventListener('DOMContentLoaded',getToDO)
// میگیم هر وقت صفحه ما رفرش شد اطلاعات رو نگه دار کار این فانکنش اینه

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
            //!اینجا برای اینکه بخوایم آیکون ها رو هم اضافه کنیم و سیو کنیم
            //!با این روش پیش میریم
            const iconClass = [`${icon.classList[1]}`,`${icon.classList[2]}`]
            addItem(input.value,iconClass) //!برای اینکه توو لوکال استورج ذخیره بشه بجای خط بعدی اینطوری دادیم
            // addItem(input.value,icon);
            input.value = ''
        }
    })
})

function addItem(text, icon){
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

    todoContainer.appendChild(todoitem)
    todoitem.insertBefore(catIcon,todoitem.childNodes[1]) //?منظورم اینه برو توو تودوآیتم و ایندکس ۱ که میشه اون تکس رو اضافه کن
    const bgColor = getComputedStyle(catIcon).getPropertyValue('background-color');
    todoitem.style.background = bgColor;
    saveTodo(text,icon)
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
        //!چایلد دومی که میشه لیست یا همون ال آی
        parentTargeted.classList.toggle('editing')
    }
}

function saveTodo(text,icon){
    //!لوکال استروج فقط رشته رو ذخیره میکنه و نمیتونه المنت رو ذخیره کنه
    const todoList = localStorage.getItem('todo') ?  
    JSON.parse(localStorage.getItem("todo")) : []
    //!اینجا میگیم اگر چیزی ست نشده باشه بیا یه آرایه ایجاد کن
    //! ولی اگر اطلاعاتی از قبل داریم بیا بخون و درون فعلی قرار بده
    const todoItemLocal = {
        text, 
        icon
        //!دوتا پراپرتی داره
    }
    todoList.push(todoItemLocal)
    localStorage.setItem('todo',JSON.stringify(todoList))
}

//!اینجا میخوایم بگیم اطلاعات رو بخون
console.log(x)