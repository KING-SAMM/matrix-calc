<template>
     <v-container class="basic">
        <!--Answer Panel-->
        <section class="answerPanel">
            {{ expression }} 
            <br>
            {{ answer || "0" }}
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
        <div class="w3-btn">∞</div>
        <div class="w3-btn">e</div>
    
        <!--Trigonometry-->
        <div class="w3-btn">sin</div>
        <div class="w3-btn">cos</div>
        <div class="w3-btn">tan</div>
        <div class="w3-btn">csc</div>
        <div class="w3-btn">sec</div>
        <div class="w3-btn">cot</div>
    
        <!--Exponent-->
        <button class="w3-btn">x²</button>
        <button class="w3-btn">x<sup>a</sup></button>
        <button class="w3-btn">√ x</button>
        <button class="w3-btn"><sup>a</sup>√ x</button>
        <button class="w3-btn">log</button>
        <button class="w3-btn">ln</button>

        <!--Letters-->
        <button class="w3-btn">∑ƒ𝑥</button>
        <button class="w3-btn">∑ƒ𝑥²</button>
        <button class="w3-btn">z</button>
        <button class="w3-btn">π</button>
        <button class="w3-btn">θ</button>
        <button class="w3-btn">Enter</button>
    
        <!--Permuta-combina-->
        <button class="w3-btn"><strong>∑</strong></button>
        <button class="w3-btn">χ²</button>
        <button class="w3-btn"><strong>μ</strong></button>
        <button class="w3-btn"><sup>n</sup>C<sub>r</sub></button>
        <button class="w3-btn"><strong>σ</strong></button>
        <button class="w3-btn"><strong>ρ</strong></button>

        <!--Numbers-->    
        <button class="w3-btn" v-on:click="append('1')"><strong>1</strong></button>
        <button class="w3-btn" v-on:click="append('2')"><strong>2</strong></button>
        <button class="w3-btn" v-on:click="append('3')"><strong>3</strong></button>
        <button class="w3-btn" v-on:click="append('4')"><strong>4</strong></button>
        <button class="w3-btn" v-on:click="append('5')"><strong>5</strong></button>
        <button class="w3-btn" v-on:click="append('6')"><strong>6</strong></button>

        <!--Numbers1-->
        <button class="w3-btn" v-on:click="append('7')"><strong>7</strong></button>
        <button class="w3-btn" v-on:click="append('8')"><strong>8</strong></button>
        <button class="w3-btn" v-on:click="append('9')"><strong>9</strong></button>
        <button class="w3-btn" v-on:click="append('0')"><strong>0</strong></button>
        <button class="w3-btn" v-on:click="append('(')">(</button>
        <button class="w3-btn" v-on:click="append(')')">)</button>
        
        

        <!--Operator-->
        <button class="w3-btn" v-on:click="dot()"><strong>.</strong></button>
        <button class="w3-btn" v-on:click="plus('+')"><strong>+</strong></button>
        <button class="w3-btn" v-on:click="minus('-')"><strong>-</strong></button>
        <button class="w3-btn" v-on:click="times('x')"><strong>x</strong></button>
        <button class="w3-btn" v-on:click="divide('÷')"><strong>÷</strong></button>
        <button class="w3-btn" v-on:click="equal"><strong>=</strong></button>  
     </v-container>   
</template>

<script>
export default {
    name: 'Statistics',
    data() {
        return {
            previous: "",
            answer: "",
            prevAnswer: "",
            current: "",
            cummulative: "",
            operator: "",
            operatorClicked: false,
            equalClicked: false,
            expression: ""
        }
    },

    methods: {
        clear() {
            // Revert to original state
            this.answer = ""
            this.prevAnswer = ""
            this.expression = ""
            this.current = ""
            this.previous = ""
            this.operator = ""
            this.cummulative = ""
            this.operatorClicked = false
            this.equalClicked = false
        },

        percent() {
            this.current = `${eval(this.current)/100}`
        },

        append(number) {
            if (this.operatorClicked) { 
                this.current = ""
                this.operatorClicked = false
            }
            this.current = `${this.current}${number}`
            this.expression += `${number}` 
        
        }, 

        dot() {
            if(this.current.indexOf('.') === -1) {
                this.append('.')
            }
        },
        
        setCummulative() {
            this.previous = this.current
            this.previous = `${eval(this.previous) + eval(this.current)}`

            // this.previous = this.current
            // this.previous += `${eval(this.previous)}`
            
            this.operatorClicked = true
            this.equalClicked = false
        },

        setPrevious() {
            this.previous = this.current
            //this.previous = `${eval(this.previous) + eval(this.previous)}`
            
            this.operatorClicked = true
           // this.equalClicked = false
        },

        setAnswer() {
            this.prevAnswer = `${eval(this.previous) + eval(this.current)}`
            //this.answer = ""
            //this.equalClicked = true
        },

        setCummulative() {
                //this.cummulative += this.cummulative
                this.answer += this.answer
        },

        plus(opr) {
            this.expression += `${opr}`
            this.operator = (a, b) => a + b
            this.setPrevious()

            // if (this.equalClicked == false && this.operatorClicked === true) {
            //     this.setPrevious()
            // } else if (this.equalClicked == false) {
            //     this.setCummulative()
            // }
        },

        minus(opr) {
            this.expression += `${opr}`
            this.operator = (a, b) => a - b
            this.setPrevious()
        },

        times(opr) {
            this.expression += `${opr}`
            this.operator = (a, b) => a * b
            this.setPrevious()
        },

        divide(opr) {
            this.expression += `${opr}`
            this.operator = (a, b) => a / b
            this.setPrevious()
        },

        equal() {
            //  if (this.equalClicked === false) {
            // this.answer = `${this.operator(
            //     eval(this.prevAnswer),
            //     eval(this.current)
            // )}`

            // this.answer += `${eval(this.answer)}`

            // this.setAnswer()
            // }

            if (this.equalClicked === false) {
                this.answer = `${this.operator(
                    eval(this.previous),
                    eval(this.current)
                )}`
                this.setAnswer()
            }

            // if (this.multiOperatorClicked) {

            // }

        }
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