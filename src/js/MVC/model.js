import { View } from "./view"
import { imageBackground } from "./img/background"

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
    getBase64Image(img) {
        console.log(img);
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
    
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
    
        var dataURL = canvas.toDataURL("image/png");
    
        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    },
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
        imageBackgroundBase64: imageBackground,
    },
}