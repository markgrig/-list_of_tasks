import "../css/style.css"
import "../img/background1.jpg" 
import "../img/background2.jpg" 
import "../img/background3.jpg" 
import "../img/background4.jpg"

const bodyElement = document.querySelector('body') 
bodyElement.style.backgroundImage = `url(./img/background1.jpg)`

//localStorage.clear()
//навигация по сайту
const navigation = bodyElement.querySelector('.navigator')
let listOfTask = bodyElement.querySelector('.list') 

//задачи добавляемые в список с использованием JS
const tasksToday = JSON.parse( localStorage.getItem("tasksToday") ) ||
{
    array: 
    [
        {
            text: "Повторить пройденный материал"
        },
        {
            text: "Cделать Дз к уроку по JavaScript"
        },
        {
            text: 'Посмотреть новый урок по JavaScript',
        },
        {
    
            text: 'Выполнить тест после урока',
        },
        {
            text: 'Выполнить ДЗ после урока',
        },
    ],
    category: "today"
}

const tasksWeek = JSON.parse( localStorage.getItem("tasksWeek") ) ||
 {
    array: 
    [
        {
            text: "Начать учить какой-то модный фреймворк"
        },
        {
            text: "Сделать сервре Node.js общедсотупным"
        },
        {
            text: 'Начать новый проект',
        },
    ],
    category: "week"
}

const HTMLForModalWindow = `
<h3> Вы действительно хотите удалить эту задачу? </h3>
    <div class="deleteModalButtons">
        <button class = "button buttonNo" > Нет </button> 
        <button class = "button buttonYes" > Да </button>
    </div>
`

const tasksFuture = JSON.parse( localStorage.getItem("tasksFuture") ) ||
{
    array: 
    [
        {
            text: "Выучить какой-то модный фреймворк"
        },
        {
            text: "Оптимизировать свои самые первые проекты"
        },
    ]
    ,
    category: "future"
}

const renderTasks = (tasks, category) => {

    const listCategory= bodyElement.querySelector('#'+ category)  
            
    tasks.forEach( ( el, i ) => {
        const div = document.createElement('div')
        const HTMLforApp = 
        `
        <li id = "${i}" >  ${el.text} </li> 
        <button  class="button"  type = 'submit' id = "buttonForDelete"> Удалить  </button>
        `
        div.innerHTML = HTMLforApp

        listCategory.append(div)
        
    })

} 

renderTasks( tasksToday.array , "today")
renderTasks( tasksWeek.array , "week")
renderTasks( tasksFuture.array , "future")

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

        const category = target.getAttribute('data-name')
        listOfTask = bodyElement.querySelector( '#' + category)
        listOfTask.classList.remove('selectorHidden')

    }
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
                
            const modalWindow = document.createElement("div")
            modalWindow.id =  'deleteModal'
            modalWindow.classList.add( 'modalOverlay')
            modalWindow.innerHTML = HTMLForModalWindow; 
            modalWindow.firstChild.nextElementSibling.textContent = `Вы xотите удалить задачу под номером ${key} ?`
            
            const blackBackground = document.querySelector("#black-background")      
            blackBackground.classList.remove( 'selectorHidden')

            const buttonYes = modalWindow.querySelector(".buttonYes")
            const buttonNo  = modalWindow.querySelector(".buttonNo")
            console.log(modalWindow);
            buttonYes.addEventListener( 'click',  ( event ) => {

                while ( element.nextElementSibling ) {
                    element.nextElementSibling.remove()
                }
                element.remove()
                console.log(element);
                
                const category = bodyElement.querySelector('.titleName').getAttribute('data-name') 
                  
                if ( tasksToday.category == category ) { 
                    tasksToday.array.splice(index, 1 );
                    console.log(tasksToday);
                    localStorage.setItem("tasksToday", JSON.stringify( tasksToday ))
                }
                
                modalWindow.remove()
                blackBackground.classList.add( 'selectorHidden')
            
            })
            buttonNo.addEventListener( 'click',  ( event ) => {
                modalWindow.remove()
                blackBackground.classList.add( 'selectorHidden')
            })
            bodyElement.append(modalWindow) 
        }
    
    });

    if( altKey && ( key.toLocaleLowerCase() === "и" || key.toLocaleLowerCase() === "b" )  ) {
        
        indexBackgroundImage += 1
        if ( indexBackgroundImage === 5 ) {
            indexBackgroundImage = 1
        } 
        if ( indexBackgroundImage === 0 ) {
            indexBackgroundImage = 4
        }

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
        const toolTipeHTML = creatToolTip( `Нажмите, чтобы удалить эту задачу` )
        target.insertAdjacentElement('afterEnd',toolTipeHTML)
    }
})

bodyElement.addEventListener( 'mouseout', (event) => {
    const { target } = event 
    // код для удаления подсказок
    if (target.closest('#buttonForDelete')) {
        target.nextElementSibling.remove()
        }
})

