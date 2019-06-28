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
                   <tr><td> AnsexpHolder: {{ AnsexpressionHolder }}</td><td> Factl: {{ factorial }}</td></tr>
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
        <div class="w3-btn" v-on:click="sin('cos(')">cos</div>
        <div class="w3-btn" v-on:click="sin('tan(')">tan</div>
        <div class="w3-btn">csc</div>
        <div class="w3-btn">sec</div>
        <div class="w3-btn">cot</div>
    
        <!--Exponent-->
        <button class="w3-btn" v-on:click="square('²')">x²</button>
        <button class="w3-btn">x<sup>a</sup></button>
        <button class="w3-btn" v-on:click="squareroot('√')">√ x</button>
        <button class="w3-btn"><sup>a</sup>√ x</button>
        <button class="w3-btn">log</button>
        <button class="w3-btn" v-on:click="natural_log('ln')">ln</button>

        <!--Letters-->
        <button class="w3-btn">∑ƒ𝑥</button>
        <button class="w3-btn">∑ƒ𝑥²</button>
        <button class="w3-btn" v-on:click="factorial('!')">!</button>
        <button class="w3-btn" v-on:click="pi('π')">π</button>
        <button class="w3-btn">θ</button>
        <button class="w3-btn" v-on:click="del()">DEL</button>
    
        <!--Permuta-combina-->
        <button class="w3-btn" v-on:click="append('∑')"><strong>∑</strong></button>
        <button class="w3-btn" v-on:click="append('χ²')">χ²</button>
        <button class="w3-btn"><strong>μ</strong></button>
        <button class="w3-btn"><sup>n</sup>C<sub>r</sub></button>
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
import {fact} from '../special_functions/factorial.js'

