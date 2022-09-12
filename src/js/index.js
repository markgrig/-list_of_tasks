import "../css/style.css"
import "../img/background1.jpg" 
import "../img/background2.jpg" 
import "../img/background3.jpg" 
import "../img/background4.jpg"

const bodyElement = document.querySelector('body') 
bodyElement.style.backgroundImage = `url(./img/background1.jpg)`

//навигация по сайту
const navigation = document.querySelector('.navigator')
let listOfTask = document.querySelector('.list') 

navigation.addEventListener(  'click' , ( event ) => {

    const { target } = event
    
    if ( target.closest('a') ) {

        let elementNavigation = navigation.firstElementChild
        while ( elementNavigation ) {
            elementNavigation.style.boxShadow = "none"
            elementNavigation = elementNavigation.nextElementSibling
        } 
    
        target.style.boxShadow = "inset 0 -6px 0 rgba(189, 35, 35, 0.842)"
            
        const titleName = bodyElement.querySelector('.titleName')
        titleName.classList.remove('selectorHidden')
        titleName.textContent = target.textContent
        titleName.setAttribute('data-name',  target.getAttribute('data-name') )

        const startMessege =  bodyElement.querySelector('#start')
            
        if ( startMessege ) {
            const addTask =  bodyElement.querySelector('#addTask')
            startMessege.classList.add('selectorHidden')
            addTask.classList.remove('selectorHidden')
        }

        bodyElement.querySelectorAll('.list').forEach(element => {
            element.classList.add('selectorHidden')
        });
        listOfTask = bodyElement.querySelector( '#' + target.getAttribute('data-name'))
        listOfTask.classList.remove('selectorHidden')
    }
})                       


//задачи добавляемые в список с использованием JS
const tasks = [
    {
        text: 'Посмотреть новый урок по JavaScript',
    },
    {
  
        text: 'Выполнить тест после урока',
    },
    {
        text: 'Выполнить ДЗ после урока',
    },
]

tasks.forEach( ( el) => {
    const div = document.createElement('div')
    const HTMLforApp = 
    `
    <li data-number-task="${listOfTask.querySelectorAll('div').length + 1}">  ${el.text} </li> 
    <button  class="button"  type = 'submit' id = "buttonForDelete"> Удалить  </button>
    `
    div.innerHTML = HTMLforApp
    listOfTask.append(div)
})

let indexBackgroundImage = 1

//удаление задач с использованием клавиши альт
document.addEventListener( 'keydown' , ( event ) => {
   
    //console.log(event);
    const { key } =  event
    const { altKey } = event
    const deleteTask = listOfTask.querySelectorAll(`li`)
    deleteTask.forEach( (element, index )=> {
     
        if ( element && altKey && ( index + 1 === Number(key) ) ) {
            //const confrimDelete = confirm(`Вы действительно хотите удалить задачу ${key} ?`)
           

            const modalWindow = document.querySelector("#deleteModal")
            
            modalWindow.firstChild.nextElementSibling.textContent = `Вы действительно хотите удалить задачу под номером ${key} ?`
            
            modalWindow.classList.add( 'modalOverlay')
            modalWindow.classList.remove( 'selectorHidden')
    
            const buttonYes = document.querySelector(".buttonYes")
            const buttonNo  = document.querySelector(".buttonNo")
    
            buttonYes.addEventListener( 'click',  ( event ) => {

                while ( element.nextElementSibling ) {
                    element.nextElementSibling.remove()
                }
                element.remove()
                modalWindow.classList.add( 'selectorHidden')
            
            })
            buttonNo.addEventListener( 'click',  ( event ) => {
                modalWindow.classList.add( 'selectorHidden')
            })
        }
    
    });

    if( altKey && ( key.toLocaleLowerCase() === "и" || key.toLocaleLowerCase() === "b" )  ) {
        
        indexBackgroundImage += 1
        if ( indexBackgroundImage === 5 ) {
            indexBackgroundImage = 1
        }

        const bodyElement = document.querySelector('body')
        bodyElement.style.backgroundImage = `url(./img/background${indexBackgroundImage}.jpg)`
        
    }
})


