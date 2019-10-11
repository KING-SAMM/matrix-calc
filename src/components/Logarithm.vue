<template>
    <v-container class="basic w3-animate-opacity">
        <!--Answer Panel-->
        <!-- <span class="item item-header" id="currentValue">0</span> -->
        <!--
        /* For Debuging */
        <section class="answerPanel">
           <table>
               <tbody>
                   <tr><td v-html="expression"></td><td>currentExpr: {{ currentExpr }}</td><td>currentOpr: {{ currentOpr }}</td></tr>
                   <tr><td> currentNumber: {{ currentNumber }}</td><td>previousNumber: {{ previousNumber }}</td><td>currentDigit: {{ currentDigit }}</td></tr>
                   <tr><td> Ansexpression: {{ Ansexpression }}</td><td> {{ answer || "0" }}</td><td>previousOpr: {{ previousOpr }}</td></tr>
                   <tr><td> AnsexpHolder: {{ AnsexpressionHolder }}</td><td> Factl: {{ factorial }}</td><td> cNL: {{ currentNumLength }} cNLHolder: {{ currentNumberLengthHolder }}</td></tr>
                   <tr><td> DELcNFLog:{{dELETcurrentNumForLog}} </td><td> logCNHolder: {{ logOfCurrentNumberHolder }}</td></tr> 
               </tbody>
           </table> 
        </section>
        -->

        <section class="answerPanel">
            <input type="text" placeholder="Logarithms" v-html="expression">
            
            <div>{{ answer || "0" }}</div> 
        </section>

        <section class="buttons">
            <!--Control-->
            <button class="w3-btn">Shift</button>
            <button class="w3-btn">mode</button>
            <button class="w3-btn"><v-icon class="white--text">arrow_back</v-icon></button>
            <button class="w3-btn"><v-icon class="white--text">arrow_forward</v-icon></button>
            <button class="w3-btn" v-on:click="backspace()"><v-icon class="white--text">backspace</v-icon></button>
            <button class="w3-btn" v-on:click="clear()">C</button>
            

            <!--Trigonometic Functions-->
            <button class="w3-btn" v-on:click="log1('log₁()')">log₁</button>
            <button class="w3-btn" v-on:click="log2('log₂()')">log₂</button>
            <button class="w3-btn" v-on:click="log3('log₃()')">log₃</button>
            <button class="w3-btn" v-on:click="log4('log₄()')">log₄</button>
            <button class="w3-btn" v-on:click="log5('log₅()')">log₅</button>
            <button class="w3-btn" v-on:click="log6('log₆()')">log₆</button>
        
            <!--Inverse Trigonometric Functions-->
            <button class="w3-btn" v-on:click="log7('log₇()')">log₇</button>
            <button class="w3-btn" v-on:click="log8('log₈()')">log₈</button>
            <button class="w3-btn" v-on:click="log9('log₉()')">log₉</button>
            <button class="w3-btn" v-on:click="log10('log₁₀()')">log₁₀</button>
            <button class="w3-btn" v-on:click="log11('log₁₁()')">log₁₁</button>
            <button class="w3-btn" v-on:click="log12('log₁₂()')">log₁₂</button>

            <!--Hyperbolic Functions-->
            <button class="w3-btn" v-on:click="alog1('alog1()')">alog1</button>
            <button class="w3-btn" v-on:click="alog2('alog2()')">alog2</button>
            <button class="w3-btn" v-on:click="alog3('alog3()')">alog3</button>
            <button class="w3-btn" v-on:click="alog4('alog4()')">alog4</button>
            <button class="w3-btn" v-on:click="alog5('alog5()')">alog5</button>
            <button class="w3-btn" v-on:click="alog6('alog6()')">alog6</button>
        
            <!--Inverse Hyperbolic Functions-->
            <button class="w3-btn" v-on:click="alog7('alog7()')">alog7</button>
            <button class="w3-btn" v-on:click="alog8('alog8()')">alog8</button>
            <button class="w3-btn" v-on:click="alog9('alog9()')">alog9</button>
            <button class="w3-btn" v-on:click="alog10('alog10()')">alog10</button>
            <button class="w3-btn" v-on:click="ln('ln()')">ln</button>
            <button class="w3-btn" v-on:click="aln('aln()')">aln</button>

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
            <button class="w3-btn" v-on:click="openParenthesis('(')">(</button>
            <button class="w3-btn" v-on:click="closeParenthesis(')')">)</button>

            <!--Operator-->
            <button class="w3-btn" v-on:click="dot()"><strong>.</strong></button>
            <button class="w3-btn plusTimesDivideMultiply add" v-on:click="plus('+')"><strong>+</strong></button>
            <button class="w3-btn plusTimesDivideMultiply subtract" v-on:click="minus('−')"><strong>−</strong></button>
            <button class="w3-btn plusTimesDivideMultiply" v-on:click="times('×')"><strong>×</strong></button>
            <button class="w3-btn plusTimesDivideMultiply" v-on:click="divide('÷')"><strong>÷</strong></button>
            <button class="w3-btn" v-on:click="equal"><strong>=</strong></button> 
        </section> 
    </v-container>
</template>