export default {
    name: 'BasicScientific',
    data() {
        return {
            previousNumber: "",
            answer: "",
            prevAnswer: "",
            currentNumber: "",
            cummulative: "",
            operator: "",
            currentOpr: "",
            previousOpr: "",
            operatorClicked: false,
            equalClicked: false,
            sinClicked: false,
            expression: "",
            Ansexpression: "",
            AnsexpressionHolder: "",
            //factorial: "",
            currentExpr: "",
            currentDigit: ""
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
            this.currentExpr = ""
            this.previousNumber = ""
            this.operator = ""
            this.currentOpr = ""
            this.previousOpr = ""
            this.sinClicked = false
            this.cummulative = ""
            this.operatorClicked = false
            this.equalClicked = false
        },

        percent() {
            if (eval(this.answer == 0)) {
                this.answer = `${eval(this.Ansexpression)/100}`
                //this.answer = this.current
            } else {
                this.answer = `${eval(this.answer)/100}`
            }

            
            // if (this.answer === "0") {
            //     this.current = `${eval(this.current)/100}`
            //     this.answer = this.current
            // }
        },

        

        append(number) {
            var expressionLength = this.expression.length
            // Pressing any number initially
            if (!this.operatorClicked && this.expression === "") { 
                this.currentNumber = `${number}`
                this.currentDigit = `${number}`
                this.currentExpr = `${number}`
                this.expression = `${number}`
                this.Ansexpression += `${number}`
                

            } 
            
            else if (!this.operatorClicked && this.expression !== "") { 
                this.expression += `${number}`
                this.currentExpr += `${number}`
                this.currentDigit = `${number}`

                // SUCCESSIVE FACTORIALS (after an initial factorial operation)
                if (this.currentOpr == "sin(") {
                /**
                 * If factorial was pressed BEFORE this number
                 * let this number be the new currentNumber,
                 * then multiply last value by new currentNumber
                 */ 
                    //this.previousNumber = this.currentNumber
                    //this.currentNumber = ""
                    this.currentNumber += `${number}`
                    // this.Ansexpression += `${number}`
                    var sineOfCurrentNumberHolder = Math.sin(this.currentNumber * Math.PI/180)
                    var AnsexpressionHolder = this.Ansexpression
                    this.Ansexpression = eval(AnsexpressionHolder + sineOfCurrentNumberHolder)
                    return
                } else {
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

                // SUCCESSIVE FACTORIALS (after an initial factorial operation)
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
            
            }   
        
    
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
            // else if (this.currentOpr === "sin(" && this.sinClicked === true) {
            //     //sin(`${number}`)
            //     //var previousNumber = this.currentNumber
            //     //this.currentNumber = ""
            //     this.currentNumber = `${number}`
            //     var expressionHolder = this.expression
            //     var sineOfCurrentNumberHolder = Math.sin(this.currentNumber * Math.PI / 180)  // + ")"
                
            //     // if (this.previousOpr === "") {
            //     //     this.Ansexpression = eval(this.previousNumber) + eval(sineOfCurrentNumberHolder)
            //     // }
            //     // Perform the following operations between sin(number) and previousNumber
            //     if (this.previousOpr === '+') {
            //         this.Ansexpression = eval(this.previousNumber) + eval(sineOfCurrentNumberHolder)
            //         return
            //     } else if (this.previousOpr === '-') {
            //         this.Ansexpression = this.previousNumber - `${sineOfCurrentNumberHolder}`
            //         return
            //     } else if (this.previousOpr === '÷') {
            //         this.Ansexpression = this.previousNumber / `${sineOfCurrentNumberHolder}`
            //         return
            //     } else {
            //         this.Ansexpression = this.previousNumber * `${sineOfCurrentNumberHolder}`
            //     }
                
                
                
            //     this.expression = "sin(" + this.currentNumber //+ ")"
            //     this.currentExpr = "sin(" + this.currentNumber
            //     this.expression = expressionHolder //+ this.expression

            //     if (this.currentNumber == "180" || this.currentNumber == "360") {
            //         this.answer = "0"
            //         return
            //     }
                
            // }

            else if (this.currentDigit === "cos(" && this.cosClicked === true) {
                this.Ansexpression = "Math.cos(" + `${this.currentNumber * Math.PI / 180}` + ")"
                this.expression = "cos(" + this.currentNumber + ")"
                
                // if (this.currentNumber == "180" || this.currentNumber == "360") {
                //     this.answer = "0"
                //     return
                // }
            }

            else if (this.currentDigit === "tan(" && this.tanClicked === true) {
                this.Ansexpression = "Math.tan(" + `${this.currentNumber * Math.PI / 180}` + ")"
                this.expression = "tan(" + this.currentNumber + ")"
                
                // if (this.currentNumber == "180" || this.currentNumber == "360") {
                //     this.answer = "0"
                //     return
                // }
            }
            

            // //this.current = `${this.current}${number}`
            // // this.currentDigit = `${number}`
         
            // //this.Ansexpression += `${number}`
            // else {
            //     return
            // }
            
            this.answer = eval(this.Ansexpression)
        
        }, 

        dot() {
            if(this.currentNumber.indexOf('.') === -1) {
                this.append('.')
            }
        },

        factorial(opr) {
            this.equalClicked = true
            //this.operatorClicked = true
            //this.previousNumber = this.currentNumber
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

        del() {
            this.currentNumber = this.previousNumber = currentOpr = previousOpr = currentDigit = ""
            this.expression = this.expression.substr(0, this.expression.length - 1)
            this.Ansexpression = this.Ansexpression.substr(0, this.Ansexpression.length - 1)
            this.answer = eval(this.Ansexpression)
        },
        
        
        plus(opr) {
            this.equalClicked = true
            //this.operatorClicked = true
            this.previousNumber = this.currentNumber
            this.previousOpr = this.currentOpr
            this.currentExpr = this.currentNumber = this.currentDigit = ""
            var expressionLength = this.expression.length

            // No immediate plus after times or divide symbol
            if (this.expression.substr(`${expressionLength - 1}`) === '÷' 
            || this.expression.substr(`${expressionLength - 1}`) === 'x') {
                this.Ansexpression = this.Ansexpression
                this.expression = this.expression
                return
            }
            // If minus is present and a plus is pressed...
            else if (this.expression.substr(`${expressionLength - 1}`) === '-') {
                this.currentOpr = "-"        
                // this.expression = this.expression.substr(0, `${expressionLength - 1}`) // ...remove previous minus
                // this.Ansexpression = this.expression    // ...duplicate in Ansexpression
                // this.expression += "-"       //...and maintain minus
                // this.Ansexpression += "-"        
                return
            // If plus is present and second plus is pressed...
            } else if (this.expression.substr(`${expressionLength - 1}`) === '+') {
                this.currentOpr = "+"        
                // this.expression = this.expression.substr(0, `${expressionLength - 1}`) // ...remove previous plus
                // this.Ansexpression = this.expression    // ...duplicate in Ansexpression
                // this.expression += "+"       //...and reassign plus
                // this.Ansexpression += "+"        
                return
            } else {
                this.currentOpr = `${opr}`
                this.expression += `${opr}`
                this.Ansexpression += `${opr}`
            }
            // this.operator = (a, b) => a + b
            // this.setPrevious()

        },

        minus(opr) {
            this.equalClicked = true
            //this.operatorClicked = true
            this.previousNumber = this.currentNumber
            this.previousOpr = this.currentOpr
            this.currentExpr = this.currentNumber = this.currentDigit = ""
            var expressionLength = this.expression.length

            if (this.expression === "") {
                this.currentNumber = `${opr}`
            }

            // No immediate minus after times or divide symbols
            if (this.expression.substr(`${expressionLength - 1}`) === '÷' 
                || this.expression.substr(`${expressionLength - 1}`) === 'x') {
                this.Ansexpression = this.Ansexpression
                this.expression = this.expression
                return

            // If minus is present and second minus is pressed...
            } else if (this.expression.substr(`${expressionLength - 1}`) === '-') {
                this.currentOpr = "+"        
                this.expression = this.expression.substr(0, `${expressionLength - 1}`) // ...remove previous minus
                this.Ansexpression = this.Ansexpression.substr(0, `${expressionLength - 1}`)  // ...remove previous minus
                this.expression += "+"       //...and change to plus
                this.Ansexpression += "+"        
                return

            // If plus is present and a minus is pressed..
            } else if (this.expression.substr(`${expressionLength - 1}`) === '+') {
                this.currentOpr = `${opr}`        
                this.expression = this.expression.substr(0, `${expressionLength - 1}`) // ...remove previous plus
                this.Ansexpression = this.expression.substr(0, `${expressionLength - 1}`) // ...remove previous plus       
                this.expression += `${opr}`       //...and change to minus  
                this.Ansexpression += `${opr}`        
                return
            } else {
                this.currentOpr = `${opr}`
                this.expression += `${opr}`
                this.Ansexpression += `${opr}`
            }
            // this.operator = (a, b) => a - b
            // this.setPrevious()
        },

        times(opr) {
            this.equalClicked = true
            //this.operatorClicked = true
            this.previousNumber = this.currentNumber
            this.previousOpr = this.currentOpr
            this.currentExpr = this.currentNumber = this.currentDigit = ""
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
            this.currentExpr = this.currentNumber = this.currentDigit = ""
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
           
            this.equalClicked === false

        },

        sin(symbol) {
            this.equalClicked = true
            //var expressionLength = this.expression.length
            //  this.previousNumber = this.currentNumber
            this.previousOpr = this.currentOpr
             this.currentNumber = ""
             this.currentExpr =`${symbol}`
             
             var expressionLength = this.expression.length
             
            // this.Ansexpression += `${symbol}`

            if (this.expression.substr(-4) === 'sin(') {
                //this.currentOpr = 'sin('        
                //this.expression = this.expression.substr(0, `${expressionLength - 4}`) // ...remove previous sine symbol
                //this.Ansexpression += this.expression    // ...duplicate in Ansexpression
                //this.expression += 'sin('       //...and reassign sine symbol
                //this.Ansexpression += 'sin(' 
               // this.answer = eval(this.Ansexpression)   
                return    
            }
              else if (this.expression.substr(-4) !== 'sin(') {
                   //this.currentNumber =`${symbol}`
                 this.expression += `${symbol}`
                 this.sinClicked = true
                 
                 //this.previousNumber = this.currentNumber
                 //this.Ansexpression += `${symbol}`
                 //this.answer = eval(this.Ansexpression)
                 this.currentOpr = `${symbol}`
               // this.Ansexpression += "Math.sin(" + this.currentNumber
                
                 return
             }

            //  else {
            //      this.currentOpr = `${opr}`   
            //     this.expression += `${opr}`   // Append factorial symbol to math expression
            
            //     // Get lengths of Ansexpression and currentNumber
            //     var AnsexpressionLength = this.Ansexpression.length
            //     var currentNumberLength = this.currentNumber.length

            //     // Get factorial of currentNumber
            //     var sineOfCurrentNumberHolder = `${Math.sin(this.currentNumber * Math.PI/180)}`

            //     // // Remove the currentNumber from Ansexpression
            //     // this.Ansexpression = this.Ansexpression.substr(0, `${AnsexpressionLength - currentNumberLength}`)
               
            //     // Replace it with its factorial value
            //     this.Ansexpression += s

            //     // Evaluate
            //     this.answer = eval(this.Ansexpression)
            // }

            //  // If minus is present and a sine is pressed...
            // else if (this.expression.substr(`${expressionLength - 1}`) === '-') {
            //     this.currentOpr = "-"        
            //     // this.expression = this.expression.substr(0, `${expressionLength - 1}`) // ...remove previous minus
            //     // this.Ansexpression = this.expression    // ...duplicate in Ansexpression
            //     this.expression += `${symbol}`
            //     // this.Ansexpression += "-"        
            //     return
            // }

            //this.sinClicked = false
            // // No immediate divide after times or divide symbols
            // if (this.expression.substr(-4) === 'sin(' 
            //     || this.expression.substr(`${expressionLength - 1}`) === 'cos('
            //     || this.expression.substr(`${expressionLength - 1}`) === 'tan(') {
            //     this.Ansexpression = this.Ansexpression
            //     this.expression = this.expression
            //     return
            // }
        },

        cos(symbol) {
            this.equalClicked = true
            //var expressionLength = this.expression.length
            //  this.previousNumber = this.currentNumber
            this.previousOpr = this.currentOpr
             this.currentNumber = ""
             this.currentExpr =`${symbol}`
             
             var expressionLength = this.expression.length
             
            // this.Ansexpression += `${symbol}`

            if (this.expression.substr(-4) === 'cos(') {   
                return    
            }
              else if (this.expression.substr(-4) !== 'cos(') {
                   //this.currentNumber =`${symbol}`
                 this.expression += `${symbol}`
                 this.sinClicked = true
                 
                 this.currentOpr = `${symbol}`
    
                 return
             }
        },

        tan(symbol) {
            this.tanClicked === true
        },


       /* 

       //666, 420, 1999
        function(){
        var globalAnswer = "0" //declaring global variable here... this is bad practice

        function removeLeadingZero(string) {
        var newString = string
        if (newString[0] === '0') {
            console.log('removeLeadingZero-1: remove leading 0 from newString')
            newString = newString.slice(1)
        }
        return newString
        }

         function makeCurrentValueNegative() {
        //     // alert('Sorry, no negatives on this calculator. Only positive vibes!')
            var currentValue = document.getElementById("currentValue").innerHTML
            console.log('currentValue in makeInputNegative is: ', currentValue)
            if (currentValue[0] === "-") {
            currentValue = currentValue.slice(1)
            $("#currentValue").html(currentValue)
            } else {
            $("#currentValue").prepend("-")
            }
            return currentValue
        }


        function removeLeadingSymbol(string) {
        var newString = string
            var symbols = ["*", "/", "+", "-", "%"]
        if (symbols.includes(newString[0])) {
            console.log('removeLeadingSymbol-1: remove leading symbol from newString')
            newString = newString.slice(1)
        }
        return newString
        }


        function storeAnswer(value) {
        console.log('storeAnswer-1: storeAnswer is:::', value)
        var value = removeLeadingZero(value)
        globalAnswer = value //bad practice -- setting globalAnswer here
        console.log('storeAnswer-2: globalAnswer is:::', globalAnswer)
        $("#globalAnswer").html(globalAnswer) //set globalAnswer on calculator
        console.log('storeAnswer-3: set globalAnswer on calculator')
        return value //should be a STRING
        }


        function getCurrentValue() {
        var currentValue = document.getElementById("currentValue").innerHTML
        console.log('getCurrentValue-- currentValue is a string: ', currentValue)
        return currentValue //currentValue will be a STRING
        }


        function clearCurrentValue() {
        console.log('CLEAR-1: calling clearCurrentValue... currentValue === 0')
        $("#currentValue").html("0") //set currentValue to "0"
        console.log('CLEAR-2: call storeAnswer with "0", to reset globalAnswer')
        changeBackground()
        return storeAnswer("0") //set globalAnswer to "0", a STRING
        }


        function equals() {
        var answer = globalAnswer //bad practice!!! fix this.
        console.log('EQUALS-1: answer is:::', answer) //a STRING
        var removeEqualSign = answer.split("=") //remove "=" from end...
        var newAnswer = removeEqualSign[0] // //removing "=" from end...
        newAnswer = replaceTimesAndDivides(newAnswer)
        newAnswer = removeLeadingSymbol(newAnswer) ///will this mess up negative numbers???
        console.log('EQUALS-2: newAnswer is:::', newAnswer) //a STRING
        var finalAnswer = eval(newAnswer) //pass answer to eval, turning it into a number
        finalAnswer = finalAnswer.toString() //make a string again
        storeAndReset(finalAnswer, finalAnswer)
        console.log('EQUALS-3: finalAnswer is:::', finalAnswer)
        changeBackground()
        return finalAnswer //returning finalAnswer, a STRING
        }


        function clickButton(event) {
        $(".w3-btn").click(function(event) {
            var thingClicked = this.innerHTML
            console.log("0. you clicked: ", thingClicked)

            if ($(this).hasClass("orange")) {
            console.log(`clickButton-1. ${thingClicked} is in the orange class!`)
            return addSymbolToAnswer(thingClicked)
            }

            if ($(this).hasClass("num")) {
            console.log(`clickButton-2. ${thingClicked} is in the num class!`)
            return createNewNumber(thingClicked)
            }

            if ($(this).hasClass("clear")) {
            console.log('clickButton-3. clearCurrentValue called!')
            return clearCurrentValue()
            }

            if ($(this).hasClass("negative")) {
            console.log('clickButton-4. makeInputNegative called!')
            return makeCurrentValueNegative()
            }

            if ($(this).hasClass("equals")) {
            console.log('clickButton-4. equals pressed!')
            addSymbolToAnswer(thingClicked) //thingClicked is "="
            return equals()
            }
        })
        }
        clickButton(event)


        // function replaceTimesAndDivides(string) {
        // string = string.replace("x", "*")
        // string = string.replace("÷", "/")
        // return string
        // }


        function addSymbolToAnswer(string) {
        $('.negative').prop('disabled', true) //disable "+/-" when orange button clicked
        var symbolString = string
        symbolString = replaceTimesAndDivides(symbolString)
        console.log('ORANGE-1. symbolString is: ', symbolString)
        var currentValue = getCurrentValue()
        var symbols = ["*", "/", "+", "-", "%"]
        console.log('ORANGE-2. globalAnswer is now: ', globalAnswer)

        if (globalAnswer === currentValue) { //after "=" was pressed...
            console.log('ORANGE-3a. after "=" pressed, just need one symbol added to currentValue')
            var newGlobalAnswer = currentValue + symbolString //add symbol to end of newGlobal
            return storeAndReset(newGlobalAnswer, symbolString)
        }
        if (symbols.includes(currentValue)) { //if a symbol was already pressed...
            console.log('Orange-3b: currentValue and symbolString are both symbols!')
            currentValue = currentValue.replace(currentValue, symbolString)
            console.log('Orange-3b: replaced currentValue with ', symbolString)
            var newGlobalAnswer = globalAnswer.slice(0, -1) + currentValue
            console.log('Orange-4b: replaced lastChar in newGlobalAnswer with', currentValue)
            return storeAndReset(newGlobalAnswer, symbolString)
        } else { //otherwise, adding new symbol to currentValue...
            console.log('ORANGE-3c: adding new symbol to currentValue')
            currentValue = currentValue + symbolString //add symbol to end of currentValue...
            console.log('ORANGE-3c. new currentValue is: ', currentValue)
            var newGlobalAnswer = globalAnswer + currentValue
            return storeAndReset(newGlobalAnswer, symbolString)
        }
        }


        function storeAndReset(newGlobalAnswer, newCurrentValue) {
        storeAnswer(newGlobalAnswer)
        $("#currentValue").html(newCurrentValue)
        console.log('storeAndReset: replaced currentValue with symbol: ', newCurrentValue)
        changeBackground()
        return newCurrentValue
        }


        function createNewNumber(string) {
        $('.negative').prop('disabled', false) //enable "+/-" when numbers clicked
        var thingClicked = string
        var currentValue = getCurrentValue()
        var newString = currentValue + thingClicked //add into newString
        newString = removeLeadingZero(newString)
        newString = removeLeadingSymbol(newString)
        console.log('createNewNumber-1: newString is: ', newString)
        $("#currentValue").html(newString)
        changeBackground()
        return newString
        }



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