class Calculadora{
    /* VARIAVEIS:

    operadorAnteriorTextElement (string)
    operadorAtualTextElement (string)
    operadorAtual (string)
    operadorAnterior (string)
    operacao (char (+,-,*,÷))

    */

    constructor(operadorAnteriorTextElement, operadorAtualTextElement){
        this.operadorAnteriorTextElement = operadorAnteriorTextElement
        this.operadorAtualTextElement = operadorAtualTextElement
        this.limpar()
        this.updateDisplay()
    }

    /* -----FUNCOES: */


    limpar(){/* AC*/
        this.operadorAtual = '0'
        this.operadorAnterior = ''
        this.operacao = undefined
    }

    deletar(){/* DEL */
        if(isNaN(parseFloat(this.operadorAtual))) return
        
        if(this.operadorAtual.length == 1) {
            this.limpar()
            return
        }

        /* deleta o ultimo numero inserido no 'operador atual'. */
        this.operadorAtual = this.operadorAtual.substring(0, this.operadorAtual.length - 1);
    }

    appendNumero(numero){/* ao usuario clicar num numero, ele é adicionado ao 'operadorAtual' */

        if(numero == '.' && this.operadorAtual.includes('.')) return /* caso o numero do operador atual ja tanha um '.' (ex: 3.1415), então não devemos adicionar outro '.' . */
        
        if(this.operadorAtual == '0' && numero !='.'){
            this.operadorAtual = numero.toString()
            return
        }
        if(isNaN(parseFloat(this.operadorAtual)) && this.operadorAtual != '') {
            this.limpar()

        }

        this.operadorAtual = String(this.operadorAtual) + numero.toString()

    }

    escolherOperacao(operacao){/* ao usuario clicar em uma operação (+ - * /), essa função deve ser chamada. */
        if(isNaN(parseFloat(this.operadorAtual))) return

        if(this.operadorAnterior != ''){
            this.calcular()
        }

        /* move o operador atual para o operador anterior;
           limpa o operador atual; */
        this.operacao = operacao
        this.operadorAnterior = this.operadorAtual
        this.operadorAtual = ''

    }

    calcular(){
        let resultado
        const anterior = parseFloat(this.operadorAnterior)
        const atual = parseFloat(this.operadorAtual)

        if(isNaN(anterior) || isNaN(atual)) return

        switch(this.operacao){
            case '+':
                resultado = anterior + atual
                break
            case '-':
                resultado = anterior - atual
                break
            case '*':
                resultado = anterior * atual
                break
            case '÷':
                if(atual == 0){
                    resultado = 'Não é possível dividir por zero'
                    break
                }else{
                    resultado = anterior / atual
                }  
                break
            default:
                return/* operacao invalida */
        }

        this.operadorAtual = String(resultado)
        this.operacao = undefined
        this.operadorAnterior = ''
    }

    formatarNumero(numero){/* input: 123456789; output: 123,456,789 */
        const stringNumber = numero.toString()

        const digitosInteiros = parseFloat(stringNumber.split('.')[0])
        const digitosDecimais = stringNumber.split('.')[1]
        let displayInteiros

        if (isNaN(digitosInteiros)) {
            displayInteiros = ''
        } else {
            displayInteiros = digitosInteiros.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (digitosDecimais != null) {
            return `${displayInteiros}.${digitosDecimais}`
        } else {
            return displayInteiros
        }
    }

    updateDisplay(){ /* atualiza os valores na area de output da calculadora. */
        
        if(!(isNaN(parseFloat(this.operadorAtual)))) {/* operador atual é um numero. */
            this.operadorAtualTextElement.innerText = this.formatarNumero(this.operadorAtual)
        }else{/* operador atual não é um numero. */
            this.operadorAtualTextElement.innerText = this.operadorAtual
        }

        if(this.operacao != null){
            this.operadorAnteriorTextElement.innerText = `${this.formatarNumero(this.operadorAnterior)} ${this.operacao}`
        }
        else{/* operacao == null */
            this.operadorAnteriorTextElement.innerText = ''
        }
    }

}

const botoesNumeros = document.querySelectorAll('[data-numero]')
const botoesOperacoes =  document.querySelectorAll('[data-operacao]')
const botaoIgual = document.querySelector('[data-igual]')
const botaoDeletar = document.querySelector('[data-deletar]')
const botaoLimpar = document.querySelector('[data-limpar]')

const operadorAnteriorTextElement = document.querySelector('[data-operador-anterior]')
const operadorAtualTextElement = document.querySelector('[data-operador-atual]')

/* ____MAIN: */

const calculadora = new Calculadora(operadorAnteriorTextElement, operadorAtualTextElement)

/* event listners que ativam ao clicar em um botao da calculadora. */


botoesNumeros.forEach(button => {
    button.addEventListener("click", ()=>{
        calculadora.appendNumero(button.innerText)
        calculadora.updateDisplay()
    })
})

botoesOperacoes.forEach(button => {
    button.addEventListener("click", ()=>{
        calculadora.escolherOperacao(button.innerText)
        calculadora.updateDisplay()
    })
})

botaoLimpar.addEventListener("click", ()=>{
    calculadora.limpar()
    calculadora.updateDisplay()
})

botaoIgual.addEventListener("click", ()=>{
    calculadora.calcular()
    calculadora.updateDisplay()
})

botaoDeletar.addEventListener("click", ()=>{
    calculadora.deletar()
    calculadora.updateDisplay()
})