<template>
    <v-container class="grid"> 
        <section class="answerPanel">
            <table id="twoBy2B" class="w3-animate-opacity w3-card-4 w3-black w3-centered tr td" v-show="showAnsMatrix">
                <tbody>
                    <tr>
                        <td><p id="a_adj">{{a11}}</p></td><td><p id="b_adj">{{b12}}</p></td>
                    </tr>
                    <tr>
                        <td><p id="c_adj">{{c21}}</p></td><td><p id="d_adj">{{d22}}</p></td>
                    </tr>
                </tbody>
            </table>
        </section>

       <section class="method"><span id="method">{{ method }}</span></section>

        <section class="determinant">
            <span class="value">Determinant</span><h3  v-show="showDeterminant">{{ det }}</h3>
        </section>

        <section class="eigenValues"><span class="value">Eigenvalues</span></section>
        <section class="rank"><span class="value">Rank</span><h3 v-show="showRank">{{ rank }}</h3></section>

        <section class="scalar"><input id="scalar" type="number" size="4" v-show="showScalarInputMatrix" v-model.number="scalar" maxlength="3" v-on:keyup="getScalarProduct()" placeholder="scalar"></section>
        
        <section class="matrix">
            <section class="w3-row" v-show="showDoubleInputMatrix">
                <aside class="w3-col s5 m3 w3-center table_sec">
                    <table id="first_By2" class="w3-animate-zoom w3-card-4 w3-black w3-centered tr">
                        <tbody>
                            <tr>
                            <td><input type="number" v-model.number="M1_a" size="4" placeholder="x11" required></td><td><input type="number" v-model.number="M1_b" size="4" placeholder="x12" required></td>
                            </tr>
                            <tr>
                            <td><input type="number" v-model.number="M1_c" size="4" placeholder="x21" required></td><td><input type="number" v-model.number="M1_d" size="4" placeholder="x22" required></td>
                            </tr>
                        </tbody>
                    </table>
                </aside>
                <aside class="w3-col s1 m1 w3-center table_sec opr"><v-icon>{{opr}}</v-icon></aside>
                <aside class="w3-col s5 m3 w3-center table_sec">
                    <table id="sec_By2" class="w3-animate-zoom w3-card-4 w3-black w3-centered tr">
                        <tbody>
                            <tr>
                            <td><input type="number" v-model.number="M2_a" size="4" placeholder="x11" required></td><td><input type="number" v-model.number="M2_b" size="4" placeholder="x12" required></td>
                            </tr>
                            <tr>
                            <td><input type="number" v-model.number="M2_c" size="4" placeholder="x21" required></td><td><input type="number" v-model.number="M2_d" size="4" placeholder="x22" required></td>
                            </tr>
                        </tbody>
                    </table>
                </aside>
            </section>

            <table id="twoBy2" class="w3-animate-zoom w3-card-4 w3-black w3-centered tr" v-show="showSingleInputMatrix">
                <tbody>
                    <tr>
                        <td><input type="number" size="4" v-model.number="a" maxlength="3" placeholder="x11" required></td><td><input type="number" size="4" v-model.number="b" maxlength="3" placeholder="x12" required></td>
                    </tr>
                    <tr>
                        <td><input type="number" size="4" v-model.number="c" maxlength="3" placeholder="x21" required></td><td><input type="number" size="4" v-model.number="d" maxlength="3" placeholder="x22" required></td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section class="buttons">
            <aside class="w3-row w3-row-bottom w3-center w3-animate-bottom w3-small">
                <aside class="w3-bar">
                    <button id="detBtn" class="w3-btn theme-l3" v-on:click="getDeterminant()" :class="isDisabled">| <i>X</i> |</button>
                    <button id="detBtn" class="w3-btn theme-l3" v-on:click="getRank()" :class="isDisabled"> <i>Rnk</i> </button>
                    <button id="clrBtn" class="w3-btn theme-l3" v-on:click="clear()">CLR</button>
                    <button id="trnBtn" class="w3-btn theme-l3" v-on:click="getTranspose()" :class="isDisabled"><i>X</i><sup>T</sup></button>
                    <button id="adjBtn" class="w3-btn theme-l3" v-on:click="getAdjoint()" :class="isDisabled">ADJ</button>
                    <button id="invBtn" class="w3-btn theme-l3" v-on:click="getInverse()" :class="isDisabled"><i>X</i><sup>-1</sup></button>
                </aside>
                <aside class="w3-bar">
                    <button id="clrBtn" class="w3-btn w3-red" v-on:click="doubleOperations()">{{ modeBtn }}</button>
                    <button id="addBtn" class="w3-btn w3-teal" v-on:click="matAdd()" :class="isDoubleDisabled"><i>+</i></button>
                    <button id="addBtn" class="w3-btn w3-teal" v-on:click="matSubtract()" :class="isDoubleDisabled"><i>-</i></button>
                    <button id="scalarMultiplyBtn" class="w3-btn w3-teal" v-on:click="scalarMultiply()" :class="isDisabled"><strong>k</strong><i>X</i></button>
                </aside>
                <aside class="w3-bar">
                    <button id="matMultiplyBtn" class="w3-btn w3-teal" v-on:click="matMultiply()" :class="isDoubleDisabled"><i>x</i></button>
                    <button id="matSquaredBtn" class="w3-btn w3-teal" v-on:click="matSquared()" :class="isDisabled"><i>X</i><sup>2</sup></button>
                </aside>
            </aside>
        </section>
    </v-container>
