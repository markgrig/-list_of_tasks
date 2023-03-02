import { View } from "./view"

export const Model = {
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
            errorArray.push('Пустое поле!') 
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
    },
    
    data: {
        tasksToday : JSON.parse( localStorage.getItem("tasksToday") ) ||
        {
            array: 
            [
                {
                    text: "Решение алгоритмических задач"
                },
                {
                    text: "Просмотр курсов по React, веб-дизайну"
                },
                {
                    text: 'Работа над проектом',
                },
            ],
            category: "today"
        },

        tasksWeek: JSON.parse( localStorage.getItem("tasksWeek") ) ||
        {
            array: 
            [
                {
                    text: "Работа над проектом"
                },
                {
                    text: 'Прохождение собеседований',
                },
            ],
            category: "week"
        },

        tasksFuture: JSON.parse( localStorage.getItem("tasksFuture") ) ||
        {
            array: 
            [
                {
                    text: "Придумать новый проект"
                },
            ]
            ,
            category: "future"
        },
        indexBackgroundImage : JSON.parse( localStorage.getItem("indexBackgroundImage") )|| 1,
    },
}