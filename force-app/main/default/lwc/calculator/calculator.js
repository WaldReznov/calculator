/**
 * Created by vershov on 28.01.2020.
 */

import {LightningElement, track} from 'lwc';

const digitals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['/', '*', '-', '+'];

export default class Calculator extends LightningElement {

    @track result = '0';
    getResult = false;

    clearResult() {
        this.result = '0';
        this.getResult = false;
    }

    addOperator(event) {
        let elementValue = event.target.textContent;
        let isLastElementOperation = this.isContain(this.result[`${this.result}`.length - 1], operators);

        if(isLastElementOperation){
            this.result = `${this.result}`.slice(0, -1);
        }

        this.result += elementValue;
        this.getResult = false;
    }

    addDigital(event) {
        let elementValue = event.target.textContent;

        if (this.getResult === true || this.result === '0') {
            this.result = elementValue;
        } else {
            this.result += elementValue;
        }

        this.getResult = false;
    }

    addDot() {
        if(this.checkDot(this.result)) {
            this.result += '.';
        }

        this.getResult = false;
    }

    calculate() {
        this.result = `${eval(this.result)}`;
        this.getResult = true;
    }

    isContain(item, items) {
        return items.find((element) => element === item) !== undefined;
    }

    checkDot(result) {
        for (let i = result.length - 1; 0 < i; i--) {
            if (this.isContain(result[result.length - 1], operators) || result[i] === '.') {
                return false;
            } else if (this.isContain(result[i], operators)) {
                break;
            }
        }

        return true;
    }
}