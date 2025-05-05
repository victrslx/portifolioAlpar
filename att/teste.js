// const frase = "ola mundo e desenvolvedores de qualquer lugar"
// const testeDoThis = "alguma coisa para ver se o this vai pegar o valor"

// String.prototype.toCapitalize = function () { //qualquer string pode usar esse método
//     // const str = this.split(" ");
//     // const newStr = str.map((item) => {
//     //     return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
//     // });
//     // return newStr.join(" ");
//     console.log(this)
// }

// console.log(frase.toCapitalize()) // "Ola Mundo E Desenvolvedores De Qualquer Lugar"
// console.log(testeDoThis.toCapitalize()) // "Alguma Coisa Para Ver Se O This Vai Pegar O Valor"


function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}
var strCPF = "12225678909";
console.log(TestaCPF(strCPF));