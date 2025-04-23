Array.prototype.meuMap = function (callback) { //qualquer array pode usar esse método É a função que será chamada para cada item do array, e será usada para transformar esse item. 
    const newArray = [];    //array vazio que vai receber os valores transformados
    for (let i = 0; i < this.length; i++) { //this = array que chamou o método, i = indice do array
        newArray.push(callback(this[i], i, this)); //this[i] = valor, i = indice, this = array  **callback(this[i], i, this) = função que vai transformar o valor do array, e o resultado vai ser adicionado no newArray**
        // o callback é chamado para cada item do array, e o resultado é adicionado no newArray
    }
    return newArray;
}
const numeros = [1, 2, 3];

const numerosAoQuadrado = numeros.meuMap((valor, indice, array) => { //callback
    console.log("Valor:", valor, "Índice:", indice, "Array:", array); // entendendo o callback e o this
    return valor * valor;
})
console.log(numerosAoQuadrado) // [1, 4, 9]

// Array.prototype.meuFilter = function (callback) { 
//     const newArray = [];
//     for (let i = 0; i < this.length; i++) {
//         if (callback(this[i], i, this)) { // condição do filter 
//             newArray.push(this[i]);
//         }
//     }
//     return newArray;
// }

Array.prototype.meuFilter = function (callback) {
    const newArray = [];
    for (let i = 0; i < this.length; i++) {
        const resultado = callback(this[i], i, this);
        console.log(`Valor: ${this[i]}, Índice: ${i}, Resultado do callback: ${resultado}`);
        if (resultado) {
            newArray.push(this[i]);
        }
    }
    return newArray;
};

const numeros2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const numerosPares = numeros2.meuFilter((valor) => {
    return valor % 2 === 0; // ****condição do filter**** // eu estou retornando explicitamente uma expressão booleana: true ou false. por isso o callback se torna booleno. 
    // Se trocar o return por algo que não devolve um booleano, o resultado não será booleano — mas o filter() ainda funciona, porque ele não exige "ser booleano", ele exige "ser truthy ou falsy".
    // n % 2 para números ímpares retorna 1 (truthy), n % 2 para pares retorna 0 (falsy), return "qualquer coisa"; // string = truthy
    // se o valor for par, ele vai ser adicionado no newArray
})
console.log(numerosPares) // [2, 4, 6, 8, 10]

Array.prototype.meuReduce = function (callback, valorInicial) {
    let acumulador = valorInicial !== undefined ? valorInicial : this[0]; //se o valor inicial for definido, ele vai ser o acumulador, se não, o primeiro valor do array
    for (let i = valorInicial !== undefined ? 0 : 1; i < this.length; i++) { //se o valor inicial for definido, começa do 0, se não, começa do 1
        acumulador = callback(acumulador, this[i], i, this); //callback é chamado para cada item do array, e o resultado é adicionado no acumulador
        console.log(`Acumulador: ${acumulador}, Valor atual: ${this[i]}, Índice: ${i}`);
    }
    return acumulador;
}

const numeros3 = [1, 2, 3, 4, 5];
const soma = numeros3.meuReduce((acumulador, valor) => {
    return acumulador + valor;
}, 13) //valor inicial
console.log(soma) // 28

Array.prototype.meuFind = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) { //se o callback retornar true, o valor é encontrado
            return this[i]; //retorna o valor encontrado
        }
    }
    return undefined; //se não encontrar, retorna undefined
}

const numeros4 = [1, 2, 3, 4, 5];
const numeroMaiorQue3 = numeros4.meuFind((valor) => {
    return valor > 3; //se o valor for maior que 3, ele vai ser encontrado
})
console.log(numeroMaiorQue3) // 4

Array.prototype.meuForEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
}

const numeros5 = [1, 2, 3, 4, 5];
const numerosImpressos = numeros5.meuForEach((valor, indice) => {
    console.log(`Valor: ${valor}, Índice: ${indice}`); //imprime o valor e o índice
})