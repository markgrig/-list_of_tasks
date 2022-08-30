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

//ещё есть mousemove

document.addEventListener( 'contextmenu' , ( event ) => {
    //console.log(event);
    //event.preventDefault()

})


//change (после ввода), input (сразу!)

const checkTextValidation = ( text ) => {
     if ( !text ) {
        return false 
     } 
     else {
        return true 
     }
}

const textForAdd = document.querySelector('.textForm')

textForAdd.addEventListener( 'input' , (event) => {
   
    const { target } = event
    const { value } = target
    
    const messageBoxDOM = document.querySelector('.messageAboutError')
    if ( !checkTextValidation(value)) {
        const newMassageBox = document.createElement('span')
        newMassageBox.className = 'messageAboutError'
        newMassageBox.textContent = 'Пустое поле для добавления задачи!'
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
        }
})



    