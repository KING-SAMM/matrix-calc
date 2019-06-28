
// Factorial of 0 and positive integers
export function fact(x) {
    if (x == 0 || x == 1) {
        return 1
    } else {
        return x * fact(x - 1)
    }
}