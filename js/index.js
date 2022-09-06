const tasks = [
    {
        id: '1138465078061',
        completed: false,
        text: 'Посмотреть новый урок по JavaScript',
    },
    {
        id: '1138465078062',
        completed: false,
        text: 'Выполнить тест после урока',
    },
    {
        id: '1138465078063',
        completed: false,
        text: 'Выполнить ДЗ после урока',
    },
]

const listOfTask = document.querySelector('.list') 
console.log(listOfTask);
tasks.forEach( ( el) => {
    const div = document.createElement('div')
    const HTMLforApp = 
    `
    <li data-id-task="${el.id}">  ${el.text} </li> 
    <button  class="button"  type = 'submit' id = "buttonForDelete"> Удалить  </button>
    `
    div.innerHTML = HTMLforApp
    listOfTask.append(div)

})

//не входит в задачу

const navigation = document.querySelectorAll('.navigator a')

navigation.forEach( anchor => {
        anchor.addEventListener(  'click' , ( event ) => {
            navigation.forEach( element => {
                element.style.boxShadow = "none"
            })
            const { target } = event
            target.style.boxShadow = "inset 0 -6px 0 rgba(189, 35, 35, 0.842)"
        }  
    ) 
});

let indexBackgroundImage = 1

document.addEventListener( 'keydown' , ( event ) => {
    //console.log(event);
    const { key } =  event
    const { altKey } = event
    const deleteTask = document.querySelectorAll(`li`)
    deleteTask.forEach( (element, index )=> {
     
        if ( element && altKey && ( index + 1 === Number(key) ) ) {
            const confrimDelete = confirm(`Вы действительно хотите удалить задачу ${key} ?`)
            if ( confrimDelete) {
               
                while ( element.nextElementSibling ) {
                    element.nextElementSibling.remove()
                }
                element.remove()
            }
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

const creatToolTip = (text) => {
    const toolTip = document.createElement('span')
    toolTip.textContent = text
    toolTip.className = 'toolTip'
    return toolTip
}

const buttonForDelete = document.querySelector('ol').querySelectorAll('#buttonForDelete')


buttonForDelete.forEach( (element, index) => {
    element.addEventListener( 'mouseover', (event) => {
        const { target } = event 

        const toolTipeHTML = creatToolTip( `Нажмите, чтобы удалить ${index+1} задачу` )
        target.insertAdjacentElement('afterEnd',toolTipeHTML)
    
    })    
});

buttonForDelete.forEach( (element, index) => {
    element.addEventListener( 'mouseout', (event) => {
        const { target } = event 
        target.nextElementSibling.remove()
    })    
});


const checkTextValidation = ( text ) => {
    const errorArray = []
    if ( !text ) {
        errorArray.push('Пустое поле для добавления задачи!') 
     } 
     else {
        const searchTask = tasks.some( el => { return el.text.toLocaleLowerCase() === text.toLocaleLowerCase()  } )
        console.log( text.toLocaleLowerCase());
        if ( searchTask ){
            errorArray.push('Такая задача уже есть!')
        }
     }
     return errorArray
}


const textForAdd = document.querySelector('.textForm')

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

//submit    
const textForm = document.querySelector('.textForm')
textForm.addEventListener( 'submit' , ( event ) => {
        //console.log(event)
        event.preventDefault()
        const { target } = event
        if (target.nameTask.value) {
            alert(`Вы создали задачу ${target.nameTask.value.trim()}` )
            const newTask = {
                id: Date.now(),
                completed: false,
                text: `${target.nameTask.value.trim()}`,
            }
            tasks.push(newTask)
            
            const div = document.createElement('div')
            const HTMLforApp = 
            `
            <li data-id-task="${newTask .id}">  ${newTask .text} </li> 
            <button  class="button"  type = 'submit' id = "buttonForDelete"> Удалить  </button>
            `
            div.innerHTML = HTMLforApp
            listOfTask.append(div)
        }
})



    
