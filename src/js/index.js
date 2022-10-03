import "../css/style.css"
import "../img/background1.jpg" 
import "../img/background2.jpg" 
import "../img/background3.jpg" 
import "../img/background4.jpg"

const bodyElement = document.querySelector('body') 
bodyElement.style.backgroundImage = `url(./img/background1.jpg)`

//localStorage.clear()

const navigation = bodyElement.querySelector('.navigator')
let listOfTask = bodyElement.querySelector('.list')
let indexBackgroundImage = 1
let keydownUsing = false;

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
    
//функция возвращающая окно подсказки 
const creatToolTip = (text) => {
    const toolTip = document.createElement('span')
    toolTip.textContent = text
    toolTip.className = 'toolTip'
    return toolTip
}

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

const displayError =  ( inputForm,  value , errorArray) => {
    
    const messageBoxDOM = document.querySelector('.messageAboutError')
    if ( errorArray[0] ) {

        if ( messageBoxDOM ){
            messageBoxDOM.remove()
        }

        const newMassageBox = document.createElement('span')
        newMassageBox.className = 'messageAboutError'

        
        newMassageBox.textContent = errorArray.join(' , ')
        inputForm.insertAdjacentElement('afterEnd',newMassageBox)
    } 
    else if ( checkTextValidation(value) && messageBoxDOM ){
        messageBoxDOM.remove()
    }
}
const deleteStartMessege = () => {
    const startMessege =  bodyElement.querySelector('#start')
            
        if ( startMessege ) {
            const addTask =  bodyElement.querySelector('#addTask')
            startMessege.classList.add('selectorHidden')
            addTask.classList.remove('selectorHidden')
            setTimeout(() => {  startMessege.remove()}, 1000 );
        }
}

const hideLabelElementNavigator = () => {
    let elementNavigation = navigation.firstElementChild
        while ( elementNavigation ) {
            elementNavigation.style.boxShadow = "none"
            elementNavigation = elementNavigation.nextElementSibling
        } 
}

const changeTitleName = (  textContent, category) => {
    const titleName = bodyElement.querySelector('.titleName')
    titleName.classList.remove('selectorHidden')
    titleName.textContent = textContent
    titleName.setAttribute('data-name',  category )

}
const showList = ( style , category ) => {

    style.boxShadow = "inset 0 -6px 0 rgba(189, 35, 35, 0.842)"
            
    bodyElement.querySelectorAll('.list').forEach(element => {
        element.classList.add('selectorHidden')
    });
   
    listOfTask = bodyElement.querySelector( '#' + category)
    listOfTask.classList.remove('selectorHidden')

}

const IsChangeBackground = (target , altKey = false, key = false) => {
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
}

const addNewTask = ( newTask ) => {
    const div = document.createElement('div')
    const HTMLforAdd = 
    `
    <li id="${listOfTask.querySelectorAll('div').length }">  ${newTask .text} </li> 
    <button  class="button"  type = 'submit' id = "buttonForDelete"> Удалить  </button>
    `
    div.innerHTML = HTMLforAdd
    listOfTask.append(div)
}

const deleteArrayElement = ( array = [] , indexDelete )  => {
    array.splice(indexDelete, 1 );
}

const pushArrayElement = ( array , newTask )  => {
    array.push(newTask) 
}


const changeLocalStorage = (category, argChanging, changeArray ) => {
    if ( tasksToday.category == category ) { 
        
        changeArray( tasksToday.array  , argChanging )
        localStorage.setItem("tasksToday", JSON.stringify( tasksToday ))
    }

    if ( tasksWeek.category == category ) { 
        changeArray( tasksWeek.array  , argChanging )
        localStorage.setItem("tasksWeek", JSON.stringify( tasksWeek ))
    }

    if ( tasksFuture.category == category ) { 
        changeArray( tasksFuture.array  , argChanging )
        localStorage.setItem("tasksFuture", JSON.stringify( tasksFuture ))
    }

}

const createModalDelete = () =>{
    const modalWindow = document.createElement("div")
    modalWindow.id =  'deleteModal'
    modalWindow.classList.add( 'modalOverlay')
    modalWindow.innerHTML = HTMLForModalWindow; 
    return modalWindow
}

const createBlackBackground = () =>{
    const blackBackground = document.querySelector("#black-background")      
    blackBackground.classList.remove( 'selectorHidden')
    return blackBackground
}

const deleteTaskFun = ( task, modalWindow, blackBackground) => {
    task.remove()
    modalWindow.remove()
    blackBackground.classList.add( 'selectorHidden')
}

