const frase = "ola mundo e desenvolvedores de qualquer lugar"
const testeDoThis = "alguma coisa para ver se o this vai pegar o valor"

String.prototype.toCapitalize = function () { //qualquer string pode usar esse método
    // const str = this.split(" ");
    // const newStr = str.map((item) => {
    //     return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
    // });
    // return newStr.join(" ");
    console.log(this)
}

console.log(frase.toCapitalize()) // "Ola Mundo E Desenvolvedores De Qualquer Lugar"
console.log(testeDoThis.toCapitalize()) // "Alguma Coisa Para Ver Se O This Vai Pegar O Valor"