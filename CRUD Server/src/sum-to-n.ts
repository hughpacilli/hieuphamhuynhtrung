// The time complexity of factorial using for loop is O(N)
// Uses memory to initializing variables
function sum_to_n_a(n:number): number {
  let sum = 0
  for (let i = 1; i <= n; i++) { sum+= i }
  return sum
}

// The time complexity, in this case, is O(1)
// Takes constant time regardless of the input size
function sum_to_n_b(n:number): number {
  let sum = (n*(n+1))/2
  return sum
}

// The time complexity of factorial using recursion is O(N)
// The space complexity using recursion is O(N)
// Uses stack memory to store local variables and parameters
// Much slower than iteration due to the overhead of function calls and control shift from one function to another
function sum_to_n_c(n:number): number {
  if (n > 0) {
    return (n + sum_to_n_c(n - 1))
  } else { return 0 }
}

const num= 10
console.log(`sum_a of first ${num} numbers = ${sum_to_n_a(num)}`)
console.log(`sum_b of first ${num} numbers = ${sum_to_n_b(num)}`)
console.log(`sum_c of first ${num} numbers = ${sum_to_n_c(num)}`)