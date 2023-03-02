import "../css/style.css"
import { Model } from "./MVC/model"
import { View } from "./MVC/view"
import { Controler } from "./MVC/controler"
//localStorage.clear()
const app = {
    data: {
        device:"",
    },
    init() {
        this.event()
        this.main()
    },
    main() {
        
        View.renderBackground();
        View.renderTasks( Model.data.tasksToday.array , "today")
        View.renderTasks( Model.data.tasksWeek.array , "week")
        View.renderTasks( Model.data.tasksFuture.array , "future")
    },
    event(){
        
        const devices = new RegExp('Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini', "i");
        
        if (devices.test(navigator.userAgent)) {

            this.data.device = "mobile"
            //проверка ориентации мобильного устройства 
            Controler.testOrintation()

        }

        if ( this.data.device === "mobile" ) {

            View.data.bodyElement.addEventListener( 'touchend', (event) => {
                Controler.touchSmartPhone(event)
            })
    
            window.addEventListener("orientationchange", () => {
                View.changeModalWindowForRotating() 
            }, false);

        } else {

            View.data.bodyElement.addEventListener( 'click' , ( event ) => {
                Controler.clickPC(event);
            })   
    
            document.addEventListener( 'keydown' , ( event ) => {
                Controler.PressKeyboard(event)
            })
            
            View.data.bodyElement.addEventListener( 'mouseover', (event) => {
                View.showToolTip(event)
            })
            
            View.data.bodyElement.addEventListener( 'mouseout', (event) => {
                View.removeToolTip(event)
            })

        }

        const inputForm = View.data.bodyElement.querySelector('.textForm')

        inputForm.addEventListener( 'input' , (event) => {
            Controler.userInputTask(event, inputForm )
        })
        
        const textForm = document.querySelector('.textForm')
        textForm.addEventListener( 'submit' , ( event ) => {
            Controler.userSubmitTask(event)
        })
        
    }
}

app.init()
    
