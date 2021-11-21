//Incio una variable para los números generados como array vacío
let randomNums = []
//Inicio un objeto vacío para los datos a enviar al front
let result = {}

//Función para obtener un número random
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

//Hago un loop para generar tantos números como me diga la cantidad y los pusheo al array
function getRandoms(cant) {
    for (let i=0; i < cant; i++) {
        randomNums.push(getRandomInt(1, 1000))
    }
}

//Encuentro el número de veces que aparece un valor en el array
function getOccurrence(array, value) {
    let count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

//Recorro el array para crear result
function getResult(array) {
    array.forEach((num)=>{
        let ocurrence = getOccurrence(array, num)
    
        //Si el item del array no está ya seteado como propiedad de result, setearlo con el valor de ocurrence
        if (!result[num]) {
            result[num] = ocurrence
        }
    })
}

process.on('message', msg => {
    getRandoms(msg)
    getResult(randomNums)
    process.send(result)
})