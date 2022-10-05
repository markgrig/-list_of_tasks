import { View } from "./view"


export const Model = {
    data: {
        tasksToday : JSON.parse( localStorage.getItem("tasksToday") ) ||
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
        },

        tasksWeek: JSON.parse( localStorage.getItem("tasksWeek") ) ||
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
        },

        tasksFuture: JSON.parse( localStorage.getItem("tasksFuture") ) ||
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
        },
        indexBackgroundImage : JSON.parse( localStorage.getItem("indexBackgroundImage") )|| 1,
    },
    deleteArrayElement( array = [] , indexDelete ) {
        array.splice(indexDelete, 1 );
    },
    pushArrayElement( array , newTask ) {
        array.push(newTask) 
    },
    changeLocalStorage(category, argChanging, changeArray ){
        console.log(this.data.tasksToday.category );
        
        if ( this.data.tasksToday.category == category ) { 
            
            changeArray( this.data.tasksToday.array  , argChanging )
            localStorage.setItem("tasksToday", JSON.stringify( this.data.tasksToday ))
        }
    
        if ( this.data.tasksWeek.category == category ) { 
            changeArray( this.data.tasksWeek.array  , argChanging )
            localStorage.setItem("tasksWeek", JSON.stringify( this.data.tasksWeek ))
        }
    
        if ( this.data.tasksFuture.category == category ) { 
            changeArray( this.data.tasksFuture.array  , argChanging )
            localStorage.setItem("tasksFuture", JSON.stringify( this.data.tasksFuture ))
        }
        
    },
    checkValidation( text ) {
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
            const arrayTasks = View.data.listOfTask.querySelectorAll(`li`)
            const searchTask =  [...arrayTasks ].some( el => { return el.textContent.toLocaleLowerCase().trim() === text.toLocaleLowerCase().trim()   } )
            
            if ( searchTask ){
                errorArray.push('Такая задача уже есть!')
            }
        }
        return errorArray
    }, 
    saveInLocalStorige( indexBackgroundImage, nameSaver ) { 
        localStorage.setItem(`${nameSaver}`, JSON.stringify( indexBackgroundImage ))
    }
}