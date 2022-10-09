import { Model } from "./model"
import { View } from "./view"


export const Controler = {
    data: {
        keydownUsing: false,
        previousOrientation: "",
    },
    isUsingNavigator(target){

        if ( target.closest('a') ) {

            const category = target.getAttribute('data-name')

            View.deleteStartMessege()
            View.hideLabelElementNavigator()
            View.changeTitleName( target.textContent , category )
            View.showList(target.style, category)
            
        }
    },
    isClickDeleteTask(target){
        if (target.closest('#buttonForDelete')) {

            const modalWindow =  View.createModalDelete()
            const blackBackground =  View.createBlackBackground()
            View.openModalkClick( target, modalWindow, blackBackground )
        }
    },

    isTouchDeleteTask(target){
        if (target.closest('#buttonForDelete')) {

            const modalWindow =  View.createModalDelete()
            const blackBackground =  View.createBlackBackground()
            View.openModalTouch( target, modalWindow, blackBackground )
        }
    },

    isSmartPhoneInput(target){
        const menuElement = View.data.bodyElement.querySelector("#menu")
        if (target.closest('.inputForm')) {
        menuElement.classList.add( 'selectorHidden')
        }
        else {
            menuElement.classList.remove( 'selectorHidden')
        }
    },

    isDeletingTaskKeyboard( modalWindow, blackBackground, element, index ) {
        const buttonYes = modalWindow.querySelector(".buttonYes")
        const buttonNo  = modalWindow.querySelector(".buttonNo")

        buttonYes.addEventListener( 'click',  ( event ) => {

            while ( element.nextElementSibling ) {
                element.nextElementSibling.remove()
            }
            element.remove()
            
            const category = View.data.bodyElement.querySelector('.titleName').getAttribute('data-name') 
            
            Model.changeLocalStorage(category, index,  Model.deleteArrayElement)
            
            modalWindow.remove()
            blackBackground.classList.add( 'selectorHidden')
            this.data.keydownUsing = false;
        })
        buttonNo.addEventListener( 'click',  ( event ) => {
            modalWindow.remove()
            blackBackground.classList.add( 'selectorHidden')
            this.data.keydownUsing = false;
        })
        View.data.bodyElement.append(modalWindow) 
    },

    PressKeyboard(event) {
        //console.log(event);
        const { key } =  event
        const { altKey } = event
        const { target } = event
        const deleteTask = View.data.listOfTask.querySelectorAll(`li`)
        const startMessege =  View.data.bodyElement.querySelector('#start')
        
        
        if ( !startMessege && !this.data.keydownUsing ) {
        
            deleteTask.forEach( (element, index )=> {
        
                if ( element && altKey && ( index + 1 === Number(key) ) ) {
                    //const confrimDelete = confirm(`Вы действительно хотите удалить задачу ${key} ?`)
                        
                    const modalWindow =  View.createModalDelete()
                    const blackBackground =  View.createBlackBackground()
                    this.data.keydownUsing = true;
                    this.isDeletingTaskKeyboard(modalWindow, blackBackground, element, index)
                }
            
            });
        }
        
        this.isChangeBackground(target , altKey, key)
    },
    isChangeBackground(target , altKey = false, key = false) {
        if (target.closest('#last-background')) {
            View.ChangeBackground('last');
        } 
        if (target.closest('#next-background')) {
            View.ChangeBackground('next');
        }
        
        if( altKey && ( key.toLocaleLowerCase() === "и" || key.toLocaleLowerCase() === "b" )  ) {
            View.ChangeBackground('next');
        }
    },
    touchSmartPhone( event ){
        const { target } = event  
            //события появления модального окна
            this.isTouchDeleteTask(target) 
            this.isChangeBackground(target)
            this.isSmartPhoneInput(target)
            this.isUsingNavigator(target)
        
        if ( window.screen.width > 700 ) {
            View.changeModalWindowForRotating()
        }
    },
    testOrintation(){
        View.changeModalWindowForRotating()
    },
    clickPC( event ){
        const { target } = event 
        //события появления модального окна
            this.isClickDeleteTask(target) 
            this.isChangeBackground(target)
            this.isUsingNavigator(target)
    },
    userSubmitTask( event ) {
     
        event.preventDefault()
        const { target } = event
        if (target.nameTask.value) {
            
            const newTask = {
                text: `${target.nameTask.value.trim()}`,
            }

            const category = View.data.bodyElement.querySelector('.titleName').getAttribute('data-name') 
            Model.changeLocalStorage(category, newTask,  Model.pushArrayElement)
            View.addNewTask(newTask)
        }
    },
    userInputTask(event , inputForm) {
        const { target } = event
        const { value } = target
        
        const errorArray =  Model.checkValidation(value)
        View.displayError( inputForm, value, errorArray)
        
    },


}