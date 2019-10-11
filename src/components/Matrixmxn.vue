<template>
    <v-container class="grid w3-animate-opacity">
        <section class="answerPanel">

        </section>
        <section class="header">Custom Matrices</section>
        <section style="display: flex;justify-content:center; align-items: center;" class="configBtns w3-row w3-animate-top w3-animate-opacity">
            <aside class="w3-col s2 m2"> </aside>
            <aside v-on:click="configMatA()" class="w3-col s2 m2 w3-indigo">A</aside>
            <aside v-on:click="configMatB()" class="w3-col s2 m2 w3-indigo-d2">B</aside>
            <aside v-on:click="configMatC()" class="w3-col s2 m2 w3-indigo">C</aside>
            <aside v-on:click="configMatD()" class="w3-col s2 m2 w3-indigo-d2">D</aside>
            <aside v-on:click="configIdentity()" class="w3-col s2 m2 w3-indigo">I</aside>
            <aside class="w3-col s2 m2"></aside>
        </section>

        <section class="configPanel">
            <div class="w3-container">
                <aside id="id01" class="w3-modal">
                    <div class="w3-modal-content w3-card-4 w3-animate-zoom">
                        <header class="w3-container"> 
                            <span v-on:click="closeMatA()" 
                            class="w3-button w3-theme-d3 w3-xlarge w3-display-topright">&times;</span>
                            <h2 class="w3-center">Matrix A</h2>
                        </header>
                            
                        <!-- Tab links -->
                        <div class="w3-bar w3-border-bottom tab">
                            <button class="tablinks w3-bar-item w3-button" v-on:click="openCity(event, 'Config')">Config</button>
                            <button class="tablinks w3-bar-item w3-button" v-on:click="openCity(event, 'Help')">Help</button>
                            <button class="tablinks w3-bar-item w3-button" v-on:click="openCity(event, 'Tutorial')">Tutorial</button>
                        </div>

                        <!-- Tab Content -->
                        <div id="Config" class="w3-container w3-animate-opacity tabcontent">
                            <h1>Configuration</h1>
                            <p>Order:<br>Scalar:<br>Position:</p>
                        </div>

                        <div id="Help" class="w3-container w3-animate-opacity tabcontent">
                            <h1>Help</h1>
                            <p>Paris is the capital of France.</p>
                        </div>
                        
                        <div id="Tutorial" class="w3-container w3-animate-opacity tabcontent">
                            <h1>Tutorial</h1>
                            <p>Tokyo is the capital of Japan.</p><br>
                        </div>
                        
                        <!-- Create Matrix Button -->
                        <div class="w3-container w3-padding">
                            <button class="w3-btn w3-bottom w3-teal w3-border" 
                            v-on:click="closeMatA()">Create</button>
                        </div>
                    </div>
                </aside>
            </div>
        </section>

        <section class="matrices"></section>

        <section class="buttons w3-animate-bottom w3-small">
            <!--<div class="blank1"></div>  -->  
            <button id="addBtn" class="minus w3-btn" v-on:click="matSubtract()" :class="isDisabled"><v-icon class="white--text" small>remove</v-icon></button>
            <!--<section class="blank2"></section>-->

            <button id="matMultiplyBtn" class="matMultiply w3-btn" v-on:click="matMultiply()" :class="isDisabled"><v-icon class="white--text" small>clear</v-icon></button>  
            <button id="addBtn" class="plus w3-btn" v-on:click="matAdd()" :class="isDisabled"><v-icon class="white--text" small>add</v-icon></button>
            <button id="clrBtn" class="clear special w3-btn" v-on:click="clear()">CLR</button>
            <!--<div class="blank2"></div> -->
        </section>
    </v-container>
</template>

<script>
export default {
    name: 'Matrixmxn',
    data() {
        return {

        }
    },

    methods: {
        configMatA() {
            document.getElementById('id01').style.display='block'
        },
        closeMatA() {
            document.getElementById('id01').style.display = 'none';
        }
    }  
}
</script>