const openModalTouch = ( target, modalWindow, blackBackground ) => {
    const buttonYes = modalWindow.querySelector(".buttonYes")
    const buttonNo  = modalWindow.querySelector(".buttonNo")
    
    buttonYes.addEventListener( 'touchend',  () => {
        
        const taskForDelete =  target.closest('div'); 
        deleteTaskFun( taskForDelete , modalWindow, blackBackground)

        const indexDelete =  target.previousElementSibling.id
        const category = bodyElement.querySelector('.titleName').getAttribute('data-name') 
        changeLocalStorage(category, indexDelete, deleteArrayElement)

    })
    buttonNo.addEventListener( 'touchend',  ( event ) => {
        modalWindow.remove()
        blackBackground.classList.add( 'selectorHidden')
    })
    bodyElement.append(modalWindow) 
}

const openModalkClick = ( target, modalWindow, blackBackground ) => {
    const buttonYes = modalWindow.querySelector(".buttonYes")
    const buttonNo  = modalWindow.querySelector(".buttonNo")
    
    buttonYes.addEventListener( 'click',  () => {
        
        const taskForDelete =  target.closest('div'); 
        deleteTaskFun( taskForDelete , modalWindow, blackBackground)

        const indexDelete =  target.previousElementSibling.id
        const category = bodyElement.querySelector('.titleName').getAttribute('data-name') 
        changeLocalStorage(category, indexDelete, deleteArrayElement)

    })
    buttonNo.addEventListener( 'click',  ( event ) => {
        modalWindow.remove()
        blackBackground.classList.add( 'selectorHidden')
    })
    bodyElement.append(modalWindow) 
}

const isDeletingTaskKeyboard = ( modalWindow, blackBackground, element, index ) => {
    const buttonYes = modalWindow.querySelector(".buttonYes")
    const buttonNo  = modalWindow.querySelector(".buttonNo")

    buttonYes.addEventListener( 'click',  ( event ) => {

        while ( element.nextElementSibling ) {
            element.nextElementSibling.remove()
        }
        element.remove()
        
        const category = bodyElement.querySelector('.titleName').getAttribute('data-name') 
        
        changeLocalStorage(category, index, deleteArrayElement)
        
        modalWindow.remove()
        blackBackground.classList.add( 'selectorHidden')
        keydownUsing = false;
    })
    buttonNo.addEventListener( 'click',  ( event ) => {
        modalWindow.remove()
        blackBackground.classList.add( 'selectorHidden')
        keydownUsing = false;
    })
    bodyElement.append(modalWindow) 
}
const isClickDeleteTask = (target) =>{
    if (target.closest('#buttonForDelete')) {

        const modalWindow = createModalDelete()
        const blackBackground = createBlackBackground()
        openModalkClick( target, modalWindow, blackBackground )
    }
}

const isTouchDeleteTask = (target) =>{
    if (target.closest('#buttonForDelete')) {

        const modalWindow = createModalDelete()
        const blackBackground = createBlackBackground()
        openModalTouch( target, modalWindow, blackBackground )
    }
}

const isSmartPhoneInput = (target) => {
    const menuElement = bodyElement.querySelector("#menu")
    if (target.closest('.inputForm')) {
        menuElement.classList.add( 'selectorHidden')
    }
    else {
        menuElement.classList.remove( 'selectorHidden')
    }
}

const ckickToNavigator = async (event) => {

    const { target } = event
        
    if ( target.closest('a') ) {

        const category = target.getAttribute('data-name')

        deleteStartMessege()
        hideLabelElementNavigator()
        changeTitleName( target.textContent , category )
        showList(target.style, category)
        
    }
}

const PressKeyboard = (event) => {
            //console.log(event);
            const { key } =  event
            const { altKey } = event
            const { target } = event
            const deleteTask = listOfTask.querySelectorAll(`li`)
            const startMessege =  bodyElement.querySelector('#start')
            
            
            if ( !startMessege && !keydownUsing ) {
            
                deleteTask.forEach( (element, index )=> {
            
                    if ( element && altKey && ( index + 1 === Number(key) ) ) {
                        //const confrimDelete = confirm(`Вы действительно хотите удалить задачу ${key} ?`)
                            
                        const modalWindow = createModalDelete()
                        const blackBackground = createBlackBackground()
                        keydownUsing = true;
                        isDeletingTaskKeyboard(modalWindow, blackBackground, element, index)
                    }
                
                });
            }
               
            IsChangeBackground(target , altKey, key)
}

const touchSmartPhone = ( event ) => {
    const { target } = event  
    //события появления модального окна
   isTouchDeleteTask(target) 
   IsChangeBackground(target)
   isSmartPhoneInput(target)
}

const clickPC = ( event ) => {
        const { target } = event 
    //события появления модального окна
    if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )) {
        isClickDeleteTask(target) 
        IsChangeBackground(target)
        } 
}
const userSubmitTask = ( event ) => {
     
     event.preventDefault()
     const { target } = event
     if (target.nameTask.value) {
         
         const newTask = {
             text: `${target.nameTask.value.trim()}`,
         }

         const category = bodyElement.querySelector('.titleName').getAttribute('data-name') 
               
        changeLocalStorage(category, newTask, pushArrayElement)
        addNewTask(newTask)
     }
}