//функция возвращающая окно подсказки 
const creatToolTip = (text) => {
    const toolTip = document.createElement('span')
    toolTip.textContent = text
    toolTip.className = 'toolTip'
    return toolTip
}

let buttonForDelete = document.querySelector('ol').querySelectorAll('#buttonForDelete')

bodyElement.addEventListener( 'mouseover', (event) => {
    const { target } = event 

    
    //события наведения на подсказку 
    if (target.closest('#buttonForDelete')) {
        console.log(target.previousElementSibling);
        const toolTipeHTML = creatToolTip( `Нажмите, чтобы удалить ${target.previousElementSibling.getAttribute('data-number-task')} задачу` )
        target.insertAdjacentElement('afterEnd',toolTipeHTML)
    }
})


bodyElement.addEventListener( 'mouseout', (event) => {
    const { target } = event 
    
    //событие убирания мышки с кнопки удаления
    if (target.closest('#buttonForDelete')) {
    target.nextElementSibling.remove()
    }
}) 


bodyElement.addEventListener( 'click' , ( event ) => {

    const { target } = event 
    
    //события появления модального окна
    if (target.closest('#buttonForDelete')) {
        const modalWindow = document.querySelector("#deleteModal")
        modalWindow.firstChild.nextElementSibling.textContent = ` Вы действительно хотите удалить эту задачу?`

        modalWindow.classList.add( 'modalOverlay')
        modalWindow.classList.remove( 'selectorHidden')
        modalWindow.classList.add( 'modalOverlay')
        console.log(modalWindow );
        const buttonYes = document.querySelector(".buttonYes")
        const buttonNo  = document.querySelector(".buttonNo")

        buttonYes.addEventListener( 'click',  ( event ) => {
            target.closest('div').remove()
            modalWindow.classList.add( 'selectorHidden')
        })
        buttonNo.addEventListener( 'click',  ( event ) => {
            modalWindow.classList.add( 'selectorHidden')
        })
    }
})   

//проверка введенной задачи на валидность 
const checkTextValidation = ( text ) => {
    const errorArray = []
    if ( !text ) {
        errorArray.push('Пустое поле для добавления задачи!') 
     } 
     else {
        const arrayTasks = listOfTask.querySelectorAll(`li`)
        const searchTask =  [...arrayTasks ].some( el => { return el.textContent.toLocaleLowerCase().trim() === text.toLocaleLowerCase().trim()   } )
        
        if ( searchTask ){
            errorArray.push('Такая задача уже есть!')
        }
     }
     return errorArray
}

const textForAdd = document.querySelector('.textForm')

//событие пользователь печатает 
textForAdd.addEventListener( 'input' , (event) => {
   
    const { target } = event
    const { value } = target
    
    const messageBoxDOM = document.querySelector('.messageAboutError')
    const errorArray = checkTextValidation(value)
   
    if ( errorArray[0] ) {

        if ( messageBoxDOM ){
            messageBoxDOM.remove()
        }

        const newMassageBox = document.createElement('span')
        newMassageBox.className = 'messageAboutError'

        
        newMassageBox.textContent = errorArray.join(' , ')
        textForAdd.insertAdjacentElement('afterEnd',newMassageBox)
    } 
    else if ( checkTextValidation(value) && messageBoxDOM ){
        messageBoxDOM.remove()
    }
})
  
const textForm = document.querySelector('.textForm')

//событие пользователь добавляет задачу
textForm.addEventListener( 'submit' , ( event ) => {
        //console.log(event)
        event.preventDefault()
        const { target } = event
        if (target.nameTask.value) {
            
            const newTask = {
                text: `${target.nameTask.value.trim()}`,
            }
            tasks.push(newTask)
            
            const div = document.createElement('div')
            const HTMLforAdd = 
            `
            <li data-number-task="${listOfTask.querySelectorAll('div').length + 1}">  ${newTask .text} </li> 
            <button  class="button"  type = 'submit' id = "buttonForDelete"> Удалить  </button>
            `
            div.innerHTML = HTMLforAdd
            buttonForDelete = document.querySelector('ol').querySelectorAll('#buttonForDelete') 
            listOfTask.append(div)
        }
})



    
