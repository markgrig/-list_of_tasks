import "../css/style.css"
import "../img/background1.jpg" 
import "../img/background2.jpg" 
import "../img/background3.jpg" 
import "../img/background4.jpg"
import { Model } from "./MVC/model"
import { View } from "./MVC/view"
import { Controler } from "./MVC/controler"
//localStorage.clear()
const app = {
    init() {
        this.event()
        this.main()
    },
    main() {
        View.data.bodyElement.style.backgroundImage = `url('${Model.data.imageBackgroundBase64[Model.data.indexBackgroundImage-1]}')`
        Controler.isSmartPhoneRotation()
        View.renderTasks( Model.data.tasksToday.array , "today")
        View.renderTasks( Model.data.tasksWeek.array , "week")
        View.renderTasks( Model.data.tasksFuture.array , "future")
    },
    event(){
        View.data.navigation.addEventListener(  'click' , ( event ) => {
            Controler.ckickToNavigator(event)
        })

        //удаление задач с использованием клавиши альт
        
        document.addEventListener( 'keydown' , ( event ) => {
            Controler.PressKeyboard(event)
        })

        
        View.data.bodyElement.addEventListener( 'touchend', (event) => {
            Controler.touchSmartPhone(event)
        }) 


        View.data.bodyElement.addEventListener( 'click' , ( event ) => {
            Controler.clickPC(event);
        })   

        const inputForm = document.querySelector('.textForm')
        inputForm.addEventListener( 'input' , (event) => {
            Controler.userInputTask(event, inputForm )
        })
        
        const textForm = document.querySelector('.textForm')
        textForm.addEventListener( 'submit' , ( event ) => {
            Controler.userSubmitTask(event)
        })

        View.data.bodyElement.addEventListener( 'mouseover', (event) => {
            View.showToolTip(event)
        })
        
        View.data.bodyElement.addEventListener( 'mouseout', (event) => {
            View.removeToolTip(event)
        })

        window.addEventListener("orientationchange", () => {
            View.changeModalWindowForRotating() 
        }, false);
        
    }
}

app.init()
    