const Controler = {
    
const isDeletingTaskKeyboard = ( modalWindow, blackBackground, element, index ) => {
    const buttonYes = modalWindow.querySelector(".buttonYes")
    const buttonNo  = modalWindow.querySelector(".buttonNo")

    buttonYes.addEventListener( 'click',  ( event ) => {

        while ( element.nextElementSibling ) {
            element.nextElementSibling.remove()
        }
        element.remove()
        
        const category = bodyElement.querySelector('.titleName').getAttribute('data-name') 
        
        changeLocalStorage(category, index, deleteArrayElement)
        
        modalWindow.remove()
        blackBackground.classList.add( 'selectorHidden')
        keydownUsing = false;
    })
    buttonNo.addEventListener( 'click',  ( event ) => {
        modalWindow.remove()
        blackBackground.classList.add( 'selectorHidden')
        keydownUsing = false;
    })
    bodyElement.append(modalWindow) 
}
const isClickDeleteTask = (target) =>{
    if (target.closest('#buttonForDelete')) {

        const modalWindow = createModalDelete()
        const blackBackground = createBlackBackground()
        openModalkClick( target, modalWindow, blackBackground )
    }
}

const isTouchDeleteTask = (target) =>{
    if (target.closest('#buttonForDelete')) {

        const modalWindow = createModalDelete()
        const blackBackground = createBlackBackground()
        openModalTouch( target, modalWindow, blackBackground )
    }
}

const isSmartPhoneInput = (target) => {
    const menuElement = bodyElement.querySelector("#menu")
    if (target.closest('.inputForm')) {
        menuElement.classList.add( 'selectorHidden')
    }
    else {
        menuElement.classList.remove( 'selectorHidden')
    }
}

const ckickToNavigator = async (event) => {

    const { target } = event
        
    if ( target.closest('a') ) {

        const category = target.getAttribute('data-name')

        deleteStartMessege()
        hideLabelElementNavigator()
        changeTitleName( target.textContent , category )
        showList(target.style, category)
        
    }
}

    PressKeyboard(event) {
        //console.log(event);
        const { key } =  event
        const { altKey } = event
        const { target } = event
        const deleteTask = listOfTask.querySelectorAll(`li`)
        const startMessege =  bodyElement.querySelector('#start')
        
        
        if ( !startMessege && !keydownUsing ) {
        
            deleteTask.forEach( (element, index )=> {
        
                if ( element && altKey && ( index + 1 === Number(key) ) ) {
                    //const confrimDelete = confirm(`Вы действительно хотите удалить задачу ${key} ?`)
                        
                    const modalWindow = createModalDelete()
                    const blackBackground = createBlackBackground()
                    keydownUsing = true;
                    isDeletingTaskKeyboard(modalWindow, blackBackground, element, index)
                }
            
            });
        }
        
        IsChangeBackground(target , altKey, key)
    },

    touchSmartPhone( event ){
    const { target } = event  
        //события появления модального окна
        isTouchDeleteTask(target) 
        IsChangeBackground(target)
        isSmartPhoneInput(target)
    },

    clickPC( event ){
        const { target } = event 
        //события появления модального окна
        if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )) {
            isClickDeleteTask(target) 
            IsChangeBackground(target)
            } 
    },
    userSubmitTask( event ) {
     
        event.preventDefault()
        const { target } = event
        if (target.nameTask.value) {
            
            const newTask = {
                text: `${target.nameTask.value.trim()}`,
            }

            const category = bodyElement.querySelector('.titleName').getAttribute('data-name') 
                
            changeLocalStorage(category, newTask, pushArrayElement)
            addNewTask(newTask)
        }
},


}
const userInputTask = (event , inputForm) => {
    const { target } = event
    const { value } = target
    
    const errorArray = checkTextValidation(value)
    displayError( inputForm, value, errorArray)
    
}

const app = {
    init() {
        this.event()
        this.main()
    },
    main() {
        renderTasks( tasksToday.array , "today")
        renderTasks( tasksWeek.array , "week")
        renderTasks( tasksFuture.array , "future")
    },
    event(){
        navigation.addEventListener(  'click' , ( event ) => {
            ckickToNavigator(event)
        })

        
        //удаление задач с использованием клавиши альт
        document.addEventListener( 'keydown' , ( event ) => {
            Controler.PressKeyboard(event)
        })

        
        bodyElement.addEventListener( 'touchend', (event) => {
            touchSmartPhone(event)
        }) 


        bodyElement.addEventListener( 'click' , ( event ) => {
            Controler.clickPC(event);
        })   

        const inputForm = document.querySelector('.textForm')
        inputForm.addEventListener( 'input' , (event) => {
            userInputTask(event, inputForm )
        })
        
        const textForm = document.querySelector('.textForm')
        textForm.addEventListener( 'submit' , ( event ) => {
            Controler.userSubmitTask(event)
        })

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

    }
}

app.init()
    
