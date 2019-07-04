<template>
     <v-container class="basic">
        <!--Answer Panel-->
        <!-- <span class="item item-header" id="currentValue">0</span> -->
        <section class="answerPanel">
           <table>
               <tbody>
                   <tr><td> expr: {{ expression }}</td><td>currentExpr: {{ currentExpr }}</td><td>currentOpr: {{ currentOpr }}</td></tr>
                   <tr><td> currentNumber: {{ currentNumber }}</td><td>previousNumber: {{ previousNumber }}</td><td>currentDigit: {{ currentDigit }}</td></tr>
                   <tr><td> Ansexpression: {{ Ansexpression }}</td><td> {{ answer || "0" }}</td><td>previousOpr: {{ previousOpr }}</td></tr>
                   <tr><td> AnsexpHolder: {{ AnsexpressionHolder }}</td><td> Factl: {{ factorial }}</td><td> cNL: {{ currentNumLength }} cNLHolder: {{ currentNumberLengthHolder }}</td></tr>
                   <tr><td> DELcNFSine:{{dELETcurrentNumForTrigRatio}} </td><td> sineCNHolder: {{ sineOfCurrentNumberHolder }}</td></tr>
               </tbody>
           </table> 
        </section>

        <!--Control-->
        <div class="w3-btn">Shift</div>
        <div class="w3-btn">Alpha</div>
        <div class="w3-btn">mode</div>
        <div class="w3-btn">conv</div>
        <div class="w3-btn" v-on:click="percent()">%</div>
        <div class="w3-btn" v-on:click="clear()">C</div>
    
        <!--Calculus-->
        <div class="w3-btn"> ∫</div>
        <div class="w3-btn"> ∫<sub>ₐ</sub><sup>ᵇ</sup></div>
        <div class="w3-btn">d/dx</div>
        <div class="w3-btn">lim</div>
        <div class="w3-btn">ᴏᴏ</div>
        <div class="w3-btn">e</div>
    
        <!--Trigonometry-->
        <div class="w3-btn" v-on:click="sin('sin(')">sin</div>
        <div class="w3-btn" v-on:click="cos('cos(')">cos</div>
        <div class="w3-btn" v-on:click="tan('tan(')">tan</div>
        <div class="w3-btn" v-on:click="csc('csc(')">csc</div>
        <div class="w3-btn" v-on:click="sec('sec(')">sec</div>
        <div class="w3-btn" v-on:click="cot('cot(')">cot</div>
    
        <!--Exponent-->
        <button class="w3-btn" v-on:click="square('²')">x²</button>
        <button class="w3-btn" v-on:click="power('^')">x<sup>a</sup></button>
        <button class="w3-btn" v-on:click="squareroot('√')">√ x</button>
        <button class="w3-btn"><sup>a</sup>√ x</button>
        <button class="w3-btn">log</button>
        <button class="w3-btn" v-on:click="natural_log('ln')">ln</button>

        <!--Letters-->
        <button class="w3-btn" v-on:click="append('∑')"><strong>∑</strong></button>
        <button class="w3-btn">∑ƒ𝑥</button>
        <button class="w3-btn">∑ƒ𝑥²</button>
        <button class="w3-btn" v-on:click="append('χ²')">χ²</button>
        <button class="w3-btn"><strong>μ</strong></button>
        <button class="w3-btn" v-on:click="del()">DEL</button>
    
        <!--Permuta-combina-->
        <button class="w3-btn" v-on:click="pi('π')">π</button>
        <!-- <button class="w3-btn">θ</button> -->
        <button class="w3-btn" v-on:click="factorial('!')">!</button>
        <button class="w3-btn" v-on:click="combination('C')"><sup>n</sup>C<sub>r</sub></button>
        <button class="w3-btn" v-on:click="permutation('P')"><sup>n</sup>P<sub>r</sub></button>
        <button class="w3-btn"><strong>σ</strong></button>
        <button class="w3-btn"><strong>ρ</strong></button>

        <!--Numbers-->    
        <button class="w3-btn num" v-on:click="append('1')"><strong>1</strong></button>
        <button class="w3-btn num" v-on:click="append('2')"><strong>2</strong></button>
        <button class="w3-btn num" v-on:click="append('3')"><strong>3</strong></button>
        <button class="w3-btn num" v-on:click="append('4')"><strong>4</strong></button>
        <button class="w3-btn num" v-on:click="append('5')"><strong>5</strong></button>
        <button class="w3-btn num" v-on:click="append('6')"><strong>6</strong></button>

        <!--Numbers1-->
        <button class="w3-btn num" v-on:click="append('7')"><strong>7</strong></button>
        <button class="w3-btn num" v-on:click="append('8')"><strong>8</strong></button>
        <button class="w3-btn num" v-on:click="append('9')"><strong>9</strong></button>
        <button class="w3-btn num zero" v-on:click="append('0')"><strong>0</strong></button>
        <button class="w3-btn" v-on:click="append('(')">(</button>
        <button class="w3-btn" v-on:click="append(')')">)</button>

        <!--Operator-->
        <button class="w3-btn" v-on:click="dot()"><strong>.</strong></button>
        <button class="w3-btn orange add" v-on:click="plus('+')"><strong>+</strong></button>
        <button class="w3-btn orange subtract" v-on:click="minus('-')"><strong>-</strong></button>
        <button class="w3-btn orange" v-on:click="times('x')"><strong>x</strong></button>
        <button class="w3-btn orange" v-on:click="divide('÷')"><strong>÷</strong></button>
        <button class="w3-btn" v-on:click="equal"><strong>=</strong></button>  
     </v-container>  
</template>

<script>
import {globalAnswer, makeCurrentValueNegative, storeAnswer, clearCurrentValue, replaceTimesAndDivides} from '../special_functions/calculator.js'
import {clickButton, addSymbolToAnswer, storeAndReset, equals} from '../special_functions/calculator.js'
import {fact, permutation, combination} from '../special_functions/factorial.js'
import {sec, csc, cot} from '../special_functions/trigonometry.js'
import {square} from '../special_functions/squares.js'

