// ==========================================
// SpendWise - Budgeting Application Logic
// ==========================================


// 2. Store Application Data & 3. Collect User Input
// We use prompt() to get user input and parseFloat() to convert the string input into numbers for math calculations.

const totalBudgetInput = prompt("Welcome to SpendWise! Please enter your total budget for this month:");
const totalBudget = parseFloat(totalBudgetInput) || 0;

const expense1Name = prompt("Enter the name of your first expense (e.g., Rent, Groceries):") || "Expense 1";
const expense1AmountInput = prompt(`Enter the amount for ${expense1Name}:`);
const expense1Amount = parseFloat(expense1AmountInput) || 0;

const expense2Name = prompt("Enter the name of your second expense (e.g., Utilities, Transportation):") || "Expense 2";
const expense2AmountInput = prompt(`Enter the amount for ${expense2Name}:`);
const expense2Amount = parseFloat(expense2AmountInput) || 0;


// 5. Create Reusable Functions
/**
 * Calculates the total of the provided expenses.
 * @param {number} exp1 - The first expense amount
 * @param {number} exp2 - The second expense amount
 * @returns {number} The sum of the expenses
 */
function calculateTotalExpenses(exp1, exp2) {
    return exp1 + exp2;
}

/**
 * Calculates the remaining balance after deducting expenses from the budget.
 * @param {number} budget - The total starting budget
 * @param {number} totalExpenses - The sum of all expenses
 * @returns {number} The remaining balance
 */
function calculateRemainingBalance(budget, totalExpenses) {
    return budget - totalExpenses;
}


// 4. Perform Budget Calculations
// Calling the reusable functions to process the data
const totalExpenses = calculateTotalExpenses(expense1Amount, expense2Amount);
const remainingBalance = calculateRemainingBalance(totalBudget, totalExpenses);


// 6. Display Results
// Outputting the formatted results to the browser console
console.log("====================================");
console.log("       SPENDWISE BUDGET REPORT      ");
console.log("====================================");
console.log(`Total Budget:      $${totalBudget.toFixed(2)}`);
console.log("------------------------------------");
console.log(`Expenses Breakdown:`);
console.log(`- ${expense1Name}: $${expense1Amount.toFixed(2)}`);
console.log(`- ${expense2Name}: $${expense2Amount.toFixed(2)}`);
console.log(`Total Expenses:    $${totalExpenses.toFixed(2)}`);
console.log("------------------------------------");
console.log(`Remaining Balance: $${remainingBalance.toFixed(2)}`);
console.log("====================================");

// Extra feature: Simple status message based on the remaining balance
if (remainingBalance < 0) {
    console.log("Warning: You are currently over budget!");
} else if (remainingBalance === 0) {
    console.log("Notice: You have exactly reached your budget limit.");
} else {
    console.log("Great job! You are within your budget.");
}