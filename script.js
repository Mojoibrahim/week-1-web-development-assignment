// ==========================================
// 1. STATE MANAGEMENT (Arrays & Variables)
// ==========================================
// Array to store multiple expense records (Req #2)
let expenses = []; 
let monthlyBudget = 0;

// ==========================================
// 2. DOM ELEMENT REFERENCES (Req #4)
// ==========================================
const budgetForm = document.getElementById('budget-form');
const budgetInput = document.getElementById('monthly-budget-input');

const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategoryInput = document.getElementById('expense-category');

const totalBudgetDisplay = document.getElementById('total-budget-display');
const totalSpentDisplay = document.getElementById('total-spent-display');
const remainingBudgetDisplay = document.getElementById('remaining-budget-display');
const budgetStatusAlert = document.getElementById('budget-status-alert');

const expenseList = document.getElementById('expense-list');

// ==========================================
// 3. CORE COMPUTATION & LOOPS (Req #1, #3)
// ==========================================

// Process expenses using a loop to calculate total spent (Req #3)
function calculateTotalSpent() {
  let total = 0;
  
  // Standard loop iterating through array of objects
  for (let i = 0; i < expenses.length; i++) {
    total += expenses[i].amount;
  }
  
  return total;
}

// Evaluate status using conditional statements (Req #1)
function evaluateBudgetStatus(totalSpent, remaining) {
  budgetStatusAlert.classList.remove('hidden', 'success', 'warning', 'danger');

  if (monthlyBudget === 0) {
    budgetStatusAlert.classList.add('hidden');
    return;
  }

  if (remaining < 0) {
    budgetStatusAlert.textContent = `Warning: You have exceeded your budget by $${Math.abs(remaining).toFixed(2)}!`;
    budgetStatusAlert.classList.add('danger');
  } else if (remaining <= monthlyBudget * 0.2) {
    budgetStatusAlert.textContent = `Caution: You have used over 80% of your budget. Remaining: $${remaining.toFixed(2)}`;
    budgetStatusAlert.classList.add('warning');
  } else {
    budgetStatusAlert.textContent = `On Track: You are within your budget limit. Remaining: $${remaining.toFixed(2)}`;
    budgetStatusAlert.classList.add('success');
  }
}

// ==========================================
// 4. UI MANIPULATION (Req #4)
// ==========================================

// Update the entire dashboard dynamically
function updateDashboard() {
  const totalSpent = calculateTotalSpent();
  const remaining = monthlyBudget - totalSpent;

  // DOM Updates
  totalBudgetDisplay.textContent = `$${monthlyBudget.toFixed(2)}`;
  totalSpentDisplay.textContent = `$${totalSpent.toFixed(2)}`;
  remainingBudgetDisplay.textContent = `$${remaining.toFixed(2)}`;

  // Update visual alerts
  evaluateBudgetStatus(totalSpent, remaining);

  // Render Expense List using array loop
  renderExpenseList();
}

// Render array contents to DOM (Req #3, #4)
function renderExpenseList() {
  expenseList.innerHTML = ''; // Clear existing DOM elements

  if (expenses.length === 0) {
    expenseList.innerHTML = '<li class="expense-item"><span>No expenses recorded yet.</span></li>';
    return;
  }

  // Loop through expenses array to generate DOM nodes
  for (let i = 0; i < expenses.length; i++) {
    const item = expenses[i];

    const li = document.createElement('li');
    li.className = 'expense-item';

    li.innerHTML = `
      <div class="expense-info">
        <strong>${item.name}</strong>
        <span>Category: ${item.category}</span>
      </div>
      <div>
        <span style="font-weight: 700; margin-right: 1rem;">$${item.amount.toFixed(2)}</span>
        <button class="btn btn-danger" onclick="deleteExpense(${item.id})">Delete</button>
      </div>
    `;

    expenseList.appendChild(li);
  }
}

// Delete item by ID and re-process system
function deleteExpense(id) {
  // Filter array to remove item
  expenses = expenses.filter(expense => expense.id !== id);
  // Re-run application logic pipeline
  updateDashboard();
}

// ==========================================
// 5. EVENT LISTENERS (Req #5, #6)
// ==========================================

// Handle Budget Submission
budgetForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent page reload
  
  const inputVal = parseFloat(budgetInput.value);
  if (!isNaN(inputVal) && inputVal >= 0) {
    monthlyBudget = inputVal;
    updateDashboard(); // Trigger logic -> UI pipeline
  }
});

// Handle New Expense Submission
expenseForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);
  const category = expenseCategoryInput.value;

  if (name && !isNaN(amount) && amount > 0) {
    // Construct expense object and push to array storage (Req #2)
    const newExpense = {
      id: Date.now(), // unique timestamp ID
      name: name,
      amount: amount,
      category: category
    };

    expenses.push(newExpense);

    // Reset Form Fields
    expenseNameInput.value = '';
    expenseAmountInput.value = '';

    // Trigger complete data process & UI update (Req #6)
    updateDashboard();
  }
});