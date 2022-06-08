
class Calculator {
    constructor(pastOperandTextElement, currentOperandTextElement) {
        this.pastOperandTextElement = pastOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    
    clear() {
        this.pastOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }
    
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperations(operation) {
        if (this.currentOperand === '') return
        if (this.pastOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.pastOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation
        const past = parseFloat(this.pastOperand)
        const current = parseFloat(this.currentOperand)
        
        if (isNaN(past) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = past + current
                break;
            case '-':
                computation = past - current
                break;
            case '*':
                computation = past * current
                break;
            case '÷':
                computation = past / current
                break;
            default:
                return;
        }
        this.currentOperand = computation
        this.operation = undefined
        this.pastOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        // const floatNumber = parseFloat(number)
        // if (isNaN(floatNumber)) return ''
        // return floatNumber.toLocaleString('en')
        let integerDisplay
        
        if(isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
        

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.pastOperandTextElement.innerText = `${this.getDisplayNumber(this.pastOperand)} ${this.operation}`
        } else {
            this.pastOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equal]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const pastOperandTextElement = document.querySelector('[data-past-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(pastOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperations(button.innerText)
        calculator.updateDisplay()
    })
})

equalButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
