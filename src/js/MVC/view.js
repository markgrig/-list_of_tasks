
import { Model } from "./model"

export const View = {
    data: {
        bodyElement: document.querySelector('body'),
        navigation: document.querySelector('.navigator'),
        listOfTask: document.querySelector('.list'),
    },
    hideLoading(){
        const loadingElement =  this.data.bodyElement.querySelector(".box-loading")
        const appElement = this.data.bodyElement.querySelector(".app")
        loadingElement.classList.add('selectorHidden')
        appElement.classList.remove('selectorHidden')
    },
    showLoading(){
        const loadingElement =  this.data.bodyElement.querySelector(".box-loading")
        const appElement = this.data.bodyElement.querySelector(".app")
        loadingElement.classList.remove('selectorHidden')
        appElement.classList.add('selectorHidden')
    },
    deleteStartMessege() {
    const startMessege =  this.data.bodyElement.querySelector('#start')
        if ( startMessege ) {
            const addTask =  this.data.bodyElement.querySelector('#addTask')
            startMessege.classList.add('selectorHidden')
            addTask.classList.remove('selectorHidden')
            setTimeout(() => {  startMessege.remove()}, 1000 );
        }
    },
    renderTasks(tasks, category) {

        const listCategory= this.data.bodyElement.querySelector('#'+ category)  
           
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

    }, 
    hideLabelElementNavigator() {
        let elementNavigation = this.data.navigation.firstElementChild
            while ( elementNavigation ) {
                elementNavigation.style.boxShadow = "none"
                elementNavigation = elementNavigation.nextElementSibling
            } 
    },
    changeTitleName(  textContent, category) {
        const titleName = this.data.bodyElement.querySelector('.titleName')
        titleName.classList.remove('selectorHidden')
        titleName.textContent = textContent
        titleName.setAttribute('data-name',  category )
    },
    showList( style , category ) {
        style.boxShadow = "inset 0 -6px 0 rgba(189, 35, 35, 0.842)"
                
        this.data.bodyElement.querySelectorAll('.list').forEach(element => {
            element.classList.add('selectorHidden')
        });
    
        this.data.listOfTask = this.data.bodyElement.querySelector( '#' + category)
        this.data.listOfTask.classList.remove('selectorHidden')

    },
    addNewTask( newTask ){
        const div = document.createElement('div')
        const HTMLforAdd = 
        `
        <li id="${this.data.listOfTask.querySelectorAll('div').length }">  ${newTask .text} </li> 
        <button  class="button"  type = 'submit' id = "buttonForDelete"> Удалить  </button>
        `
        div.innerHTML = HTMLforAdd
        this.data.listOfTask.append(div)
    },
    createModalDelete() {
        const modalWindow = document.createElement("div")
        const HTMLForModalWindow = `
            <h3> Вы действительно хотите удалить эту задачу? </h3>
                <div class="deleteModalButtons">
                    <button class = "button buttonNo" > Нет </button> 
                    <button class = "button buttonYes" > Да </button>
                </div>
            `
        modalWindow.id =  'deleteModal'
        modalWindow.classList.add( 'modalOverlay')
        modalWindow.innerHTML = HTMLForModalWindow; 
        return modalWindow
    },
    createBlackBackground() {
        const blackBackground = document.querySelector("#black-background")      
        blackBackground.classList.remove( 'selectorHidden')
        return blackBackground
    },
    openModalTouch( target, modalWindow, blackBackground ){
        const buttonYes = modalWindow.querySelector(".buttonYes")
        const buttonNo  = modalWindow.querySelector(".buttonNo")
        
        buttonYes.addEventListener( 'touchend',  () => {
           
            const taskForDelete =  target.closest('div'); 
            this.deleteTaskFun( taskForDelete , modalWindow, blackBackground)
    
            const indexDelete =  target.previousElementSibling.id
            const category = this.data.bodyElement.querySelector('.titleName').getAttribute('data-name') 
          
            Model.changeLocalStorage(category, indexDelete, Model.deleteArrayElement)
    
        })
        buttonNo.addEventListener( 'touchend',  ( event ) => {
            modalWindow.remove()
            blackBackground.classList.add( 'selectorHidden')
        })
        this.data.bodyElement.append(modalWindow) 
    },
    
    openModalkClick( target, modalWindow, blackBackground ) {
        const buttonYes = modalWindow.querySelector(".buttonYes")
        const buttonNo  = modalWindow.querySelector(".buttonNo")
        
        buttonYes.addEventListener( 'click',  () => {
            
            const taskForDelete =  target.closest('div'); 
            this.deleteTaskFun( taskForDelete , modalWindow, blackBackground)
    
            const indexDelete =  target.previousElementSibling.id
            const category = this.data.bodyElement.querySelector('.titleName').getAttribute('data-name') 
            
            
            Model.changeLocalStorage(category, indexDelete,  Model.deleteArrayElement)
            
        })
        buttonNo.addEventListener( 'click',  ( event ) => {
            modalWindow.remove()
            blackBackground.classList.add( 'selectorHidden')
        })
        this.data.bodyElement.append(modalWindow) 
    },
    deleteTaskFun ( task, modalWindow, blackBackground){
        task.remove()
        modalWindow.remove()
        blackBackground.classList.add( 'selectorHidden')
    },
    
    ChangeBackground( button ) {
        
        let indexBackgroundImage = Model.data.indexBackgroundImage;
     
        if ( button === 'last') {
           
            indexBackgroundImage -= 1 
                if ( indexBackgroundImage === 0 ) {
                    indexBackgroundImage = 4
                } 
        }
        if ( button === 'next') {
            indexBackgroundImage += 1
                if ( indexBackgroundImage === 5 ) {
                    indexBackgroundImage = 1
                } 
        }
        
        this.data.bodyElement.style.backgroundImage = `url('../img/background${Model.data.indexBackgroundImage}.webp')`
        Model.data.indexBackgroundImage = indexBackgroundImage;
        Model.saveInLocalStorige(indexBackgroundImage , "indexBackgroundImage")
    },
      //функция возвращающая окно подсказки 
      creatToolTip(text) {
        const toolTip = document.createElement('span')
        toolTip.textContent = text
        toolTip.className = 'toolTip'
        return toolTip
    },
    showToolTip(event) {
        const { target } = event 
            //события наведения на подсказку 
            if (target.closest('#buttonForDelete')) {
                console.log(target.previousElementSibling);
                const toolTipeHTML = this.creatToolTip( `Нажмите, чтобы удалить эту задачу` )
                target.insertAdjacentElement('afterEnd',toolTipeHTML)
            }
    },
    removeToolTip(event) {
        const { target } = event 
            // код для удаления подсказок
            if (target.closest('#buttonForDelete')) {
                target.nextElementSibling.remove()
                }
    },
    //проверка введенной задачи на валидность 
    displayError( inputForm,  value , errorArray) {
    
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
        else if (  Model.checkValidation(value) && messageBoxDOM ){
            messageBoxDOM.remove()
        }
    },
    changeModalWindowForRotating() {
        if ( window.screen.width > 700 ) {
            document.querySelector(".modalOverlay").style.height = "50%"
        } else {
            document.querySelector(".modalOverlay").style.height = "25%"
        }
    },
}