export default {
    name: 'BasicScientific',
    data() {
        return {
            previousNumber: "",
            answer: "",
            prevAnswer: "",
            currentNumber: "",
            currentNumLength: 0,
            currentNumberLengthHolder: 0,
            sineOfCurrentNumberHolder: "",
            cosOfCurrentNumberHolder: "",
            tanOfCurrentNumberHolder: "",
            cscOfCurrentNumberHolder: "",
            secOfCurrentNumberHolder: "",
            cotOfCurrentNumberHolder: "",
            cummulative: "",
            operator: "",
            currentOpr: "",
            previousOpr: "",
            operatorClicked: false,
            equalClicked: false,
            sinClicked: false,
            cosClicked: false,
            tanClicked: false,
            expression: "",
            Ansexpression: "",
            AnsexpressionHolder: "",
            //factorial: "",
            currentExpr: "",
            currentDigit: "",
            dELETcurrentNumForTrigRatio: ""
        }
    },

    methods: {
        
        clear() {
            // Revert to original state
            this.answer = ""
            this.prevAnswer = ""
            this.expression = ""
            this.Ansexpression = ""
            //this.factorial = ""
            this.AnsexpressionHolder = ""
            this.currentDigit = ""
            this.currentNumber = ""
            this.currentNumLength = ""
            this.currentNumberLengthHolder = ""
            this.sineOfCurrentNumberHolder = ""
            this.cosOfCurrentNumberHolder = ""
            this.tanOfCurrentNumberHolder = ""
            this.cscOfCurrentNumberHolder = ""
            this.secOfCurrentNumberHolder = ""
            this.cotOfCurrentNumberHolder = ""
            this.currentExpr = ""
            this.previousNumber = ""
            this.operator = ""
            this.currentOpr = ""
            this.previousOpr = ""
            this.sinClicked = false
            this.cosClicked = false
            this.tanClicked = false
            this.cummulative = ""
            this.operatorClicked = false
            this.equalClicked = false
            this.dELETcurrentNumForTrigRatio = ""
        },

        percent() {
            if (eval(this.answer == 0)) {
                this.answer = `${eval(this.Ansexpression)/100}`
                //this.answer = this.current
            } else {
                this.answer = `${eval(this.answer)/100}`
            }
        },

        /** CLICKING A NUMBER */

        append(number) {
            var expressionLength = this.expression.length
            var AnsexpressionLength = this.Ansexpression.length
            this.currentNumLength = this.currentNumber.length
            this.currentNumberLengthHolder = this.currentNumLength
            this.currentNumLength++
            
            // Pressing any number initially
            if (!this.operatorClicked && this.expression === "") { 
                this.currentNumber = `${number}`
                this.currentDigit = `${number}`
                this.currentExpr = `${number}`
                this.expression = `${number}`
                this.Ansexpression += `${number}`
                return
            } 
            
            else if (!this.operatorClicked && this.expression !== "") { 
                this.expression += `${number}`
                this.currentExpr += `${number}`
                this.currentDigit = `${number}`

                /** PERMUTATION AND COMBINATION */
                if (this.currentOpr == "P") {
                    this.currentNumber += `${number}`
                    this.Ansexpression = this.Ansexpression.substr(0, AnsexpressionLength - this.currentNumLength)
                    this.AnsexpressionHolder = this.Ansexpression
                    var permutation = `${(fact(this.previousNumber)/fact(this.previousNumber - this.currentNumber))}`
                    this.Ansexpression = `${this.AnsexpressionHolder + permutation}`
                    this.answer = eval(`${this.AnsexpressionHolder + permutation}`)
                    return
                } else if (this.currentOpr == "C") {
                    this.currentNumber += `${number}`
                    this.Ansexpression = this.Ansexpression.substr(0, AnsexpressionLength - this.currentNumLength)
                    this.AnsexpressionHolder = this.Ansexpression
                    var combination = `${(fact(this.previousNumber)/(fact(this.previousNumber - this.currentNumber) * fact(this.currentNumber)))}`
                    this.Ansexpression = `${this.AnsexpressionHolder + combination}`
                    this.answer = eval(`${this.AnsexpressionHolder + combination}`)
                    return
                } 
                
                /** Sine of currentNumber */ 
                if (this.currentOpr == "sin(") {
                    
                    this.currentNumber += `${number}`
                    this.AnsexpressionHolder = this.Ansexpression

                    /**
                     * If sine was pressed BEFORE this number
                     * this becomes currentNumber,
                     * then evaluate sin(currentNumber)
                     * e.g sin(x)
                     */ 

                    if (this.previousNumber === "") {
                        // sine of 180 and 360 is 0
                        if (this.currentNumber === "180" || this.currentNumber === "360"
                        || this.currentNumber === "-180" || this.currentNumber === "-360") {
                            this.sineOfCurrentNumberHolder = ""
                            this.sineOfCurrentNumberHolder = "0"
                            this.Ansexpression += "0"
                            this.answer = eval(this.Ansexpression)
                            return
                        } else {
                            this.dELETcurrentNumForTrigRatio = this.currentNumber.substr(0, this.currentNumLength+1)
                            this.sineOfCurrentNumberHolder = `${Math.sin(this.dELETcurrentNumForTrigRatio * Math.PI/180)}`
                            this.answer = this.sineOfCurrentNumberHolder
                            return
                        }
                    }
                                    
                    /**
                     * If sine was pressed BEFORE this number
                     * let this number be the new currentNumber,
                     * then evaluate last value and sin(currentNumber)
                     * e.g, a + sin(x)
                     */ 

                    do {
                        this.dELETcurrentNumForTrigRatio = this.currentNumber.substr(0, this.currentNumLength+1)
                        this.sineOfCurrentNumberHolder = `${Math.sin(this.dELETcurrentNumForTrigRatio * Math.PI/180)}`
                        if (this.currentNumber === "180" || this.currentNumber === "360"
                        || this.currentNumber === "-180" || this.currentNumber === "-360") {
                            this.sineOfCurrentNumberHolder = ""
                            this.sineOfCurrentNumberHolder = "0"
                            this.Ansexpression += "0"
                            if (this.Ansexpression == "0/0") {
                                this.answer = "Undefined"
                                return
                            }
                            this.answer = eval(`${this.AnsexpressionHolder + this.sineOfCurrentNumberHolder}`)
                            this.currentNumberLengthHolder++
                            return
                        } else {
                            this.answer = eval(`${this.AnsexpressionHolder + this.sineOfCurrentNumberHolder}`)
                            this.currentNumberLengthHolder++
                            return
                        }
                    } while (this.currentNumLength > (this.currentNumberLengthHolder))

                /** Cosine of currentNumber */
                } else if (this.currentOpr == "cos(") {
                
                    this.currentNumber += `${number}`
                    this.AnsexpressionHolder = this.Ansexpression

                    /**
                     * If cosine was pressed BEFORE this number
                     * this becomes currentNumber,
                     * then evaluate cos(currentNumber)
                     * e.g cos(x)
                     */ 

                    if (this.previousNumber == "") {
                        // cosine of 90 and 270 is 0
                        if (this.currentNumber === "90" || this.currentNumber === "270"
                        || this.currentNumber === "-90" || this.currentNumber === "-270") {
                            this.cosOfCurrentNumberHolder = ""
                            this.cosOfCurrentNumberHolder = "0"
                            this.Ansexpression += "0"
                            this.answer = eval(this.Ansexpression)
                            return
                        } else {
                            this.dELETcurrentNumForTrigRatio = this.currentNumber.substr(0, this.currentNumLength+1)
                            this.cosOfCurrentNumberHolder = `${Math.cos(this.dELETcurrentNumForTrigRatio * Math.PI/180)}`
                            this.answer = this.cosOfCurrentNumberHolder
                            return
                        }
                    }

                    /**
                     * If cosine was pressed BEFORE this number
                     * let this number be the new currentNumber,
                     * then multiply last value by new currentNumber
                     * e.g, a + cos(x)
                     */ 

                    do {
                        this.dELETcurrentNumForTrigRatio = this.currentNumber.substr(0, this.currentNumLength+1)
                        this.cosOfCurrentNumberHolder = `${Math.cos(this.dELETcurrentNumForTrigRatio * Math.PI/180)}`
                        if (this.currentNumber === "90" || this.currentNumber === "270"
                        || this.currentNumber === "-90" || this.currentNumber === "-270") {
                            this.cosOfCurrentNumberHolder = ""
                            this.cosOfCurrentNumberHolder = "0"
                            this.Ansexpression += "0"
                            if (this.Ansexpression == "0/0") {
                                this.answer = "Undefined"
                                return
                            }
                            this.answer = eval(`${this.AnsexpressionHolder + this.cosOfCurrentNumberHolder}`)
                            this.currentNumberLengthHolder++
                            return
                        } else {
                            this.answer = eval(`${this.AnsexpressionHolder + this.cosOfCurrentNumberHolder}`)
                            this.currentNumberLengthHolder++
                            return
                        }
                    } while (this.currentNumLength > (this.currentNumberLengthHolder))

                /** Tangent of currentNumber */
                } else if (this.currentOpr == "tan(") {

                    this.currentNumber += `${number}`
                    this.AnsexpressionHolder = this.Ansexpression

                    /**
                     * If tangent was pressed BEFORE this number
                     * this becomes currentNumber,
                     * then evaluate cos(currentNumber)
                     * e.g tan(x)
                     */ 

                    if (this.previousNumber == "") {
                        // tangent of 180 and 360 is 0
                        if (this.currentNumber === "180" || this.currentNumber === "360"
                        || this.currentNumber === "-180" || this.currentNumber === "-360") {
                            this.tanOfCurrentNumberHolder = ""
                            this.tanOfCurrentNumberHolder = "0"
                            this.Ansexpression += "0"
                            this.answer = eval(this.Ansexpression)
                            return
                        } else {
                            this.dELETcurrentNumForTrigRatio = this.currentNumber.substr(0, this.currentNumLength+1)
                            this.tanOfCurrentNumberHolder = `${Math.tan(this.dELETcurrentNumForTrigRatio * Math.PI/180)}`
                            this.answer = this.tanOfCurrentNumberHolder
                            return
                        }
                    }

                    /**
                     * If tangent was pressed BEFORE this number
                     * let this number be the new currentNumber,
                     * then multiply last value by new currentNumber
                     * e.g, a + tan(x)
                     */ 

                    do {
                        this.dELETcurrentNumForTrigRatio = this.currentNumber.substr(0, this.currentNumLength+1)
                        this.tanOfCurrentNumberHolder = `${Math.tan(this.dELETcurrentNumForTrigRatio * Math.PI/180)}`
                        if (this.currentNumber === "180" || this.currentNumber === "360") {
                            this.tanOfCurrentNumberHolder = ""
                            this.tanOfCurrentNumberHolder = "0"
                            this.Ansexpression += "0"
                            if (this.Ansexpression == "0/0") {
                                this.answer = "Undefined"
                                return
                            }
                            this.answer = eval(`${this.AnsexpressionHolder + this.tanOfCurrentNumberHolder}`)
                            this.currentNumberLengthHolder++
                            return
                        } else {
                            this.answer = eval(`${this.AnsexpressionHolder + this.tanOfCurrentNumberHolder}`)
                            this.currentNumberLengthHolder++
                            return
                        }
                    } while (this.currentNumLength > (this.currentNumberLengthHolder))
                } 
                
                /** Cosecant of currentNumber */
                else if (this.currentOpr == "csc(") {

                    this.currentNumber += `${number}`
                    this.AnsexpressionHolder = this.Ansexpression

                    /**
                     * If cosecant was pressed BEFORE this number
                     * this becomes currentNumber,
                     * then evaluate cos(currentNumber)
                     * e.g csc(x)
                     */ 

                    if (this.previousNumber == "") {
                        // cosecant of 180 and 360 is Infinity
                        if (this.currentNumber === "180" || this.currentNumber === "360"
                        || this.currentNumber === "-180" || this.currentNumber === "-360") {
                            this.cscOfCurrentNumberHolder = ""
                            this.cscOfCurrentNumberHolder = "1/0"
                            this.Ansexpression += eval(this.cscOfCurrentNumberHolder)
                            this.answer = this.Ansexpression.replace("Infinity", "ᴏᴏ")
                            return
                        } else {
                            this.dELETcurrentNumForTrigRatio = this.currentNumber.substr(0, this.currentNumLength+1)
                            this.cscOfCurrentNumberHolder = `${csc(this.dELETcurrentNumForTrigRatio * Math.PI/180)}`
                            this.answer = this.cscOfCurrentNumberHolder
                            return
                        }
                    }

                    /**
                     * If cosecant was pressed BEFORE this number
                     * let this number be the new currentNumber,
                     * then multiply last value by new currentNumber
                     * e.g, a + csc(x)
                     */ 

                    do {
                        this.dELETcurrentNumForTrigRatio = this.currentNumber.substr(0, this.currentNumLength+1)
                        this.cscOfCurrentNumberHolder = `${csc(this.dELETcurrentNumForTrigRatio * Math.PI/180)}`
                        if (this.currentNumber === "180" || this.currentNumber === "360") {
                            this.cscOfCurrentNumberHolder = ""
                            this.cscOfCurrentNumberHolder = "1/0"
                            this.Ansexpression += eval(this.cscOfCurrentNumberHolder)
                            if (this.Ansexpression.substr(-9) == "/Infinity") {
                                this.answer = "0"
                                return
                            }
                            this.answer = eval(`${this.AnsexpressionHolder + this.cscOfCurrentNumberHolder}`)
                            var answerHolder = this.answer
                            if (answerHolder == "Infinity") {
                                this.answer = ""
                                this.answer = "ᴏᴏ"
                                return
                             } 
            
                            this.currentNumberLengthHolder++
                            return  
                        } else {
                            this.answer = eval(`${this.AnsexpressionHolder + this.cscOfCurrentNumberHolder}`)
                             var answerHolder = eval(this.answer)
                             if (answerHolder == "Infifnity") {
                                this.answer = ""
                                this.answer = "ᴏᴏ"
                                return
                            }
                            this.currentNumberLengthHolder++
                            return
                        }
                    } while (this.currentNumLength > (this.currentNumberLengthHolder))
                } 

                /** Secant of currentNumber */
                else if (this.currentOpr == "sec(") {

                    this.currentNumber += `${number}`
                    this.AnsexpressionHolder = this.Ansexpression

                    /**
                     * If secant was pressed BEFORE this number
                     * this becomes currentNumber,
                     * then evaluate cos(currentNumber)
                     * e.g sec(x)
                     */ 

                    if (this.previousNumber == "") {
                        // cosecant of 90 and 270 is Infinity
                        if (this.currentNumber === "90" || this.currentNumber === "270" || this.currentNumber === "-90" || this.currentNumber === "-270") {
                            this.secOfCurrentNumberHolder = ""
                            this.secOfCurrentNumberHolder = "1/0"
                            this.Ansexpression += eval(this.secOfCurrentNumberHolder)
                            this.answer = this.Ansexpression.replace("Infinity", "ᴏᴏ")
                            return
                        } else {
                            this.dELETcurrentNumForTrigRatio = this.currentNumber.substr(0, this.currentNumLength+1)
                            this.secOfCurrentNumberHolder = `${sec(this.dELETcurrentNumForTrigRatio * Math.PI/180)}`
                            this.answer = this.secOfCurrentNumberHolder
                            return
                        }
                    }

                    /**
                     * If secant was pressed BEFORE this number
                     * let this number be the new currentNumber,
                     * then multiply last value by new currentNumber
                     * e.g, a + sec(x)
                     */ 

                    do {
                        this.dELETcurrentNumForTrigRatio = this.currentNumber.substr(0, this.currentNumLength+1)
                        this.secOfCurrentNumberHolder = `${sec(this.dELETcurrentNumForTrigRatio * Math.PI/180)}`
                        if (this.currentNumber === "90" || this.currentNumber === "270") {
                            this.secOfCurrentNumberHolder = ""
                            this.secOfCurrentNumberHolder = "1/0"
                            this.Ansexpression += eval(this.secOfCurrentNumberHolder)
                            if (this.Ansexpression.substr(-9) == "/Infinity") {  
                                this.answer = "0"
                                return
                            }
                            this.answer = eval(`${this.AnsexpressionHolder + this.secOfCurrentNumberHolder}`)
                            this.currentNumberLengthHolder++
                            return
                        } else {
                            this.answer = eval(`${this.AnsexpressionHolder + this.secOfCurrentNumberHolder}`)
                            this.currentNumberLengthHolder++
                            return
                        }
                    } while (this.currentNumLength > (this.currentNumberLengthHolder))
                } 

                /** Cotangent of currentNumber */
                else if (this.currentOpr == "cot(") {

                    this.currentNumber += `${number}`
                    this.AnsexpressionHolder = this.Ansexpression

                    /**
                     * If cotangent was pressed BEFORE this number
                     * this becomes currentNumber,
                     * then evaluate cos(currentNumber)
                     * e.g cot(x)
                     */ 

                    if (this.previousNumber == "") {
                        // cotangent of 180 and 360 is infinity
                        if (this.currentNumber === "180" || this.currentNumber === "360"
                        || this.currentNumber === "-180" || this.currentNumber === "-360") {
                            this.cotOfCurrentNumberHolder = ""
                            this.cotOfCurrentNumberHolder = "1/0"
                            this.Ansexpression += eval(this.cotOfCurrentNumberHolder)
                            this.answer = this.Ansexpression.replace("Infinity", "ᴏᴏ")          //"ᴏᴏ"
                            return
                        } else {
                            this.dELETcurrentNumForTrigRatio = this.currentNumber.substr(0, this.currentNumLength+1)
                            this.cotOfCurrentNumberHolder = `${cot(this.dELETcurrentNumForTrigRatio * Math.PI/180)}`
                            this.answer = this.cotOfCurrentNumberHolder
                            return
                        }
                    }

                    /**
                     * If cotangent was pressed BEFORE this number
                     * let this number be the new currentNumber,
                     * then multiply last value by new currentNumber
                     * e.g, a + cot(x)
                     */ 

                    do {
                        this.dELETcurrentNumForTrigRatio = this.currentNumber.substr(0, this.currentNumLength+1)
                        this.cotOfCurrentNumberHolder = `${cot(this.dELETcurrentNumForTrigRatio * Math.PI/180)}`
                        if (this.currentNumber === "180" || this.currentNumber === "360") {
                            this.cotOfCurrentNumberHolder = ""
                            this.cotOfCurrentNumberHolder = "1/0"
                            this.Ansexpression += eval(this.cotOfCurrentNumberHolder)
                            if (this.Ansexpression.substr(-9) == "/Infinity") {  
                                this.answer = "0"
                                return
                            }
                            this.answer = eval(`${this.AnsexpressionHolder + this.cotOfCurrentNumberHolder}`)
                            this.currentNumberLengthHolder++
                            return
                        } else {
                            this.answer = eval(`${this.AnsexpressionHolder + this.cotOfCurrentNumberHolder}`)
                            this.currentNumberLengthHolder++
                            return
                        }
                    } while (this.currentNumLength > (this.currentNumberLengthHolder))
                } 


                else {
                    this.currentNumber += `${number}`
                    this.Ansexpression += `${number}`
                    return
                } 
            }   

              
            // Pressing the later numbers of an expression
            else if (!this.operatorClicked && this.expression !== "") { 
                this.expression += `${number}`
                this.currentExpr += `${number}`
                this.currentDigit = `${number}`

                /** SUCCESSIVE FACTORIALS (after an initial factorial operation) */ 
                if (this.currentOpr == "!") {
                /**
                 * If factorial was pressed BEFORE this number
                 * let this number be the new currentNumber,
                 * then multiply last value by new currentNumber
                 */ 
                    this.previousNumber = this.currentNumber
                    this.currentNumber = ""
                    this.currentNumber += `${number}`
                    this.Ansexpression += "*" + `${number}`
                    return
                } else {
                    this.currentNumber += `${number}`
                    this.Ansexpression += `${number}`
                    return
                } 

                // if (this.currentOpr == 'P') {
                //     var permutation = `${permutation(this.previousNumber, this.currentNumber)}`
                //     this.Ansexpression += permutation
                    
                // } 
            }   
        
            // Positive and Negative numbers
            else if (!this.operatorClicked && (this.expression == '+')) { 
                this.expression += `${number}`
                this.currentExpr += `${number}`
                this.currentDigit = `${number}`
                this.currentNumber = `${number}`
                this.Ansexpression = `${number}`
                
            }
            else if (!this.operatorClicked && (this.expression == '-')) { 
                this.expression += `${number}`
                this.currentExpr += `${number}`
                this.currentDigit = `${number}`
                this.Ansexpression = `${-1 * number}`
                this.currentNumber = `${-1 * number}`
                
            } 
            
            /** 
             * This happens after pressing an operator.
             * Note that currentNumber and currentDigit are 
             * cleared anytime an operator is clicked; 
             * only the mathematical expression is retained.
             */
            
            if (this.operatorClicked) { 
                this.expression += `${number}`        
                this.operatorClicked = false
            }
            
            if (this.currentDigit === "π") {
                this.currentDigit = `${number}`
                this.Ansexpression *= `${number}`
            } 
             
            this.answer = eval(this.Ansexpression)
        }, 

        dot() {
            if(this.currentNumber.indexOf('.') === -1) {
                this.append('.')
            }
        },


        /** FACTORIAL PERMUTATION and COMBINATION */
        factorial(opr) {
            this.equalClicked = true
            this.previousOpr = this.currentOpr
            //this.currentExpr = this.currentNumber = this.currentDigit = ""
            var expressionLength = this.expression.length


            // No immediate factorial after factorial, plus, minus, times or divide symbol
            if (this.expression.substr(`${expressionLength - 1}`) === '÷' 
            || this.expression.substr(`${expressionLength - 1}`) === 'x'
            || this.expression.substr(`${expressionLength - 1}`) === '+'
            || this.expression.substr(`${expressionLength - 1}`) === '-'
            || this.expression.substr(`${expressionLength - 1}`) === '!') {
                this.Ansexpression = this.Ansexpression
                this.expression = this.expression
                return
            }
            else {
                this.currentOpr = `${opr}`   
                this.expression += `${opr}`   // Append factorial symbol to math expression
            
                // Get lengths of Ansexpression and currentNumber
                var AnsexpressionLength = this.Ansexpression.length
                var currentNumberLength = this.currentNumber.length

                // Get factorial of currentNumber
                var factorial = `${fact(this.currentNumber)}`

                // Remove the currentNumber from Ansexpression
                this.Ansexpression = this.Ansexpression.substr(0, `${AnsexpressionLength - currentNumberLength}`)
               
                // Replace it with its factorial value
                this.Ansexpression += factorial

                // Evaluate
                this.answer = eval(this.Ansexpression)
            }
        },

        permutation(symbol) {
            this.equalClicked = true
            this.previousOpr = this.currentOpr
            this.currentExpr =`${symbol}`
            var expressionLength = this.expression.length
             
            if (this.expression.substr(expressionLength-1) === 'P') {  
                return    
            }
            
            else if (this.expression.substr(expressionLength-1) !== 'P') {
                // No immediate permutation after plus, minus, times or divide symbol
                if (this.expression.substr(`${expressionLength - 1}`) === '÷' 
                || this.expression.substr(`${expressionLength - 1}`) === 'x'
                || this.expression.substr(`${expressionLength - 1}`) === '+'
                || this.expression.substr(`${expressionLength - 1}`) === '-') {
                    this.Ansexpression = this.Ansexpression
                    this.expression = this.expression
                    return
                }
                // e.g, nP...
                else if (this.expression.substr(`${expressionLength - 1}`) !== '÷' 
                || this.expression.substr(`${expressionLength - 1}`) !== 'x'
                || this.expression.substr(`${expressionLength - 1}`) !== '+'
                || this.expression.substr(`${expressionLength - 1}`) !== '-'
                || this.expression.substr(`${expressionLength - 1}`) !== 'C') {
                    this.currentOpr = `${symbol}`   
                    this.expression += `${symbol}`   // Append square symbol to math expression
                }

                this.previousNumber = this.currentNumber
                this.currentNumber = ""
                
                //this.expression += `${symbol}`
                this.permutationClicked = true
        
                //this.currentOpr = `${symbol}`
                return
             }
        },

        combination(symbol) {
            this.equalClicked = true
            this.previousOpr = this.currentOpr
            this.currentExpr =`${symbol}`
            var expressionLength = this.expression.length
             
            if (this.expression.substr(expressionLength-1) === 'P') {  
                return    
            }
            
            else if (this.expression.substr(expressionLength-1) !== 'P') {
                // No immediate permutation after plus, minus, times or divide symbol
                if (this.expression.substr(`${expressionLength - 1}`) === '÷' 
                || this.expression.substr(`${expressionLength - 1}`) === 'x'
                || this.expression.substr(`${expressionLength - 1}`) === '+'
                || this.expression.substr(`${expressionLength - 1}`) === '-') {
                    this.Ansexpression = this.Ansexpression
                    this.expression = this.expression
                    return
                }
                // e.g, nP...
                else if (this.expression.substr(`${expressionLength - 1}`) !== '÷' 
                || this.expression.substr(`${expressionLength - 1}`) !== 'x'
                || this.expression.substr(`${expressionLength - 1}`) !== '+'
                || this.expression.substr(`${expressionLength - 1}`) !== '-'
                || this.expression.substr(`${expressionLength - 1}`) !== 'C') {
                    this.currentOpr = `${symbol}`   
                    this.expression += `${symbol}`   // Append square symbol to math expression
                }

                this.previousNumber = this.currentNumber
                this.currentNumber = ""
                
                //this.expression += `${symbol}`
                this.combinationClicked = true
        
                //this.currentOpr = `${symbol}`
                return
             }
        },

        square(opr) {
            this.equalClicked = true
            this.previousOpr = this.currentOpr
            var expressionLength = this.expression.length


            // No immediate square after factorial, plus, minus, times or divide symbol
            if (this.expression.substr(`${expressionLength - 1}`) === '÷' 
            || this.expression.substr(`${expressionLength - 1}`) === 'x'
            || this.expression.substr(`${expressionLength - 1}`) === '+'
            || this.expression.substr(`${expressionLength - 1}`) === '-'
            || this.expression.substr(`${expressionLength - 1}`) === '!') {
                this.Ansexpression = this.Ansexpression
                this.expression = this.expression
                return
            }
            else {
                this.currentOpr = `${opr}`   
                this.expression += `${opr}`   // Append square symbol to math expression
            
                // Get lengths of Ansexpression and currentNumber
                var AnsexpressionLength = this.Ansexpression.length
                var currentNumberLength = this.currentNumber.length

                // Get square of currentNumber
                var square 
                square = Math.pow(this.currentNumber, 2)

                // Remove the currentNumber from Ansexpression
                this.Ansexpression = this.Ansexpression.substr(0, `${AnsexpressionLength - currentNumberLength}`)
               
                // Replace it with its squared value
                this.Ansexpression += square

                // Evaluate
                this.answer = eval(this.Ansexpression)
            }
        },


        del() {
            this.currentNumber = this.previousNumber = currentOpr = previousOpr = currentDigit = this.currentNumLength = ""
            this.expression = this.expression.substr(0, this.expression.length - 1)
            this.Ansexpression = this.Ansexpression.substr(0, this.Ansexpression.length - 1)
            this.answer = eval(this.Ansexpression)
        },
        
        
        plus(opr) {
            this.equalClicked = true
            //this.operatorClicked = true

            var expressionLength = this.expression.length

            // If plus is present and second plus is pressed...
            if (this.expression.substr(`${expressionLength - 1}`) === '+') {
                this.currentOpr = "+"           
                return
            } 
            
            // If minus is present and a plus is pressed..
            else if (this.expression.substr(`${expressionLength - 1}`) === '-') {
                this.currentOpr = "-"        
                return
            }

            this.previousNumber = this.currentNumber
            this.previousOpr = this.currentOpr
            this.currentExpr = this.currentNumber = this.currentDigit = this.sineOfCurrentNumberHolder = ""
            this.currentNumLength = this.currentNumberLengthHolder = this.dDELETcurrentNumForTrigRatio = ""
            this.cosOfCurrentNumberHolder = this.tanOfCurrentNumberHolder = ""
            this.cscOfCurrentNumberHolder = this.secOfCurrentNumberHolder = this.tanOfCurrentNumberHolder = ""
            
            // No immediate plus after times or divide symbol
            if (this.expression.substr(`${expressionLength - 1}`) === '÷' 
            || this.expression.substr(`${expressionLength - 1}`) === 'x') {
                this.Ansexpression = this.Ansexpression
                this.expression = this.expression
                return
            }
             else {
                this.currentOpr = `${opr}`
                this.expression += `${opr}`
                this.Ansexpression += `${opr}`
            }
        },

        minus(opr) {
            this.equalClicked = true
            //this.operatorClicked = true

            var expressionLength = this.expression.length
            var currentNumberLength = this.currentNumber.length

            if (this.expression === "") {
                this.currentOpr = `${opr}`
                this.currentNumber = `${opr}`
                this.expression = `${opr}`
                this.Ansexpression = `${opr}`
                this.currentDigit = `${opr}`
                return
            }

            // If minus is present and second minus is pressed...
            else if (this.expression.substr(`${expressionLength - 1}`) === '-') {
                this.currentOpr = "+"        
                this.expression = this.expression.substr(0, `${expressionLength - 1}`) // ...remove previous minus
                this.Ansexpression = this.Ansexpression.substr(0, `${expressionLength - 1}`)  // ...remove previous minus
                this.currentNumber = this.currentNumber.substr(0, `${currentNumberLength - 1}`)  // ...remove previous minus
                this.expression += "+"       //...and change to plus
                this.Ansexpression += "+"       
                return

            // If plus is present and a minus is pressed..
            } else if (this.expression.substr(`${expressionLength - 1}`) === '+') {
                this.currentOpr = `${opr}`        
                this.expression = this.expression.substr(0, `${expressionLength - 1}`) // ...remove previous plus
                this.Ansexpression = this.expression.substr(0, `${expressionLength - 1}`) // ...remove previous plus
                this.currentNumber = this.currentNumber.substr(0, `${currentNumberLength - 1}`)  // ...remove previous minus       
                this.expression += `${opr}`       //...and change to minus  
                this.Ansexpression += `${opr}`
                this.currentNumber += `${opr}`        
                return

            // Pressing the negative sign of a negative angle e.g sin(-x)
            } else if (this.expression.substr(`${expressionLength - 4}`) === 'sin('
            || this.expression.substr(`${expressionLength - 4}`) === 'cos('
            || this.expression.substr(`${expressionLength - 4}`) === 'tan('
            || this.expression.substr(`${expressionLength - 4}`) === 'csc('
            || this.expression.substr(`${expressionLength - 4}`) === 'sec('
            || this.expression.substr(`${expressionLength - 4}`) === 'cot(') {
                this.expression += `${opr}`
                this.currentNumber += `${opr}`
                this.currentExpr += `${opr}`
                return
            }


            this.previousNumber = this.currentNumber
            this.previousOpr = this.currentOpr
            this.currentExpr = this.currentNumber = this.currentDigit = this.sineOfCurrentNumberHolder = ""
            this.currentNumLength = this.currentNumberLengthHolder = this.dDELETcurrentNumForTrigRatio = ""
            this.cosOfCurrentNumberHolder = this.tanOfCurrentNumberHolder = ""
            this.cscOfCurrentNumberHolder = this.secOfCurrentNumberHolder = this.tanOfCurrentNumberHolder = ""

            // No immediate minus after times or divide symbols
            if (this.expression.substr(`${expressionLength - 1}`) === '÷' 
                || this.expression.substr(`${expressionLength - 1}`) === 'x') {
                this.Ansexpression = this.Ansexpression
                this.expression = this.expression
                return

            } else {
                this.currentOpr = `${opr}`
                this.expression += `${opr}`
                this.Ansexpression += `${opr}`
            }
        },

        times(opr) {
            this.equalClicked = true
            //this.operatorClicked = true
            this.previousNumber = this.currentNumber
            this.previousOpr = this.currentOpr
            this.currentExpr = this.currentNumber = this.currentDigit = this.currentNumLength = ""
            var expressionLength = this.expression.length

            // No immediate times after times or divide symbols
            if (this.expression.substr(`${expressionLength - 1}`) === '÷' 
                || this.expression.substr(`${expressionLength - 1}`) === 'x') {
                return
            }

            // No immediate times after plus or minus symbols
            else if (this.expression.substr(`${expressionLength - 1}`) === '+' 
                || this.expression.substr(`${expressionLength - 1}`) === '-') {   
                return    
            } 
            
            else {
                this.currentOpr = `${opr}`
                this.Ansexpression += "*"
                this.expression += `${opr}`
            }
        },

        divide(opr) {
            this.equalClicked = true
            //this.operatorClicked = true
            this.previousNumber = this.currentNumber
            this.previousOpr = this.currentOpr
            this.currentExpr = this.currentNumber = this.currentDigit = this.currentNumLength = ""
            var expressionLength = this.expression.length

            // No immediate divide after times or divide symbols
            if (this.expression.substr(`${expressionLength - 1}`) === '÷' 
                || this.expression.substr(`${expressionLength - 1}`) === 'x') {
                return
            }

            // No immediate divide after plus or minus symbols
            else if (this.expression.substr(`${expressionLength - 1}`) === '+' 
                || this.expression.substr(`${expressionLength - 1}`) === '-') {
                return
            } else {
                this.currentOpr = `${opr}`
                this.Ansexpression += "/"
                this.expression += `${opr}`
            }
        },

        pi(symbol) {
            this.currentDigit = `${symbol}`
            this.expression += `${symbol}`

            // If pi is the first button pressed
            if (this.Ansexpression === "") {
                this.Ansexpression = `${Math.PI}`
            } else if (this.Ansexpression !== "") {
                this.Ansexpression *= `${Math.PI}`
            } 
        },

        equal() {
            this.equalClicked === true
            
            this.answer = eval(this.Ansexpression)

            // this.expression = this.answer
            // this.Ansexpression = this.answer
            // this.currentDigit = this.answer = ""

            if (this.answer == "Infinity") {
                this.answer = "ᴏᴏ"
            }

            if (this.answer == "-Infinity") {
                this.answer = "-ᴏᴏ"
            }

            else if (this.Ansexpression == "0/0") {
                this.answer = "Undefined"
            }
           
            this.equalClicked === false

        },

        /** TRIGONOMETRIC RATIOS */

        sin(symbol) {
            this.equalClicked = true
            this.previousOpr = this.currentOpr
            this.currentExpr =`${symbol}`
            var expressionLength = this.expression.length
             
            if (this.expression.substr(expressionLength-4) === 'sin(') {  
                return    
            }
            
            else if (this.expression.substr(expressionLength-4) !== 'sin(') {
                if (this.expression == ""
                || this.expression.substr(`${expressionLength - 1}`) === '÷' 
                || this.expression.substr(`${expressionLength - 1}`) === 'x'
                || this.expression.substr(`${expressionLength - 1}`) === '+'
                || this.expression.substr(`${expressionLength - 1}`) === '-') { 
                    this.expression += `${symbol}`
                    this.currentNumber = ""
                    this.sinClicked = true 
                    this.currentOpr = `${symbol}`
                   return    
                } 
                // e.g, a.sin(x)
                else if ((this.expression != "") && (this.expression.substr(`${expressionLength - 1}`) !== '÷' 
                || this.expression.substr(`${expressionLength - 1}`) !== 'x'
                || this.expression.substr(`${expressionLength - 1}`) !== '+'
                || this.expression.substr(`${expressionLength - 1}`) !== '-'
                || this.expression.substr(`${expressionLength - 1}`) !== 'P'
                || this.expression.substr(`${expressionLength - 1}`) !== 'C')) {
                    this.currentOpr = `${symbol}`
                    this.Ansexpression += "*" 
                }

                this.previousNumber = this.currentNumber
                this.currentNumber = ""
                
                this.expression += `${symbol}`
                this.sinClicked = true
        
                this.currentOpr = `${symbol}`
                return
             }
        },

        cos(symbol) {
            this.equalClicked = true
            this.previousOpr = this.currentOpr
            this.currentExpr =`${symbol}`
            var expressionLength = this.expression.length

            if (this.expression.substr(-4) === 'cos(') {   
                return    
            }
              else if (this.expression.substr(-4) !== 'cos(') {
                if (this.expression == ""
                || this.expression.substr(`${expressionLength - 1}`) === '÷' 
                || this.expression.substr(`${expressionLength - 1}`) === 'x'
                || this.expression.substr(`${expressionLength - 1}`) === '+'
                || this.expression.substr(`${expressionLength - 1}`) === '-') { 
                    this.expression += `${symbol}`
                    this.currentNumber = ""
                    this.cosClicked = true 
                    this.currentOpr = `${symbol}`
                   return    
                } 
                // e.g, a.cos(x)
                else if ((this.expression != "") 
                && (this.expression.substr(`${expressionLength - 1}`) !== '÷' 
                || this.expression.substr(`${expressionLength - 1}`) !== 'x'
                || this.expression.substr(`${expressionLength - 1}`) !== '+'
                || this.expression.substr(`${expressionLength - 1}`) !== '-')) {
                    this.currentOpr = `${symbol}`
                    this.Ansexpression += "*"       
                }

                this.previousNumber = this.currentNumber
                this.currentNumber = ""
                
                this.expression += `${symbol}`
                this.cosClicked = true
        
                this.currentOpr = `${symbol}`
                return
             }
        },

        tan(symbol) {
            this.equalClicked = true
            this.previousOpr = this.currentOpr
            this.currentExpr =`${symbol}`
            
            var expressionLength = this.expression.length

            if (this.expression.substr(-4) === 'tan(') {   
                return    
            }
              else if (this.expression.substr(-4) !== 'tan(') {
                if (this.expression == ""
                || this.expression.substr(`${expressionLength - 1}`) === '÷' 
                || this.expression.substr(`${expressionLength - 1}`) === 'x'
                || this.expression.substr(`${expressionLength - 1}`) === '+'
                || this.expression.substr(`${expressionLength - 1}`) === '-') { 
                    this.expression += `${symbol}`
                    this.currentNumber = ""
                    this.tanClicked = true 
                    this.currentOpr = `${symbol}`
                   return    
                } 
                // e.g, a.tan(x)
                else if ((this.expression != "") 
                && (this.expression.substr(`${expressionLength - 1}`) !== '÷' 
                || this.expression.substr(`${expressionLength - 1}`) !== 'x'
                || this.expression.substr(`${expressionLength - 1}`) !== '+'
                || this.expression.substr(`${expressionLength - 1}`) !== '-')) {
                    this.currentOpr = `${symbol}`
                    this.Ansexpression += "*"       
                }

                this.previousNumber = this.currentNumber
                this.currentNumber = ""
                
                this.expression += `${symbol}`
                this.tanClicked = true
        
                this.currentOpr = `${symbol}`
                return
             }
        },

        csc(symbol) {
            this.equalClicked = true
            this.previousOpr = this.currentOpr
            this.currentExpr =`${symbol}`
            
            var expressionLength = this.expression.length

            if (this.expression.substr(-4) === 'csc(') {   
                return    
            }
              else if (this.expression.substr(-4) !== 'csc(') {
                if (this.expression == ""
                || this.expression.substr(`${expressionLength - 1}`) === '÷' 
                || this.expression.substr(`${expressionLength - 1}`) === 'x'
                || this.expression.substr(`${expressionLength - 1}`) === '+'
                || this.expression.substr(`${expressionLength - 1}`) === '-') { 
                    this.expression += `${symbol}`
                    this.currentNumber = ""
                    this.cscClicked = true 
                    this.currentOpr = `${symbol}`
                   return    
                } 
                // e.g, a.csc(x)
                else if ((this.expression != "") 
                && (this.expression.substr(`${expressionLength - 1}`) !== '÷' 
                || this.expression.substr(`${expressionLength - 1}`) !== 'x'
                || this.expression.substr(`${expressionLength - 1}`) !== '+'
                || this.expression.substr(`${expressionLength - 1}`) !== '-')) {
                    this.currentOpr = `${symbol}`
                    this.Ansexpression += "*"       
                }

                this.previousNumber = this.currentNumber
                this.currentNumber = ""
                
                this.expression += `${symbol}`
                this.cscClicked = true
        
                this.currentOpr = `${symbol}`
                return
             }
        },

        sec(symbol) {
            this.equalClicked = true
            this.previousOpr = this.currentOpr
            this.currentExpr =`${symbol}`
            
            var expressionLength = this.expression.length

            if (this.expression.substr(-4) === 'sec(') {   
                return    
            }
              else if (this.expression.substr(-4) !== 'sec(') {
                if (this.expression == ""
                || this.expression.substr(`${expressionLength - 1}`) === '÷' 
                || this.expression.substr(`${expressionLength - 1}`) === 'x'
                || this.expression.substr(`${expressionLength - 1}`) === '+'
                || this.expression.substr(`${expressionLength - 1}`) === '-') { 
                    this.expression += `${symbol}`
                    this.currentNumber = ""
                    this.secClicked = true 
                    this.currentOpr = `${symbol}`
                   return    
                } 
                // e.g, a.sec(x)
                else if ((this.expression != "") 
                && (this.expression.substr(`${expressionLength - 1}`) !== '÷' 
                || this.expression.substr(`${expressionLength - 1}`) !== 'x'
                || this.expression.substr(`${expressionLength - 1}`) !== '+'
                || this.expression.substr(`${expressionLength - 1}`) !== '-')) {
                    this.currentOpr = `${symbol}`
                    this.Ansexpression += "*"       
                }

                this.previousNumber = this.currentNumber
                this.currentNumber = ""
                
                this.expression += `${symbol}`
                this.secClicked = true
        
                this.currentOpr = `${symbol}`
                return
             }
        },

        cot(symbol) {
            this.equalClicked = true
            this.previousOpr = this.currentOpr
            this.currentExpr =`${symbol}`
            
            var expressionLength = this.expression.length

            if (this.expression.substr(-4) === 'cot(') {   
                return    
            }
              else if (this.expression.substr(-4) !== 'cot(') {
                if (this.expression == ""
                || this.expression.substr(`${expressionLength - 1}`) === '÷' 
                || this.expression.substr(`${expressionLength - 1}`) === 'x'
                || this.expression.substr(`${expressionLength - 1}`) === '+'
                || this.expression.substr(`${expressionLength - 1}`) === '-') { 
                    this.expression += `${symbol}`
                    this.currentNumber = ""
                    this.cotClicked = true 
                    this.currentOpr = `${symbol}`
                   return    
                } 
                // e.g, a.cot(x)
                else if ((this.expression != "") 
                && (this.expression.substr(`${expressionLength - 1}`) !== '÷' 
                || this.expression.substr(`${expressionLength - 1}`) !== 'x'
                || this.expression.substr(`${expressionLength - 1}`) !== '+'
                || this.expression.substr(`${expressionLength - 1}`) !== '-')) {
                    this.currentOpr = `${symbol}`
                    this.Ansexpression += "*"       
                }

                this.previousNumber = this.currentNumber
                this.currentNumber = ""
                
                this.expression += `${symbol}`
                this.cotClicked = true
        
                this.currentOpr = `${symbol}`
                return
            }
        },


        /*
        function changeBackground() {
        var currentValue = document.getElementById("currentValue").innerHTML
        console.log('changeBackground. currentValue is: ', currentValue)
        if (currentValue === "420") {
            console.log('holy shit!!!!!!!! currentValue is 420 bro!')
            $(document.body).addClass('background-420');
        }
        if (currentValue != "420") {
            $(document.body).removeClass('background-420');
        }
            if (currentValue === "666") {
            console.log('666 666 666 666 666 666')
            $(document.body).addClass('background-666');
        }
        if (currentValue != "666") {
            $(document.body).removeClass('background-666');
        }
            if (currentValue === "1999") {
            console.log("Two thousand zero zero party over, oops, out of time")
            $(document.body).addClass('background-1999');
        }
        if (currentValue != "1999") {
            $(document.body).removeClass('background-1999');
        }
        }
        } */

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
*{
        margin: 0;
        padding: 0;
    }
    .basic {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-auto-rows: minmax(40px, auto);
        // grid-template-areas: 
        // "answerPanel answerPanel answerPanel answerPanel answerPanel answerPanel"
        // "control control control control control control"
        // "calculus calculus calculus calculus calculus calculus"
        // "trigonometry trigonometry trigonometry trigonometry trigonometry trigonometry"
        // "exponent exponent exponent exponent exponent exponent"
        // "letters letters letters letters letters letters"
        // "permuta-combina permuta-combina permuta-combina permuta-combina permuta-combina permuta-combina"
        // "numbers numbers numbers numbers numbers numbers"
        // "numbers1 numbers1 numbers1 numbers1 numbers1 numbers1"
        // "operator operator operator operator operator operator";
    }
  
    .answerPanel {
        grid-column: 1/7;
        grid-row: 1/4;
        background-color: #ccc;
        font-size: 25px;
       // padding: 15px;
    }

    .w3-btn {
        background-color: #555555;
        color: white;
        font-size: 25px;
    }
/*
    .calculus {
        grid-area: calculus;
    }

    .trigonometry {
        grid-area: trigonometry;
    }

    .exponent {
        grid-area: exponent;
    }

    .letters {
        grid-area: letters;
        //background-color: #555555;
    }

    .permuta-combina {
        grid-area: permuta-combina;
        //background-color: #ccc; 
        //height: 200px;          // rgb(252, 213, 105);
    }

    .numbers {
        grid-area: numbers;
        font-size: 18px;
        //background-color: #ccc;
        //vertical-align: bottom;
    }

    .numbers1 {
        grid-area: numbers1;
        font-size: 18px;
        //background-color: #ccc;
        //vertical-align: bottom;
    }

    .operator {
        grid-area: operator;
        font-size: 18px;
        //background-color: #ccc;
        //vertical-align: bottom;
    }
 */

</style>