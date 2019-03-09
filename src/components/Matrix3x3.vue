<template>
    <v-container class="grid">
        <section class="answerPanel" id="answerPanel">
            <table id="threeBy3B" class="w3-animate-opacity w3-card-4 w3-black w3-centered tr td" v-show="showAnsMatrix">
                <tbody>
                    <tr>
                        <td><p id="a_adj">{{a11}}</p></td><td><p id="b_adj">{{b12}}</p></td><td><p id="c_adj">{{c13}}</p></td>
                    </tr>
                    <tr>
                        <td><p id="d_adj">{{d21}}</p></td><td><p id="e_adj">{{e22}}</p></td><td><p id="f_adj">{{f23}}</p></td>
                    </tr>
                    <tr>
                        <td><p id="g_adj">{{g31}}</p></td><td><p id="h_adj">{{h32}}</p></td><td><p id="i_adj">{{i33}}</p></td>
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

        <!--<section class="matrices w3-container w3-center">
            
        </section> -->

        <section class="matrix">
            <section class="w3-row" v-show="showDoubleInputMatrix">
                <aside class="w3-col s5 m3 w3-center table_sec">
                    <table id="first_By3" class="w3-animate-zoom w3-card-4 w3-black w3-centered tr td">
                        <tbody>
                            <tr><td><input type="number" v-model.number="M1_a" size="4" placeholder="x11"></td><td><input type="number" v-model.number="M1_b" size="4" placeholder="x12"></td><td><input type="number" v-model.number="M1_c" size="4" placeholder="x13"></td></tr>
                            <tr><td><input type="number" v-model.number="M1_d" size="4" placeholder="x21"></td><td><input type="number" v-model.number="M1_e" size="4" placeholder="x22"></td><td><input type="number" v-model.number="M1_f" size="4" placeholder="x23"></td></tr>
                            <tr><td><input type="number" v-model.number="M1_g" size="4" placeholder="x31"></td><td><input type="number" v-model.number="M1_h" size="4" placeholder="x32"></td><td><input type="number" v-model.number="M1_i" size="4" placeholder="x33"></td></tr>
                        </tbody>
                    </table>
                </aside>
                <aside class="w3-col s1 m1 w3-center table_sec opr"><v-icon>{{opr}}</v-icon></aside>
                <aside class="w3-col s5 m3 w3-center table_sec">
                    <table id="sec_By3" class="w3-animate-zoom w3-card-4 w3-black w3-centered tr td">
                        <tbody>
                            <tr><td><input type="number" v-model.number="M2_a" size="4" placeholder="x11"></td><td><input type="number" v-model.number="M2_b" size="4" placeholder="x12"></td><td><input type="number" v-model.number="M2_c" size="4" placeholder="x13"></td></tr>
                            <tr><td><input type="number" v-model.number="M2_d" size="4" placeholder="x21"></td><td><input type="number" v-model.number="M2_e" size="4" placeholder="x22"></td><td><input type="number" v-model.number="M2_f" size="4" placeholder="x23"></td></tr>
                            <tr><td><input type="number" v-model.number="M2_g" size="4" placeholder="x31"></td><td><input type="number" v-model.number="M2_h" size="4" placeholder="x32"></td><td><input type="number" v-model.number="M2_i" size="4" placeholder="x33"></td></tr>
                        </tbody>
                    </table>
                </aside>
            </section>

            <table id="threeBy3" class="w3-animate-zoom w3-card-4 w3-black w3-centered tr td" v-show="showSingleInputMatrix">
                <tbody>
                    <tr><td><input type="number" v-model.number="a" size="4" placeholder="x11"></td><td><input type="number" v-model.number="b" size="4" placeholder="x12"></td><td><input type="number" v-model.number="c" size="4" placeholder="x13"></td></tr>
                    <tr><td><input type="number" v-model.number="d" size="4" placeholder="x21"></td><td><input type="number" v-model.number="e" size="4" placeholder="x22"></td><td><input type="number" v-model.number="f" size="4" placeholder="x23"></td></tr>
                    <tr><td><input type="number" v-model.number="g" size="4" placeholder="x31"></td><td><input type="number" v-model.number="h" size="4" placeholder="x32"></td><td><input type="number" v-model.number="i" size="4" placeholder="x33"></td></tr>
                </tbody>
            </table>
        </section>

        <section class="buttons">
            <aside class="w3-center w3-display bottommiddle w3-animate-opacity w3-animate-bottom w3-small">
                <aside class="w3-bar">
                <button class="w3-btn theme-l3" v-on:click="getDeterminant()" :class="isDisabled">| <i>X</i> |</button>
                <button class="w3-btn theme-l3" v-on:click="getRank()" :class="isDisabled"><i>RNK</i></button>
                <button class="w3-btn theme-l3" v-on:click="clear()">CLR</button> 
                <button class="w3-btn theme-l3" v-on:click="getTranspose()" :class="isDisabled"><i>X</i><sup>T</sup></button>
                <button id="adjBtn" class="w3-btn theme-l3" v-on:click="getAdjoint()" :class="isDisabled">ADJ</button>
                <button id="invBtn" class="w3-btn theme-l3" v-on:click="getInverse()" :class="isDisabled"><i>X</i><sup>-1</sup></button>
            </aside>
            <aside class="w3-bar">
                <button id="clrBtn" class="w3-btn w3-red" v-on:click="doubleOperations()">{{ modeBtn }}</button>
                <button id="addBtn" class="w3-btn w3-teal" v-on:click="getSum()" :class="isDoubleDisabled"><i>+</i></button> 
                <button id="subBtn" class="w3-btn w3-teal" v-on:click="getSubtraction()" :class="isDoubleDisabled"><i>-</i></button>
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
    name: 'Matrix3x3',
    data() {
        return {
            a: "",
            b: "",
            c: "",
            d: "",
            e: "",
            f: "",
            g: "",
            h: "",
            i: "",
            a11: "",
            b12: "",
            c13: "",
            d21: "",
            e22: "",
            f23: "",
            g31: "",
            h32: "",
            i33: "",
            M1_a: "", 
            M1_b: "", 
            M1_c: "",
            M1_d: "",
            M1_e: "", 
            M1_f: "", 
            M1_g: "",
            M1_h: "",
            M1_i: "",
            M2_a: "",
            M2_b: "",
            M2_c: "",
            M2_d: "",
            M2_e: "", 
            M2_f: "", 
            M2_g: "",
            M2_h: "",
            M2_i: "",
            det: "",
            rank: "",
            method: "",
            opr: "",
            scalar: "",
            showScalarInputMatrix: false,
            showSingleInputMatrix: true,
            showDoubleInputMatrix: false,
            showAnsMatrix: false,
            showDeterminant: false,
            showRank: false,
            isDisabled: "",
            isDoubleDisabled: "w3-disabled",
            modeBtn: "DBL"

        }
    },

    methods: {
        getDeterminant() {
            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (  // If input is empty show alert
                this.a === "" || this.b === "" || this.c === "" || this.d === "" || this.e === ""
                || this.f === "" || this.g === "" || this.h === "" || this.i === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else if (   // If input is invalid, show alert
                this.a === undefined || this.b === undefined || this.c === undefined || this.d === undefined || this.e === undefined
                || this.f === undefined || this.g === undefined || this.h === undefined || this.i === undefined
            ) {
                alert("Only numeric inputs are allowed")
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
            } else {
                // Else compute determinant
                this.det = this.a * ((this.e * this.i) - (this.h * this.f)) - this.b * ((this.d * this.i) - (this.g * this.f)) + this.c * ((this.d * this.h) - (this.g * this.e))
                this.method = ""
                this.rank = ""
                this.showDeterminant = true
            }
       },

       getRank() {
           if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (  // If input is empty show alert
                this.a === "" || this.b === "" || this.c === "" || this.d === "" || this.e === ""
                || this.f === "" || this.g === "" || this.h === "" || this.i === ""
            ) {
                this.showAnsMatrix = false
                this.showRank = false
                alert("Every entry is required")
            } else if (   // If input is invalid, show alert
                this.a === undefined || this.b === undefined || this.c === undefined || this.d === undefined || this.e === undefined
                || this.f === undefined || this.g === undefined || this.h === undefined || this.i === undefined
            ) {
                alert("Only numeric inputs are allowed")
                this.showAnsMatrix = false
                this.showRank = false
            } else {
                // Else compute determinant
                this.det = this.a * ((this.e * this.i) - (this.h * this.f)) - this.b * ((this.d * this.i) - (this.g * this.f)) + this.c * ((this.d * this.h) - (this.g * this.e))
                if (this.det !== 0) {
                    this.rank = 3
                    this.method = ""
                    this.showRank = true
                } else if (this.det === 0 && this.a === 0 && this.b === 0 && this.c === 0 && this.d === 0 && this.e === 0 && this.f === 0 && this.g === 0 && this.h === 0 && this.i === 0) {
                    this.rank = 0
                    this.method = ""
                    this.showRank = true
                    return
                } else if (this.det === 0 && ((this.e * this.i) - (this.h * this.f) !== 0 || (this.d * this.i) - (this.g * this.f) !== 0 || (this.d * this.h) - (this.g * this.e) !== 0
                || (this.b * this.i) - (this.h * this.c) !== 0 || (this.a * this.i) - (this.g * this.c) !== 0 || (this.a * this.h) - (this.g * this.b) !== 0
                || (this.b * this.f) - (this.e * this.c) !== 0 || (this.a * this.f) - (this.d * this.c) !== 0 || (this.a * this.e) - (this.d * this.b) !== 0)) {
                    this.rank = 2
                    this.method = ""
                    this.showRank = true
                } else if ((this.a !== 0 || this.b !== 0 || this.c !== 0 || this.d !== 0 || this.e !== 0 || this.f !== 0 || this.g !== 0 || this.h !== 0 || this.i !== 0) && ((this.e * this.i) - (this.h * this.f) === 0 && (this.d * this.i) - (this.g * this.f) === 0 && (this.d * this.h) - (this.g * this.e) === 0
                && (this.b * this.i) - (this.h * this.c) === 0 && (this.a * this.i) - (this.g * this.c) === 0 && (this.a * this.h) - (this.g * this.b) === 0
                && (this.b * this.f) - (this.e * this.c) === 0 && (this.a * this.f) - (this.d * this.c) === 0 && (this.a * this.e) - (this.d * this.b) === 0)) {
                    this.rank = 1
                    this.method = ""
                    this.showRank = true
                }
            }
       },

        getTranspose() {
            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (   // If input is empty show alert
                this.a === "" || this.b === "" || this.c === "" || this.d === "" || this.e === ""
                || this.f === "" || this.g === "" || this.h === "" || this.i === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else if ((this.showScalarInputMatrix === false) || (this.showScalarInputMatrix === true && (this.scalar === "" || this.scalar === undefined || this.scalar === isNaN))) { 
                // If scalar field is inactive or scalar is not set...
                // ... do regular transpose
                let rows = 3
                let cols = 3
                let arr = [[this.a, this.b, this.c], [this.d, this.e, this.f], [this.g, this.h, this.i]];
                let arr2 = [[this.a11, this.b12, this.c13], [this.d21, this.e22, this.f23], [this.g31, this.h32, this.i33]];
            
                for (let i = 0; i < rows; ++i) {
                    let columns = []
                    for (let j = 0; j < cols; ++j) {
                        columns[j] = arr[j][i]           
                    }
                    arr2[i] = columns
                }

                this.a11 = arr2[0][0]
                this.b12 = arr2[0][1]
                this.c13 = arr2[0][2]
                this.d21 = arr2[1][0]
                this.e22 = arr2[1][1]
                this.f23 = arr2[1][2]
                this.g31 = arr2[2][0]
                this.h32 = arr2[2][1]
                this.i33 = arr2[2][2]

                this.method = "Transpose"
                this.showAnsMatrix = true
            } else if (this.showScalarInputMatrix === true && (this.scalar !== "" || this.scalar !== undefined)) { // If scalar is set...
                // ... do scalar multiplication of transpose
                this.a11 = this.a * this.scalar
                this.d21 = this.b * this.scalar
                this.g31 = this.c * this.scalar
                this.b12 = this.d * this.scalar
                this.e22 = this.e * this.scalar
                this.h32 = this.f * this.scalar
                this.c13 = this.g * this.scalar
                this.f23 = this.h * this.scalar
                this.i33 = this.i * this.scalar

                this.method = this.scalar + " x Transpose"
                this.showAnsMatrix = true

            } 
        },

        getAdjoint() {
            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (  // If input is empty, show alert
                this.a === "" || this.b === "" || this.c === "" || this.d === "" || this.e === ""
                || this.f === "" || this.g === "" || this.h === "" || this.i === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else if (    // If input is invalid, show alert
                this.a === undefined || this.b === undefined || this.c === undefined || this.d === undefined || this.e === undefined
                || this.f === undefined || this.g === undefined || this.h === undefined || this.i === undefined
            ) {
                alert("Only numeric inputs are allowed")
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
            } else {   // Else comput adjoint
                let detArr = [[this.a, this.b, this.c], [this.d, this.e, this.f], [this.g, this.h, this.i]]
                let Arr = [[],[],[]]
                let Arr2 = [[],[],[]]

                // Matrix of cofactors, shortcut method
                for(let i = 0; i < 3; i++) {
                    for(let j = 0; j < 2; j++) {
                        detArr[i].push(detArr[i][j])
                        
                        let k = 3
                        let l = 0
                        while(k < 5) {
                            detArr[k] = detArr[l]
                            l++
                            k++
                        }
                    }
                }

                for(let p = 1, n = 0; p < 4; p++, ++n) {
                    for(let q = 1, r = 0; q < 4; q++, ++r){
                        Arr[n].push((detArr[p][q] * detArr[p + 1][q + 1]) - (detArr[p + 1][q] * detArr[p][q + 1]))
                    }
                }

                // Transpose of matrix of cofactors
                let rows = 3
                let cols = 3
                for (let s = 0; s < rows; s++) {
                    let columns = []
                    for (let t = 0; t < cols; t++) {
                        columns[t] = Arr[t][s]           
                    }
                    Arr2[s] = columns
                }

                this.a11 = Arr2[0][0]
                this.b12 = Arr2[0][1]
                this.c13 = Arr2[0][2]
                this.d21 = Arr2[1][0]
                this.e22 = Arr2[1][1]
                this.f23 = Arr2[1][2]
                this.g31 = Arr2[2][0]
                this.h32 = Arr2[2][1]
                this.i33 = Arr2[2][2]

                this.method = "Adjoint"
                this.showAnsMatrix = true
            }
        },

        getInverse() {
            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (  // If input is empty, show alert
                this.a === "" || this.b === "" || this.c === "" || this.d === "" || this.e === ""
                || this.f === "" || this.g === "" || this.h === "" || this.i === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else if (
                this.a === undefined || this.b === undefined || this.c === undefined || this.d === undefined || this.e === undefined
                || this.f === undefined || this.g === undefined || this.h === undefined || this.i === undefined
            ) {
                alert("Only numeric inputs are allowed")
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
            } else {
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

                let detArr = [[this.a, this.b, this.c], [this.d, this.e, this.f], [this.g, this.h, this.i]]
                let Arr = [[],[],[]]
                let Arr2 = [[],[],[]]

                // Matrix of cofactors, shortcut method
                for(let i = 0; i < 3; i++) {
                    for(let j = 0; j < 2; j++) {
                        detArr[i].push(detArr[i][j])
                        
                        let k = 3
                        let l = 0
                        while(k < 5) {
                            detArr[k] = detArr[l]
                            l++
                            k++
                        }
                    }
                }

                for(let p = 1, n = 0; p < 4; p++, ++n) {
                    for(let q = 1, r = 0; q < 4; q++, ++r){
                        Arr[n].push((detArr[p][q] * detArr[p + 1][q + 1]) - (detArr[p + 1][q] * detArr[p][q + 1]))
                    }
                }

                // Transpose of matrix of cofactors
                let rows = 3
                let cols = 3
                for (let s = 0; s < rows; s++) {
                    let columns = []
                    for (let t = 0; t < cols; t++) {
                        columns[t] = Arr[t][s]           
                    }
                    Arr2[s] = columns
                }

                let scalarMultiply = (arr) => {return arr *= num} 

                let scalarMultiplyArray = (arr, rows) => {
                    let arr2 = []
                    for(let i = 0; i < rows; i++) {
                        arr2[i] = arr[i].map(scalarMultiply)
                    }
                return arr2
                }
                
                
                let invArr = []
                this.det = this.a * ((this.e * this.i) - (this.h * this.f)) - this.b * ((this.d * this.i) - (this.g * this.f)) + this.c * ((this.d * this.h) - (this.g * this.e))
                let num = (1/this.det)
                
                if (this.det === 0) {
                    alert("Matrix is NON-INVERTIBLE when Det = 0")
                } else {
                    invArr = scalarMultiplyArray(Arr2, rows)


                    this.a11 = find_rational(invArr[0][0]).join("/")
                    this.b12 = find_rational(invArr[0][1]).join("/")
                    this.c13 = find_rational(invArr[0][2]).join("/")
                    this.d21 = find_rational(invArr[1][0]).join("/")
                    this.e22 = find_rational(invArr[1][1]).join("/")
                    this.f23 = find_rational(invArr[1][2]).join("/")
                    this.g31 = find_rational(invArr[2][0]).join("/")
                    this.h32 = find_rational(invArr[2][1]).join("/")
                    this.i33 = find_rational(invArr[2][2]).join("/")

                    this.method = "Inverse"
                    this.showAnsMatrix = true
                }
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
            } else if (this.a === "" || this.b === "" || this.c === "" || this.d === "" || this.e === ""
                || this.f === "" || this.g === "" || this.h === "" || this.i === "") {  

                //...else if any entry is missing or invalid, show akert and do nothing
                alert("Every entry is required")
                return
            } else if ((this.showScalarInputMatrix === true && this.scalar !== undefined && this.scalar !== isNaN) || this.scalar === 0) {
                //...else if scalar is provided and valid, proceed with scalar multiplication
                let arr = [[this.a, this.b, this.c], [this.d, this.e, this.f], [this.g, this.h, this.i]]

                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        arr[i][j] = this.scalar * arr[i][j]
                    }
                }


                this.a11 = arr[0][0] 
                this.b12 = arr[0][1] 
                this.c13 = arr[0][2]
                this.d21 = arr[1][0]
                this.e22 = arr[1][1] 
                this.f23 = arr[1][2] 
                this.g31 = arr[2][0]
                this.h32 = arr[2][1]
                this.i33 = arr[2][2]

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
            if (this.scalar === "" || this.a === "" || this.b === "" || this.c === "" || this.d === "" 
                || this.e === "" || this.f === "" || this.g === "" || this.h === "" || this.i === "") {
                this.a11 = "" 
                this.b12 = "" 
                this.c13 = ""
                this.d21 = ""
                this.e22 = "" 
                this.f23 = "" 
                this.g31 = ""
                this.h32 = ""
                this.i33 = ""
                return
            }

            //...else if scalar is provided and valid, proceed with scalar multiplication
            if ((this.showScalarInputMatrix === true && this.scalar !== undefined && this.scalar !== isNaN) || this.scalar === 0) {
                let arr = [[this.a, this.b, this.c], [this.d, this.e, this.f], [this.g, this.h, this.i]]

                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        arr[i][j] = this.scalar * arr[i][j]
                    }
                }


                this.a11 = arr[0][0] 
                this.b12 = arr[0][1] 
                this.c13 = arr[0][2]
                this.d21 = arr[1][0]
                this.e22 = arr[1][1] 
                this.f23 = arr[1][2] 
                this.g31 = arr[2][0]
                this.h32 = arr[2][1]
                this.i33 = arr[2][2]

                this.method = "Scalar Multiplication"
                this.showAnsMatrix = true
            }
        },
    


        matSquared() {
            if (this.showDoubleInputMatrix === true) { // If in double operations mode, do nothing
                return
            } else if (   // If input is empty, show alert
                this.a === "" || this.b === "" || this.c === "" || this.d === "" || this.e === ""
                || this.f === "" || this.g === "" || this.h === "" || this.i === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {
                let rows = 3
                let cols = 3
                let arr = [[this.a, this.b, this.c], [this.d, this.e, this.f], [this.g, this.h, this.i]];
                let arr2 = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            
                for (let k = 0; k < cols; k++) {
                    for (let i = 0; i < rows; i++) {
                        for (let j = 0; j < cols; j++) {
                            arr2[i][k] += (arr[i][j] * arr[j][k]) 
                        }          
                    }
                }

                this.a11 = arr2[0][0]
                this.b12 = arr2[0][1]
                this.c13 = arr2[0][2]
                this.d21 = arr2[1][0]
                this.e22 = arr2[1][1]
                this.f23 = arr2[1][2]
                this.g31 = arr2[2][0]
                this.h32 = arr2[2][1]
                this.i33 = arr2[2][2]

                this.method = "Matrix Squared"
                this.showAnsMatrix = true
            }
        },

        clear() {
            this.showAnsMatrix = false
            this.a11 = "" 
            this.b12 = "" 
            this.c13 = ""
            this.d21 = ""
            this.e22 = "" 
            this.f23 = "" 
            this.g31 = ""
            this.h32 = ""
            this.i33 = ""
            this.method = ""
            this.scalar = ""
            if (this.showSingleInputMatrix === true && this.showDoubleInputMatrix === false) {
                this.a = "" 
                this.b = "" 
                this.c = ""
                this.d = ""
                this.e = "" 
                this.f = "" 
                this.g = ""
                this.h = ""
                this.i = ""
                this.det = ""
            } else if (this.showSingleInputMatrix === false && this.showDoubleInputMatrix === true) {
                this.M1_a = this.M2_a = "" 
                this.M1_b = this.M2_b ="" 
                this.M1_c = this.M2_c = ""
                this.M1_d = this.M2_d = ""
                this.M1_e = this.M2_e = "" 
                this.M1_f = this.M2_f = "" 
                this.M1_g = this.M2_g = ""
                this.M1_h = this.M2_h = ""
                this.M1_i = this.M2_i = ""
            
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

            if (this.showDoubleInputMatrix === true) {
                // Clear out single operations variables
                this.a = this.b = this.c = this.d = this.e = this.f = this.g = this.h = this.i = this.scalar = ""
                

                this.isDisabled = "w3-disabled"
                this.isDoubleDisabled = !this.isDoubleDisabled
                this.modeBtn = "SGL"
                this.opr = ""
            } else if (this.showDoubleInputMatrix === false) {
                // Clear out double operations variables
                this.M1_a = this.M1_b = this.M1_c = this.M1_d = this.M1_e = this.M1_f = this.M1_g = this.M1_h = this.M1_i = ""
                this.M2_a = this.M2_b = this.M2_c = this.M2_d = this.M2_e = this.M2_f = this.M2_g = this.M2_h = this.M2_i = ""

                this.isDisabled = !this.isDisabled
                this.isDoubleDisabled = "w3-disabled"
                this.modeBtn = "DBL"
            }
        },

        getSum() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else if (   // If input(s) is/are empty, show alert
                this.M1_a === "" || this.M1_b === "" || this.M1_c === "" || this.M1_d === "" || this.M1_e === ""
                || this.M1_f === "" || this.M1_g === "" || this.M1_h === "" || this.M1_i === "" 
                || this.M2_a === "" || this.M2_b === "" || this.M2_c === "" || this.M2_d === "" || this.M2_e === ""
                || this.M2_f === "" || this.M2_g === "" || this.M2_h === "" || this.M2_i === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {    // Else compute sum
                let rows = 3
                let cols = 3
                let arr1 = [[this.M1_a, this.M1_b, this.M1_c], [this.M1_d, this.M1_e, this.M1_f], [this.M1_g, this.M1_h, this.M1_i]]
                let arr2 = [[this.M2_a, this.M2_b, this.M2_c], [this.M2_d, this.M2_e, this.M2_f], [this.M2_g, this.M2_h, this.M2_i]]
            
                for (let i = 0; i < rows; ++i) {
                    for (let j = 0; j < cols; ++j) {
                        arr2[i][j] = arr1[i][j] + arr2[i][j]           
                    }
                }

                this.a11 = arr2[0][0]
                this.b12 = arr2[0][1]
                this.c13 = arr2[0][2]
                this.d21 = arr2[1][0]
                this.e22 = arr2[1][1]
                this.f23 = arr2[1][2]
                this.g31 = arr2[2][0]
                this.h32 = arr2[2][1]
                this.i33 = arr2[2][2]

                this.opr = "add"
                this.method = "Matrix Addition"
                this.showAnsMatrix = true
            }
        },

        getSubtraction() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else if (
                this.M1_a === "" || this.M1_b === "" || this.M1_c === "" || this.M1_d === "" || this.M1_e === ""
                || this.M1_f === "" || this.M1_g === "" || this.M1_h === "" || this.M1_i === "" 
                || this.M2_a === "" || this.M2_b === "" || this.M2_c === "" || this.M2_d === "" || this.M2_e === ""
                || this.M2_f === "" || this.M2_g === "" || this.M2_h === "" || this.M2_i === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {   // Else compute difference
                let rows = 3
                let cols = 3
                let arr1 = [[this.M1_a, this.M1_b, this.M1_c], [this.M1_d, this.M1_e, this.M1_f], [this.M1_g, this.M1_h, this.M1_i]]
                let arr2 = [[this.M2_a, this.M2_b, this.M2_c], [this.M2_d, this.M2_e, this.M2_f], [this.M2_g, this.M2_h, this.M2_i]]
            
                for (let i = 0; i < rows; ++i) {
                    for (let j = 0; j < cols; ++j) {
                        arr2[i][j] = arr1[i][j] - arr2[i][j]           
                    }
                }

                this.a11 = arr2[0][0]
                this.b12 = arr2[0][1]
                this.c13 = arr2[0][2]
                this.d21 = arr2[1][0]
                this.e22 = arr2[1][1]
                this.f23 = arr2[1][2]
                this.g31 = arr2[2][0]
                this.h32 = arr2[2][1]
                this.i33 = arr2[2][2]

                this.opr = "remove"
                this.method = "Matrix Subtraction"
                this.showAnsMatrix = true
            }
        },

        matMultiply() {
            if (this.showSingleInputMatrix === true) { // If in single operations mode, do nothing
                return
            } else if (   // If input(s) is/are empty, show alert
                this.M1_a === "" || this.M1_b === "" || this.M1_c === "" || this.M1_d === "" || this.M1_e === ""
                || this.M1_f === "" || this.M1_g === "" || this.M1_h === "" || this.M1_i === "" 
                || this.M2_a === "" || this.M2_b === "" || this.M2_c === "" || this.M2_d === "" || this.M2_e === ""
                || this.M2_f === "" || this.M2_g === "" || this.M2_h === "" || this.M2_i === ""
            ) {
                this.showAnsMatrix = false
                this.showDeterminant = false
                this.method = ""
                alert("Every entry is required")
            } else {   // Else perform matrix multiplication
                let rows = 3
                let cols = 3
                let arr = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
                let arr1 = [[this.M1_a, this.M1_b, this.M1_c], [this.M1_d, this.M1_e, this.M1_f], [this.M1_g, this.M1_h, this.M1_i]]
                let arr2 = [[this.M2_a, this.M2_b, this.M2_c], [this.M2_d, this.M2_e, this.M2_f], [this.M2_g, this.M2_h, this.M2_i]]
            
                for (let k = 0; k < cols; k++) {
                    for (let i = 0; i < rows; i++) {
                        for (let j = 0; j < cols; j++) {
                        arr[i][k] += (arr1[i][j] * arr2[j][k]) 
                        }          
                    }
                }
        
                this.a11 = arr[0][0]
                this.b12 = arr[0][1]
                this.c13 = arr[0][2]
                this.d21 = arr[1][0]
                this.e22 = arr[1][1]
                this.f23 = arr[1][2]
                this.g31 = arr[2][0]
                this.h32 = arr[2][1]
                this.i33 = arr[2][2]

                this.opr = "clear"
                this.method = "Matrix Multiplication"
                this.showAnsMatrix = true
            }
        },
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
        padding: 5px;

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

    input:focus, input.selectScalar { 
        color: #000000;
        background-color: #ffffff;
    }

    input#scalar {
        width: 120px;
        margin-top: 0;
        margin-bottom: 0;
    }

    #first_By3, #sec_By3 {
        border-radius: 5px;
        margin-top: 16px !important;
        background-color: #ffffff !important;
    }

    #threeBy3 {
        width: 250px;
        float: center;
        margin-left: auto;
        margin-right: auto;
        border-radius: 5px;
        margin-top: 16px !important;
        background-color: #ffffff !important;
    }

    #threeBy3B {
        width: 250px;
        height: 120px;
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

        #threeBy3 {
            width: 40%;
            float: center;
            margin-left: 30%;
            margin-right: 30%;
            border-radius: 5px;
            margin-top: 16px !important;
            background-color: #ffffff !important;
        }

        #threeBy3B {
            width: 54%;
            height: 120px;
            opacity: 1;
            float: center;
            margin-left: 23%;
            margin-right: 23%;
            border-radius: 5px;
        }

    }

</style>