</template>

<script>
export default {
  name: 'Matrix2x2',
  data() {
      return {
            a: "",
            b: "",
            c: "",
            d: "",
            a11: "",
            b12: "",
            c21: "",
            d22: "",
            M1_a: "", 
            M1_b: "", 
            M1_c: "",
            M1_d: "",
            M2_a: "",
            M2_b: "",
            M2_c: "",
            M2_d: "",
            scalar: "",
            det: "",
            rank: "",
            method: "",
            opr: "",
            showSingleInputMatrix: true,
            showDoubleInputMatrix: false,
            showAnsMatrix: false,
            showDeterminant: false,
            showRank: "",
            showScalarInputMatrix: false,
            isDisabled: "",
            isDoubleDisabled: "w3-disabled",
            modeBtn: "DBL"

        }
    },

    methods: {
        getDeterminant() {
            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (this.a === "" || this.b === "" || this.c === "" || this.d === "") { // If any input is missing...
                // ...show alert and do nothing
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {
                this.det = (this.a * this.d) - (this.b * this.c)
                this.method = ""
                this.rank = ""
                this.showDeterminant = true
            }
        },

        getRank() {
           if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (  // If input is empty show alert
                this.a === "" || this.b === "" || this.c === "" || this.d === ""
            ) {
                this.showAnsMatrix = false
                this.showRank = false
                alert("Every entry is required")
            } else if (   // If input is invalid, show alert
                this.a === undefined || this.b === undefined || this.c === undefined || this.d === undefined
            ) {
                alert("Only numeric inputs are allowed")
                this.showAnsMatrix = false
                this.showRank = false
            } else {
                // Else compute determinant
                this.det = (this.a * this.d) - (this.b * this.c)
                if (this.det !== 0) {
                    this.rank = 2
                    this.method = ""
                    this.showRank = true
                } else if (this.det === 0 && this.a === 0 && this.b === 0 && this.c === 0 && this.d === 0) {
                    this.rank = 0
                    this.method = ""
                    this.showRank = true
                    return
                } else if (this.det === 0 && (this.a !== 0 || this.b !== 0 || this.c !== 0 || this.d !== 0)) {
                    this.rank = 1
                    this.method = ""
                    this.showRank = true
                }
            }
       },

        getTranspose() {
            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (this.a === "" || this.b === "" || this.c === "" || this.d === "") {  // If any input is missing...
                // ...show alert and do nothing
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else if (this.showScalarInputMatrix === false) { // If scalar field is inactive...
                // ... do regular transpose
                this.a11 = this.a 
                this.c21 = this.b 
                this.b12 = this.c
                this.d22 = this.d

                this.method = "Transpose"
                this.showAnsMatrix = true
            } else if (this.showScalarInputMatrix === true && (this.scalar === "" || this.scalar === undefined || this.scalar === isNaN)) { // If scalar is not set...
                // ... do regular transpose
                this.a11 = this.a 
                this.c21 = this.b 
                this.b12 = this.c
                this.d22 = this.d

                this.method = "Transpose"
                this.showAnsMatrix = true
            } else if (this.showScalarInputMatrix === true && (this.scalar !== "" || this.scalar !== undefined)) { // If scalar is set...
                // ... do scalar multiplication of transpose
                this.a11 = this.a * this.scalar
                this.c21 = this.b * this.scalar
                this.b12 = this.c * this.scalar
                this.d22 = this.d * this.scalar

                this.method = this.scalar + " x Transpose"
                this.showAnsMatrix = true

            } 
        },

        getAdjoint() {
            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (this.a === "" || this.b === "" || this.c === "" || this.d === "") {  // If any input is missing...
                // ...show alert and do nothing
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {
                this.a11 = this.d 
                this.b12 = -1 * this.b 
                this.c21 = -1 * this.c
                this.d22 = this.a
                this.method = "Adjoint"
                this.showAnsMatrix = true
            }

        },

         getInverse() {
             if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (this.a === "" || this.b === "" || this.c === "" || this.d === "") {  // If any input is missing...
                // ...show alert and do nothing
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
                return
            } 

            // Convert final answer to rational numbers
            let find_rational = function(value) {
                let best_numer = 1
                let best_denom = 1
                let best_err = Math.abs(value - best_numer / best_denom)
                for (let denom = 1; best_err > 0 && denom <= 10000; denom++) {
                    let numer = Math.round(value * denom)
                    let err = Math.abs(value - numer / denom)
                    if (err < best_err) {
                        best_numer = numer
                        best_denom = denom
                        best_err = err;
                        console.log(best_numer + " / " + best_denom + " = " + (best_numer/best_denom) + " error " + best_err)
                    }
                }
                if (best_denom === 1) {
                    return [best_numer]
                }
                return [best_numer, best_denom]
            }

            function scalarMultiply(arr) {return arr *= num }

            function scalarMultiplyArray(arr, rows) {
                let arr2 = []
                for(let i = 0; i < rows; i++) {
                    arr2[i] = arr[i].map(scalarMultiply)
                }
            return arr2
            }
            
            
            let newMat = []
            let mat2By2 = [[this.a, this.b],[this.c, this.d]]
            let det = (this.a * this.d) - (this.b * this.c)
            let num = (1/det)
            let rows = 2
            
            if (det === 0) {
                alert("Matrix is NON-INVERTIBLE when Det = 0")
            } else {
                newMat = scalarMultiplyArray(mat2By2, rows)


                let rationalA = find_rational(newMat[0][0])
                let rationalB = find_rational(-1 * newMat[0][1])
                let rationalC = find_rational(-1 * newMat[1][0])
                let rationalD = find_rational(newMat[1][1])
                
                this.d22 = rationalA.join(" / ")
                this.b12 = rationalB.join(" / ")
                this.c21 = rationalC.join(" / ")
                this.a11 = rationalD.join(" / ")

                this.method = "Inverse"
                this.showAnsMatrix = true
            }
            
        },

        clear() {
            // Clear answer matrix
            this.a11 = "" 
            this.b12 = "" 
            this.c21 = ""
            this.d22 = ""
            this.method = ""
            this.showAnsMatrix = false

            // Clear single operations matrix
            if (this.showSingleInputMatrix === true && this.showDoubleInputMatrix === false) {
                this.a = "" 
                this.b = "" 
                this.c = ""
                this.d = ""
                this.det = ""
                this.scalar = ""
                this.showScalarInputMatrix = false

            // Clear binary operations matrices
            } else if (this.showSingleInputMatrix === false && this.showDoubleInputMatrix === true) {
                this.M1_a = "" 
                this.M1_b = "" 
                this.M1_c = ""
                this.M1_d = ""
                this.M2_a = "" 
                this.M2_b = "" 
                this.M2_c = ""
                this.M2_d = ""
                this.opr = ""
            }
        }, 

        doubleOperations() {        
            this.det = ""
            this.method = ""
            this.showAnsMatrix = false
            this.showScalarInputMatrix = false
            this.showSingleInputMatrix = !this.showSingleInputMatrix
            this.showDoubleInputMatrix = !this.showDoubleInputMatrix

            // Enable buttons and view for binary operations when on double matrices mode
            if (this.showDoubleInputMatrix === true) {
                this.isDisabled = "w3-disabled"
                this.isDoubleDisabled = !this.isDoubleDisabled
                this.modeBtn = "SGL"
                this.opr = ""

            // Disable buttons and view for binary operations when on single matrix mode
            } else if (this.showDoubleInputMatrix === false) {
                this.isDisabled = !this.isDisabled
                this.isDoubleDisabled = "w3-disabled"
                this.modeBtn = "DBL"
            }
        },

        matAdd() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else 
            // If any entry is missing, show alert and do nothing...
            if (this.M1_a === "" || this.M1_b === "" || this.M1_c === "" || this.M1_d === "" || this.M2_a === "" || this.M2_b === "" || this.M2_c === "" || this.M2_d === "") {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {
                // ...else proceed with matrix addition
                this.a11 = this.M1_a + this.M2_a
                this.b12 = this.M1_b + this.M2_b
                this.c21 = this.M1_c + this.M2_c
                this.d22 = this.M1_d + this.M2_d

                this.showAnsMatrix = true
                
                this.opr = "add"
                this.method = "Matrix Addition"
            }
        },

         matSubtract() {
             if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else 
             // If any entry is missing, show alert and do nothing..
            if (this.M1_a === "" || this.M1_b === "" || this.M1_c === "" || this.M1_d === "" || this.M2_a === "" || this.M2_b === "" || this.M2_c === "" || this.M2_d === "") {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {
                // ...else proceed with matrix subtraction
                this.a11 = this.M1_a - this.M2_a
                this.b12 = this.M1_b - this.M2_b
                this.c21 = this.M1_c - this.M2_c
                this.d22 = this.M1_d - this.M2_d

                this.showAnsMatrix = true
                
                this.opr = "remove"
                this.method = "Matrix Subtraction"
            }
        },

        matMultiply() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else 
            // If any entry is missing, show alert and do nothing..
            if (this.M1_a === "" || this.M1_b === "" || this.M1_c === "" || this.M1_d === "" || this.M2_a === "" || this.M2_b === "" || this.M2_c === "" || this.M2_d === "") {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {
                // ...else proceed with matrix multiplication
                this.a11 = (this.M1_a * this.M2_a) + (this.M1_b * this.M2_c)
                this.b12 = (this.M1_a * this.M2_b) + (this.M1_b * this.M2_d)
                this.c21 = (this.M1_c * this.M2_a) + (this.M1_d * this.M2_c)
                this.d22 = (this.M1_c * this.M2_b) + (this.M1_d * this.M2_d)

                this.showAnsMatrix = true
                
                this.opr = "clear"
                this.method = "Matrix Multiplication"
            }
        },

        matSquared() {
            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else 
            // If any entry is missing, show alert and do nothing..
            if (this.a === "" || this.b === "" || this.c === "" || this.d === "") {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {
                // ...else proceed with matrix squared
                this.a11 = (this.a * this.a) + (this.b * this.c)
                this.b12 = (this.a * this.b) + (this.b * this.d)
                this.c21 = (this.c * this.a) + (this.d * this.c)
                this.d22 = (this.c * this.b) + (this.d * this.d)

                this.showAnsMatrix = true
                
                this.opr = "clear"
                this.method = "Matrix Squared"
            }
        },

        /**
         * Scalar multiplication by button click
         */
        scalarMultiply() {
            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } 
            this.showScalarInputMatrix = true
            this.scalar 

            // If scalar is missing, non-numeric or undefined, do nothing...
            if (this.scalar === undefined || this.scalar === "" || this.scalar === isNaN) {
                return
            } else if (this.a === "" || this.b === "" || this.c === "" || this.d === "") {  
                //...else if any entry is missing or invalid, show akert and do nothing
                alert("Every entry is required")
                return
            } else if ((this.showScalarInputMatrix === true && this.scalar !== undefined && this.scalar !== isNaN) || this.scalar === 0) {
                //...else if scalar is provided and valid, proceed with scalar multiplication
                let arr = [[this.a, this.b], [this.c, this.d]]

                for (let i = 0; i < 2; i++) {
                    for (let j = 0; j < 2; j++) {
                        arr[i][j] = this.scalar * arr[i][j]
                    }
                }


                this.a11 = arr[0][0] 
                this.b12 = arr[0][1] 
                this.c21 = arr[1][0]
                this.d22 = arr[1][1]

                this.method = "Scalar Multiplication"
                this.showAnsMatrix = true
            }
        },

        /**
         * Scalar multiplication on keyup from scalar input field
         */
        getScalarProduct() {
            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } 

            // If scalar is missing, non-numeric or undefined, do nothing...
            if (this.scalar === "" || this.a === "" || this.b === "" || this.c === "" || this.d === "") {
                this.a11 = "" 
                this.b12 = "" 
                this.c21 = ""
                this.d22 = ""
                return
            }

            //...else if scalar is provided and valid, proceed with scalar multiplication
            if ((this.showScalarInputMatrix === true && this.scalar !== undefined && this.scalar !== isNaN) || this.scalar === 0) {
                let arr = [[this.a, this.b], [this.c, this.d]]

                for (let i = 0; i < 2; i++) {
                    for (let j = 0; j < 2; j++) {
                        arr[i][j] = this.scalar * arr[i][j]
                    }
                }


                this.a11 = arr[0][0] 
                this.b12 = arr[0][1] 
                this.c21 = arr[1][0]
                this.d22 = arr[1][1]

                this.method = "Scalar Multiplication"
                this.showAnsMatrix = true
            }
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
    .grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 130px 20px 90px 30px 1fr 80px;
        grid-template-areas: 
        "answerPanel answerPanel answerPanel"
        "method method method"
        "rank determinant eigenValues"
        "scalar scalar scalar"
        "matrix matrix matrix"
        "buttons buttons buttons";
    }

    .answerPanel {
        grid-area: answerPanel;
        background-color: #ccc;
        padding: 15px;
    }

    .method {
        grid-area: method;
        background-color: #555555;
    }

    .determinant {
        grid-area: determinant;
    }

    .eigenValues {
        grid-area: eigenValues;
    }

    .rank {
        grid-area: rank;
    }

    .scalar {
        grid-area: scalar;
        background-color: #555555;
    }

    .matrix {
        grid-area: matrix;
        background-color: #ccc; 
        height: 200px;          // rgb(252, 213, 105);
    }

    .buttons {
        grid-area: buttons;
        background-color: #ccc;
        vertical-align: bottom;
    }

    #method {
        color: white;
    }

    .theme-l3 {
        background-color: rgb(252, 213, 105);
    }

    // .grid section:nth-child(even) {
    //     background-color: rgb(233, 236, 15);
    // }

    // .grid section:nth-child(odd) {
    //     background-color: #ccc;
    // }

    .value{
        font-size: 12px;
        font-weight: 100;
    }


    input {
        margin: 5px;
        padding: 5px 5px 5px 5px;
        width: 70px;
        border: 0;
        text-align: center;
        font-size: 15px;
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
        width: 120px;
        margin-top: 0;
        margin-bottom: 0;
    }

    #first_By2, #sec_By2 {
        border-radius: 5px;
        margin-top: 16px !important;
        background-color: #ffffff !important;
    }
    
    #twoBy2 {
        width: 180px;
        float: center;
        margin-left: auto;
        margin-right: auto;
        border-radius: 5px;
        margin-top: 16px !important;
        background-color: #ffffff !important;
    }

    #twoBy2B {
        width: 180px;
        height: 90px;
        opacity: 1;
        float: center;
        margin-left: auto;
        margin-right: auto;
        border-radius: 5px;
       
    }

     @media screen and (min-width: 736px)
    {
        input {
            width: 60%;
        }

            
        #twoBy2 {
            width: 30%;
            float: center;
            margin-left: 35%;
            margin-right: 35%;
            border-radius: 5px;
            margin-top: 16px !important;
            background-color: #ffffff !important;
        }

        #twoBy2B {
            width: 50%;
            float: center;
            margin-left: 25%;
            margin-right: 25%;
            border-radius: 5px;
        
        }

    }



</style>