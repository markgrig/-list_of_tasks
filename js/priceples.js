class Plan {
    #size
    
    static initialValue = {
        type : "личный" ,
        numberOfPassangers : 4
    }

    //конструктор - основная цель, которого инициализация параметров вначале 
    constructor(type , numberOfPassangers) {
        this.type = type || Plan.initialValue.type
        this.numberOfPassangers =  numberOfPassangers  ||  Plan.initialValue.numberOfPassangers
        this.#size = "Большой"
    }
    
    startFlight(){
        console.log("Полетели!");
    }

    endFlight(){
        console.log("Летим домой!");
    }

    //Полиморфизим
    getStatus() {}

    get getSize(){
        return this.#size
    }

    set setSize( size) {
        this.#size = size
    }
}

//Наследование 
class MillitaryPlane extends Plan {
    constructor(type) {
        super(type, 0)
        this.numberOfGun = 1
        this.status = "Агрессия"
    }

    startFight(){
        console.log(`Нападаем! Используя ${this.numberOfGun} - количество пушек`);
    }

    setNumberOfGun(new_value){
        this.numberOfGun = new_value
    }
    getStatus() {
        console.log(this.status);
    }
}
 
const passangersPlan = new Plan("пассажирский", 100)
console.log("создание пассажирского самолёта" , passangersPlan);
passangersPlan  .startFlight()

const militaryPlan = new MillitaryPlane("военный")
console.log("создание военного самолёта" ,  militaryPlan);
militaryPlan.startFlight()
militaryPlan.startFight()
militaryPlan.endFlight()
militaryPlan.setNumberOfGun(4)
militaryPlan.startFlight()
militaryPlan.startFight()

//Инкапсуляция 
//public
console.log(militaryPlan.type);
console.log(passangersPlan.type);
//privat
//console.log(passangersPlan.#size);
//console.log(militaryPlan.#size);
console.log(militaryPlan.getSize);
militaryPlan.setSize = "Небольшой"
console.log(militaryPlan.getSize);

console.log(militaryPlan instanceof Plan );


console.log("создание начального самолёта" , new Plan());

