//создание объектов с использованием ООП, функция
function Animal(name){
    //this метод создающий ключи
    this.name = name;
    this.getName = function() {
        return name
    }
}

//создаёт объект 
console.log ( "new создаёт объект", new Animal("кися") )
// не создаёт объект
console.log ( "без new объект не создаётся", Animal("кися") )

console.log(  "свойство name ->", new Animal("кися").name);
console.log(  "функция геттер ->",new Animal("кися").getName());   

class Animals {
    //конструктор - основная цель, которого инициализация параметров вначале 
    constructor(name) {
        this.name = name
    }
    getName() {
        return this.name
    }
    setName(new_name){
        this.name = new_name
    }
}

//создаёт объект 
console.log ( "создание объекта с помощью class", new Animals("собака") )
console.log(  "свойство name ->", new Animal("собака").name);
console.log(  "функция геттер ->",new Animal("собака").getName());  

const bird = new Animals("воробей")
console.log("создание воробья" , bird);
bird.setName("соловей")
console.log("измения птицы функцией сеттер" , bird );