import { Model } from "./model"
import { Vie } from "./vie"


export const Controler = {
    data: {
        keydownUsing: false
    },
    isDeletingTaskKeyboard( modalWindow, blackBackground, element, index ) {
        const buttonYes = modalWindow.querySelector(".buttonYes")
        const buttonNo  = modalWindow.querySelector(".buttonNo")

        buttonYes.addEventListener( 'click',  ( event ) => {

            while ( element.nextElementSibling ) {
                element.nextElementSibling.remove()
            }
            element.remove()
            
            const category = Vie.data.bodyElement.querySelector('.titleName').getAttribute('data-name') 
            
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
        Vie.data.bodyElement.append(modalWindow) 
    },
    isClickDeleteTask(target){
        if (target.closest('#buttonForDelete')) {

            const modalWindow =  Vie.createModalDelete()
            const blackBackground =  Vie.createBlackBackground()
            Vie.openModalkClick( target, modalWindow, blackBackground )
        }
    },

    isTouchDeleteTask(target){
        if (target.closest('#buttonForDelete')) {

            const modalWindow =  Vie.createModalDelete()
            const blackBackground =  Vie.createBlackBackground()
            Vie.openModalTouch( target, modalWindow, blackBackground )
        }
    },

    isSmartPhoneInput(target){
        const menuElement = Vie.data.bodyElement.querySelector("#menu")
        if (target.closest('.inputForm')) {
        menuElement.classList.add( 'selectorHidden')
        }
        else {
            menuElement.classList.remove( 'selectorHidden')
        }
    },

    ckickToNavigator(event){

        const { target } = event
            
        if ( target.closest('a') ) {

            const category = target.getAttribute('data-name')

            Vie.deleteStartMessege()
            Vie.hideLabelElementNavigator()
            Vie.changeTitleName( target.textContent , category )
            Vie.showList(target.style, category)
            
        }
    },

    PressKeyboard(event) {
        //console.log(event);
        const { key } =  event
        const { altKey } = event
        const { target } = event
        const deleteTask = Vie.data.listOfTask.querySelectorAll(`li`)
        const startMessege =  Vie.data.bodyElement.querySelector('#start')
        
        
        if ( !startMessege && !this.data.keydownUsing ) {
        
            deleteTask.forEach( (element, index )=> {
        
                if ( element && altKey && ( index + 1 === Number(key) ) ) {
                    //const confrimDelete = confirm(`Вы действительно хотите удалить задачу ${key} ?`)
                        
                    const modalWindow =  Vie.createModalDelete()
                    const blackBackground =  Vie.createBlackBackground()
                    this.data.keydownUsing = true;
                    this.isDeletingTaskKeyboard(modalWindow, blackBackground, element, index)
                }
            
            });
        }
        
        this.IsChangeBackground(target , altKey, key)
    },
    IsChangeBackground(target , altKey = false, key = false) {
        if (target.closest('#last-background')) {
            Vie.ChangeBackground('last');
        } 
        if (target.closest('#next-background')) {
            Vie.ChangeBackground('next');
        }
        
        if( altKey && ( key.toLocaleLowerCase() === "и" || key.toLocaleLowerCase() === "b" )  ) {
            Vie.ChangeBackground('next');
        }
    },
    touchSmartPhone( event ){
        const { target } = event  
            //события появления модального окна
            this.isTouchDeleteTask(target) 
            this.IsChangeBackground(target)
            this.isSmartPhoneInput(target)
    },

    clickPC( event ){
        const { target } = event 
        //события появления модального окна
        if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )) {
            this.isClickDeleteTask(target) 
            this.IsChangeBackground(target)
            } 
    },
    userSubmitTask( event ) {
     
        event.preventDefault()
        const { target } = event
        if (target.nameTask.value) {
            
            const newTask = {
                text: `${target.nameTask.value.trim()}`,
            }

            const category = Vie.data.bodyElement.querySelector('.titleName').getAttribute('data-name') 
                
            Model.changeLocalStorage(category, newTask,  Model.pushArrayElement)
            Vie.addNewTask(newTask)
        }
    },
    userInputTask(event , inputForm) {
        const { target } = event
        const { value } = target
        
        const errorArray =  Model.checkValidation(value)
        Vie.displayError( inputForm, value, errorArray)
        
    },


}