<style lang="scss" scoped>
*{
        margin: 0;
        padding: 0;
    }

    // Main grid
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 310px 23px 160px 160px 55px 55px;
        grid-template-areas: 
        "answerPanel answerPanel answerPanel"
        "header header header"
        "matrices matrices matrices"
        "configPanel configPanel configPanel"
        "configBtns configBtns configBtns"
        "buttons buttons buttons";
    }

    .answerPanel {
        grid-area: answerPanel;
        grid-row-start: 1;
        grid-row-end: 1;
        background-image: -webkit-linear-gradient(120deg, rgb(0, 204, 255), lightblue, rgb(77, 255, 210));
        
        /* background-color: #ccc; */
        padding: 15px;
    }

    .header {
        grid-area: header;
        font-size: 12px;
        color: white;
        background-color: indigo;
    }

    .configPanel {
        grid-area: configPanel;
        font-size: 12px;
        //color: white;
        background-color: lightblue;
    }
    
    .configBtns {
        grid-area: configBtns;
        font-size: 12px;
        color: white;
        background-color: indigo;
    }

    .matrices {
        grid-area: matrix;
        background-image: -webkit-linear-gradient(120deg, rgb(0, 128, 255), rgb(0, 148, 255), rgb(0, 188, 255),rgb(0, 204, 255));
        
        /*background-color: #ccc; */
         // rgb(252, 213, 105);
    }
    
    .w3-indigo {
        padding: 16px;
    }

    // Button as subgrid
    .buttons {
        display: grid;
        grid-template-columns:repeat(4, 1fr); 
        grid-template-rows: auto auto auto;
        grid-template-areas: 
        "minus plus matMultiply clear";
        grid-area: buttons;
        background-image: -webkit-linear-gradient(120deg, rgb(0, 128, 255), rgb(0, 188, 255)); 
        vertical-align: bottom;
    }

    .clear {
        grid-area: clear;
        background-color: rgba(0, 128, 255, 0.6);
        color: white;
    }

    .plus {
        grid-area: plus;
        background-color: rgba(0, 128, 255, 0.6);
        color: white;
    }

    .minus {
        grid-area: minus;
        background-color: rgba(0, 128, 255, 0.6);
        color: white;
    }

    .matMultiply {
        grid-area: matMultiply;
        background-color: rgba(0, 128, 255, 0.6);
        color: white;
    }

    .value{
        font-size: 12px;
        font-weight: 100;
    }


    input {
        margin: 5px;
        padding: 5px 5px 5px 5px;
        width: 90%;   //55px;
        border: 0;
        text-align: center;
        font-size: 10px;
        border-radius: 4px;
        color: #ffffff;
        background-color: #000000;
    }

    #scalar {
        box-sizing: 4;
    }

    input:focus, input.selectScalar { 
        color: #000000;
        background-color: #ffffff;
    }

    input#scalar {
        width: 60px;
        margin-top: 0;
        margin-bottom: 0;
    }

    // Remove scrollbar from number input fields
    .entry::-webkit-inner-spin-button,
    .entry::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }


    .doubleMatrix {
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
    }

    .doubleMatrixName {
        width: 100%;
        color: aliceblue;
        font: 14px sans-serif;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-evenly;
        align-items: center;
    }
    // Styling for large screens
     @media screen and (min-width: 736px)
    {
        input {
            width: 70%;
            font-size: 12px;
        }

            
        #twoBy2 {
            width: 26%;
            float: center;
            margin-left: 37%;
            margin-right: 37%;
            border-radius: 5px;
            margin-top: 16px !important;
            background-image: -webkit-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
            background-image: -moz-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
            background-image: -o-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
            background-image: -ms-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
            background-image: linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
        }

        #twoBy2B {
            width: 30%;
            float: center;
            margin-left: 35%;
            margin-right: 35%;
            border-radius: 5px;
            margin-top: 16px !important;
            background-image: -webkit-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
            background-image: -moz-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
            background-image: -o-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
            background-image: -ms-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
            background-image: linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
        }

        #first_By2, #sec_By2 {
            background-image: -webkit-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
            background-image: -moz-linear-gradient(120deg, rgb(67, 152, 230), rgb(153, 153, 230));
            background-image: -o-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
            background-image: -ms-linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
            background-image: linear-gradient(120deg, rgb(67, 152, 230),rgb(153, 153, 230));
        }

        // .grid {
        //     grid-template-columns: 1fr 60% 1fr;
        //     grid-template-rows: 130px 20px 90px 30px 160px auto;
            
        //     grid-template-areas: 
        //     "blank1 buttons blank2";
        // }

        .buttons {
            display: grid;
            grid-template-columns:2fr repeat(5, 1fr) 150px 2fr;
            grid-template-areas: 
            "blank1 minus fn fn fn fn clear blank2"
            "blank1 matMultiply fn fn fn fn answer blank2"
            "blank1 plus fn fn fn fn double blank2";
        }

        .blank1 {
            grid-area: blank1;
            background-color: lightblue;
            background-image: -webkit-linear-gradient(120deg, rgb(0, 158, 255), rgb(0, 178, 255), rgb(0, 190, 255));
            background-image: -moz-linear-gradient(120deg, rgb(0, 158, 255), rgb(0, 178, 255), rgb(0, 190, 255)); 
            background-image: -o-linear-gradient(120deg, rgb(0, 158, 255), rgb(0, 178, 255), rgb(0, 190, 255)); 
            background-image: -ms-linear-gradient(120deg, rgb(0, 158, 255), rgb(0, 178, 255), rgb(0, 190, 255)); 
            background-image: linear-gradient(120deg, rgb(0, 158, 255), rgb(0, 178, 255), rgb(0, 190, 255));  
        }

        .blank2 {
            grid-area: blank2;
            background-color: lightblue;
            background-image: -webkit-linear-gradient(120deg, rgb(0, 190, 255), rgb(0, 108, 255), rgb(0, 108, 255)); 
            background-image: -moz-linear-gradient(120deg, rgb(0, 190, 255), rgb(0, 108, 255), rgb(0, 108, 255)); 
            background-image: -o-linear-gradient(120deg, rgb(0, 190, 255), rgb(0, 108, 255), rgb(0, 108, 255)); 
            background-image: -ms-linear-gradient(120deg, rgb(0, 190, 255), rgb(0, 108, 255), rgb(0, 108, 255)); 
            background-image: linear-gradient(120deg, rgb(0, 190, 255), rgb(0, 108, 255), rgb(0, 108, 255)); 
        }

        .swap {
        grid-column: 5 / 7;
        }

        .identity {
            grid-column: 3 / 5;
            background-color: inherit;
            color: white;
        }

    }



</style>