<script>
export default {
    name: 'Matrixmxn',
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
    *{
        margin: 0;
        padding: 0;
        font-family: 'Computer Modern','Times New Roman','LaTeX','Cambria';
    }
    .basic {
        display: grid;
        grid-template-columns: 1fr;
        grid-auto-rows: minmax(250px, auto);
        grid-template-areas: 
        "answerPanel"
        "buttons";
        background-image: -webkit-linear-gradient(120deg, rgb(0, 128, 255), rgb(0, 148, 255), rgb(0, 188, 255),rgb(0, 204, 255));
        margin-top: -13%;
        margin-bottom: 0%;
        //-webkit-overflow-scrolling: none;
    }

     .answerPanel {
        display: grid;
        //grid-template-columns: repeat(6, 1fr);
        grid-template-rows: 150px 70px;
        // grid-column: 1/7;
        // grid-row: 1/4;
        /* background-color: #ccc; */
        background-image: -webkit-linear-gradient(120deg, rgb(0, 204, 255), lightblue, rgb(77, 255, 210));
    }

    .answerPanel > input {
        font-size: 28px;
        border: transparent;
        padding: 10px;
    }
    
    .answerPanel > div {
        font-size: 25px;
    }

    .buttons {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(8, 60px);
        //grid-template-areas: buttons;
        //justify-content:flex-start;
        color: #fff;
        // margin-bottom: 0%;
    }

    .w3-btn {
        background-color: transparent;
        //color: white;
        font-size: 22px;
        padding: 0 5px;
        //justify-content:flex-end;
        border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .w3-btn {
        align-items: center;
        justify-content: center;
        //color: black;
    }

    // .answerPanel, .buttons {
    //     margin-left: -3%;
    //     margin-right: 0px;
    // }

    .plusTimesDivideMultiply {
        background-color: indigo;
    }

    // Remove scrollbar from number input fields
    .entry::-webkit-inner-spin-button,
    .entry::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    
    // Galaxy S5
    @media screen and (min-device-width: 360px) and (max-device-height: 640px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3.0)
    {
        .basic {
            grid-template-rows: minmax(140px, auto);
            //grid-template: minmax(250px, auto);
            margin-top: -13%;
            margin-bottom: 0%;
        }
  
        .answerPanel {
            grid-template-rows: 90px 45px;
            grid-template-columns: 330px;
        }

        .answerPanel > input {
            font-size: 28px;
        }
        
        .answerPanel > div {
            font-size: 25px;
        }

        .buttons {
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: repeat(8, 52px);
            color: #fff;
        }

        button > .w3-btn {
            font-size: 22px;
            padding: 0 5px;
        }
    }

    // Galaxy S5 (Landscape)
    @media screen and (min-device-width: 640px) and (max-device-height: 360px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3.0)
    {
        .basic {
            grid-template-rows: minmax(100px, auto);
            //grid-template: minmax(250px, auto);
            margin-top: -13%;
            margin-bottom: 0%;
        }
  
        .answerPanel {
            grid-template-rows: 60px 40px;
            grid-template-columns: 560px;
        }

        .answerPanel > input {
            font-size: 24px;
        }
        
        .answerPanel > div {
            font-size: 20px;
        }

        .buttons {
            grid-template-columns: repeat(12, 1fr);
            grid-template-rows: repeat(4, 48px);
            color: #fff;
        }

        button > .w3-btn {
            font-size: 18px;
            padding: 0 5px;
        }
    }

    // Pixel 2 XL
    @media screen and (min-device-width: 411px) and (max-device-height: 823px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3.5)
    {
        .basic {
            grid-auto-rows: minmax(250px, auto);
            margin-top: -13%;
            margin-bottom: 0%;
        }
  
        .answerPanel {
            grid-template-rows: 150px 70px;
        }

        .answerPanel > input {
            font-size: 28px;
        }
        
        .answerPanel > div {
            font-size: 25px;
        }

        .buttons {
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: repeat(8, 60px);
            color: #fff;
        }

        button > .w3-btn {
            font-size: 22px;
            padding: 0 5px;
        }
    }

    // Pixel 2 XL (Landscape)
    @media screen and (min-device-width: 823px) and (max-device-height: 411px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3.5)
    {
        .basic {
            grid-template-columns: auto 350px;
            grid-template-rows: repeat(8, 48.3px);
            // margin-top: 0px;
            // margin-bottom: 0px;
        }
  
        .answerPanel {
            grid-column: 1/2;
            grid-row: 1/9;
            grid-template-rows: 220px auto;
        }

        .answerPanel > input {
            font-size: 28px;
        }
        
        .answerPanel > div {
            font-size: 25px;
        }

        .buttons {
            grid-column: 2/8;
            grid-row: 1/9;
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: repeat(8, 48.3px);
            color: #fff;
        }
    }

    // iPhone X
    @media screen and (min-device-width: 375px) and (max-device-height: 812px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3.0)
    {
        .basic {
            grid-auto-rows: minmax(240px, auto);
            margin-top: -13%;
            margin-bottom: 0%;
        }
  
        .answerPanel {
            grid-template-rows: 150px 70px;
        }

        .answerPanel > input {
            font-size: 28px;
        }
        
        .answerPanel > div {
            font-size: 25px;
        }

        .buttons {
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: repeat(8, 60px);
            color: #fff;
        }

        button > .w3-btn {
            font-size: 22px;
            padding: 0 5px;
        }
    }

    // iPhone X (Landscape)
    @media screen and (min-device-width: 812px) and (max-device-height: 375px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3.0)
    {
        .basic {
            grid-template-columns: auto 350px;
            grid-template-rows: repeat(8, 43.5px);
            // margin-top: 0px;
            // margin-bottom: 0px;
        }
  
        .answerPanel {
            grid-column: 1/2;
            grid-row: 1/9;
            grid-template-rows: 220px auto;
        }

        .answerPanel > input {
            font-size: 28px;
        }
        
        .answerPanel > div {
            font-size: 25px;
        }

        .buttons {
            grid-column: 2/8;
            grid-row: 1/9;
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: repeat(8, 43.5px);
            color: #fff;
        }
    }

</style>
