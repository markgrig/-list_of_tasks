import "../css/style.css"
import "../img/background1.jpg" 
import "../img/background2.jpg" 
import "../img/background3.jpg" 
import "../img/background4.jpg"
import { Model } from "./MVC/model"
import { Vie } from "./MVC/vie"
import { Controler } from "./MVC/controler"


const app = {
    init() {
        this.event()
        this.main()
    },
    main() {
        Vie.data.bodyElement.style.backgroundImage = `url(./img/background${Model.data.indexBackgroundImage}.jpg)`
        Vie.renderTasks( Model.data.tasksToday.array , "today")
        Vie.renderTasks( Model.data.tasksWeek.array , "week")
        Vie.renderTasks( Model.data.tasksFuture.array , "future")
    },
    event(){
        Vie.data.navigation.addEventListener(  'click' , ( event ) => {
            Controler.ckickToNavigator(event)
        })

        //удаление задач с использованием клавиши альт
        
        document.addEventListener( 'keydown' , ( event ) => {
            Controler.PressKeyboard(event)
        })

        
        Vie.data.bodyElement.addEventListener( 'touchend', (event) => {
            Controler.touchSmartPhone(event)
        }) 


        Vie.data.bodyElement.addEventListener( 'click' , ( event ) => {
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

        Vie.data.bodyElement.addEventListener( 'mouseover', (event) => {
            Vie.showToolTip(event)
        })
        
        Vie.data.bodyElement.addEventListener( 'mouseout', (event) => {
            Vie.removeToolTip(event)
        })

    }
}

app.init()
    