bodyElement.addEventListener( 'touchend', (event) => {
    const { target } = event  
    //события появления модального окна
    if (target.closest('#buttonForDelete')) {

        const modalWindow = document.createElement("div")
        modalWindow.id =  'deleteModal'
        modalWindow.classList.add( 'modalOverlay')
        modalWindow.innerHTML = HTMLForModalWindow; 

        const blackBackground = document.querySelector("#black-background")      
        blackBackground.classList.remove( 'selectorHidden')

        const buttonYes = modalWindow.querySelector(".buttonYes")
        const buttonNo  = modalWindow.querySelector(".buttonNo")

        buttonYes.addEventListener( 'touchend',  ( event ) => {

            const indexDelete =  target.previousElementSibling.id
            const category = bodyElement.querySelector('.titleName').getAttribute('data-name') 

            target.closest('div').remove()
            modalWindow.remove()
            blackBackground.classList.add( 'selectorHidden')

            if ( tasksToday.category == category ) { 
                tasksToday.array.splice(indexDelete, 1 );
                localStorage.setItem("tasksToday", JSON.stringify( tasksToday ))
            }

            if ( tasksWeek.category == category ) { 
                tasksWeek.array.splice(indexDelete, 1 );
                localStorage.setItem("tasksWeek", JSON.stringify( tasksWeek ))
            }

            if ( tasksFuture.category == category ) { 
                tasksFuture.array.splice(indexDelete, 1 );
                localStorage.setItem("tasksFuture", JSON.stringify( tasksFuture ))
            }

        })
        buttonNo.addEventListener( 'touchend',  ( event ) => {
            modalWindow.remove()
            blackBackground.classList.add( 'selectorHidden')
        })
        bodyElement.append(modalWindow) 
    }
    if (target.closest('#last-background')) {
        indexBackgroundImage -= 1 
        if ( indexBackgroundImage === 0 ) {
            indexBackgroundImage = 4
        }

        bodyElement.style.backgroundImage = `url(./img/background${indexBackgroundImage}.jpg)`
    }
    if (target.closest('#next-background')) {
        indexBackgroundImage += 1
        if ( indexBackgroundImage === 5 ) {
            indexBackgroundImage = 1
        } 
        bodyElement.style.backgroundImage = `url(./img/background${indexBackgroundImage}.jpg)`
    }
}) 


bodyElement.addEventListener( 'click' , ( event ) => {

    const { target } = event 
    
    //события появления модального окна
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )) {
    if (target.closest('#buttonForDelete')) {

        
        const modalWindow = document.createElement("div")
        modalWindow.id =  'deleteModal'
        modalWindow.classList.add( 'modalOverlay')
        modalWindow.innerHTML = HTMLForModalWindow; 
         
        const blackBackground = document.querySelector("#black-background")      
        blackBackground.classList.remove( 'selectorHidden')

        const buttonYes = modalWindow.querySelector(".buttonYes")
        const buttonNo  = modalWindow.querySelector(".buttonNo")

        
        buttonYes.addEventListener( 'click',  ( event ) => {

            const indexDelete =  target.previousElementSibling.id                 
            const category = bodyElement.querySelector('.titleName').getAttribute('data-name') 
            
            target.closest('div').remove()
            modalWindow.remove()
            blackBackground.classList.add( 'selectorHidden')

            if ( tasksToday.category == category ) { 
                tasksToday.array.splice(indexDelete, 1 );
                localStorage.setItem("tasksToday", JSON.stringify( tasksToday ))
            }

            if ( tasksWeek.category == category ) { 
                tasksWeek.array.splice(indexDelete, 1 );
                localStorage.setItem("tasksWeek", JSON.stringify( tasksWeek ))
            }

            if ( tasksFuture.category == category ) { 
                tasksFuture.array.splice(indexDelete, 1 );
                localStorage.setItem("tasksFuture", JSON.stringify( tasksFuture ))
            }

        })
        buttonNo.addEventListener( 'click',  ( event ) => {
            modalWindow.remove()
            blackBackground.classList.add( 'selectorHidden')
        })

        bodyElement.append(modalWindow)   
    }
    if (target.closest('#last-background')) {
        indexBackgroundImage -= 1 
        if ( indexBackgroundImage === 0 ) {
            indexBackgroundImage = 4
        }

        bodyElement.style.backgroundImage = `url(./img/background${indexBackgroundImage}.jpg)`
    }
    if (target.closest('#next-background')) {
        indexBackgroundImage += 1
        if ( indexBackgroundImage === 5 ) {
            indexBackgroundImage = 1
        } 
        bodyElement.style.backgroundImage = `url(./img/background${indexBackgroundImage}.jpg)`
    }
    }
    else{
        const menuElement = bodyElement.querySelector("#menu")
        if (target.closest('.textForAdd')) {
            menuElement.classList.add( 'selectorHidden')
        }
        else {
            menuElement.classList.remove( 'selectorHidden')
        }
    }
})   

//проверка введенной задачи на валидность 
const checkTextValidation = ( text ) => {
    const errorArray = []
    if ( !text ) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            errorArray.push('Пустое поле!') 
        }
        else {
            errorArray.push('Пустое поле для добавления задачи!') 
        }
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

            const category = bodyElement.querySelector('.titleName').getAttribute('data-name') 
                  
            if ( tasksToday.category == category ) { 
                tasksToday.array.push(newTask)
                localStorage.setItem("tasksToday", JSON.stringify( tasksToday ))
            }
            if ( tasksWeek.category == category ) {  
                tasksWeek.array.push(newTask) 
                localStorage.setItem("tasksWeek", JSON.stringify( tasksWeek ))
            }
            if ( tasksFuture.category == category ) {  
                tasksFuture .array.push(newTask)
                localStorage.setItem("tasksFuture", JSON.stringify( tasksFuture ))
            }
            
            const div = document.createElement('div')
            const HTMLforAdd = 
            `
            <li id="${listOfTask.querySelectorAll('div').length }">  ${newTask .text} </li> 
            <button  class="button"  type = 'submit' id = "buttonForDelete"> Удалить  </button>
            `
            div.innerHTML = HTMLforAdd
            buttonForDelete = document.querySelector('ol').querySelectorAll('#buttonForDelete') 
            listOfTask.append(div)
        }
})



    
