class Calculadora{
    constructor(operadorAnteriorTextElement, operadorAtualTextElement){
        this.operadorAnteriorTextElement = operadorAnteriorTextElement;
        this.operadorAtualTextElement = operadorAtualTextElement;
        this.limpar()
    }

    /* -----FUNCOES: */


    limpar(){/* AC*/
        this.operadorAtual = ''
        this.operadorAnterior = ''
        this.operacao = undefined
    }

    deletar(){/* DEL */

    }

    appendNumero(numero){/* ao usuario clicar num numero, ele é adicionado ao 'operadorAtual' */

    }

    escolherOperacao(operacao){

    }

    calcular(){

    }

    updateDisplay(){ /* atualiza os valores na area de output da calculadora */

    }

}


const botoesNumeros = document.querySelectorAll('[data-numero]')
const botoesOperacoes =  document.querySelectorAll('[data-operacao]')
const botaoIgual = document.querySelector('[data-igual]')
const botaoDeletar = document.querySelector('[data-deletar]')
const botaoLimpar = document.querySelectorAll('[data-limpar]')

const operadorAnteriorTextElement = document.querySelector('[data-operador-anterior]')
const operadorAtualTextElement = document.querySelector('[data-operador-atual]')

/* dica aleatoria vs code: Alt+Z ativa/desativa quebra de linhas.*/



/* MAIN: */

const calculadora = new Calculadora(operadorAnteriorTextElement, operadorAtualTextElement)

/* event listner para botoes dos numeros */