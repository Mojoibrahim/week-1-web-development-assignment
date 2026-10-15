# SpendWise - Dashboard Shell

SpendWise is a responsive, modern personal finance dashboard shell built with HTML5 and CSS3. It serves as the visual foundation for tracking income, expenses, and financial health.

## Layout & Design Architecture

The dashboard is built using modern CSS layout techniques without relying on absolute positioning or external frameworks:

1. **CSS Grid (Page Layout)**: Used for the primary structure (`.dashboard-container`), creating a 2-column layout (Sidebar + Main Content area) on desktop screens.
2. **CSS Grid (Category Cards)**: Dynamically places financial category cards in an auto-fitting grid layout (`repeat(auto-fit, minmax(180px, 1fr))`).
3. **Flexbox**: Powers content alignment within the sidebar, header card, category cards, and the expense input form.
4. **CSS Custom Properties (Variables)**: Standardizes colors, fonts, shadows, and spacing across the application in the `:root` selector.
5. **Dark Mode Support**: Uses `@media (prefers-color-scheme: dark)` to automatically update CSS variables when system dark mode is enabled.
6. **Responsive Design**: Collapses into a single-column stacked layout on screens under `768px`.

## Page Components & Functionality

### 1. Sidebar Navigation (`<aside class="sidebar">`)
* **Purpose**: Primary navigation menu for the web application.
* **Details**: Arranges logo/branding and page links (`Dashboard`, `Transactions`, `Budgets`, `Reports`, `Settings`) vertically using Flexbox. Converts to a horizontal wrap layout on small mobile screens.

### 2. Dashboard Header (`<header class="header-card">`)
* **Purpose**: Top banner introducing the current view.
* **Details**: Displays the SpendWise logo icon, page title ("My Budget Tracker"), and a short description.

### 3. Financial Category Cards (`<section class="dashboard-cards">`)
* **Purpose**: High-level financial summary at a glance.
* **Details**: Contains 6 static cards representing key expense and savings categories (*Food*, *Transport*, *Rent*, *Entertainment*, *Savings*, *Utilities*).
* **Micro-interactions**: Features a sub-250ms lift animation (`translateY(-4px)`), elevated box-shadow, and focus ring when hovered or navigated using the keyboard (`tabindex="0"`).

### 4. Add Expense Section (`<section class="add-expense">`)
* **Purpose**: Interface for entering new financial records.
* **Details**:
  * **Collapsible Guide**: Uses HTML `<details>` and `<summary>` tags to give users step-by-step instructions on recording expenses without cluttering the screen.
  * **Form Controls**: Flexbox-aligned form inputs for Expense Name, Amount, Category dropdown, and Transaction Date.

### 5. Expense History Table (`<section class="your-expense">`)
* **Purpose**: Detailed list of recent transactions.
* **Details**: Features a clean HTML `<table>` with alternating row colors, table headers, and hover highlights. Wrapped in a responsive overflow container for smaller devices.

### 6. Video Tips Section (`<section class="video-section">`)
* **Purpose**: Educational area for financial literacy.
* **Details**: Houses an embedded YouTube iframe video featuring budgeting tips for users.


## How to Run
1. Open `index.html` directly in any standard web browser.
2. Toggle device view in DevTools to test responsiveness below 768px.
3. Switch your OS theme to dark mode to test auto-theming.


# SpendWise - Budgeting Application

## Project Overview

**1. What your SpendWise project does**  
SpendWise is a foundational personal finance application that helps users track their monthly spending. It takes a user's total budget and specific expenses, calculates how much money has been spent, and outputs a detailed summary report in the console that clearly displays the user's remaining balance.

## Technical Details

**2. The JavaScript concepts implemented**  
The code implements several core JavaScript concepts, including variable declaration using `const`, data type conversion (using `parseFloat` to turn strings into numbers), browser interaction methods (`prompt()`), arithmetic operators (`+`, `-`), function declaration and invocation, string interpolation using template literals (backticks), and basic conditional logic (`if/else`) for outputting dynamic status messages.

**3. How variables are being used**  
Variables act as temporary storage containers throughout the application's lifecycle. They store the initial raw text typed by the user (`totalBudgetInput`), the parsed numeric versions of that text (`totalBudget`), the names of the expenses, and the final calculated totals (`totalExpenses`, `remainingBalance`). This allows the script to reference, pass around, and display the data at different stages.

**4. How user input is collected**  
User input is collected dynamically via the browser using the built-in `prompt()` method, which triggers popup dialog boxes asking the user for specific information. Because `prompt()` always captures data as a string (text), `parseFloat()` is immediately used to convert the inputted numbers into actual floating-point numeric values so they can be accurately used in mathematical operations. 

**5. How calculations are performed**  
Calculations are executed using standard mathematical operators applied to the numeric variables. The addition operator (`+`) is used to sum the individual expense amounts together to find the total spending. Then, the subtraction operator (`-`) is used to deduct that total expense amount from the initial total budget to establish the remaining balance.

**6. How functions help organize the code**  
Functions (`calculateTotalExpenses` and `calculateRemainingBalance`) encapsulate the mathematical logic into distinct, reusable blocks. By moving the "math" out of the main flow of the script, the code becomes modular and much easier to read. It separates the data collection phase from the calculation phase. If the app needs to be expanded later (for example, adding a loop to accept 10 expenses instead of 2), the core calculation logic inside the functions won't need to be rewritten.

## Project Overview & Weekly Progress

### Improvements Made to SpendWise
This week, SpendWise was updated from a static layout into a fully interactive, data-driven budgeting web application. Key enhancements include:
* **Dynamic Expense Tracking:** Users can now add new expenses via an interactive form and remove them on demand.
* **Live Financial Summary:** Total budget, total spent, and remaining balance calculate automatically with every update.
* **Visual Status Alerts:** Context-aware feedback banners display immediately to warn users if they approach or exceed their budget limit.
* **Persistent DOM Rendering:** Expense records and summary statistics are generated and updated directly in the browser interface without page reloads.

---

### Key Technical Concepts Implemented

#### 1. Conditional Logic (`if / else`)
Conditional statements evaluate the user's financial state to deliver real-time visual feedback:
* **Budget Status Evaluation:** The application compares the remaining balance against the overall budget:
  * **Exceeded:** Triggers a red alert banner (`.danger`) warning the user that they have overspent.
  * **Warning Threshold:** Triggers a yellow warning banner (`.warning`) when remaining funds fall to 20% or less of the total budget.
  * **On Track:** Displays a green confirmation banner (`.success`) when spending remains within normal limits.
* **Input Validation:** Conditionals ensure that negative amounts, empty names, or invalid budget values cannot corrupt the application state.

#### 2. Array Storage & Data Processing
Instead of keeping separate variables for each line item, SpendWise manages all financial records using JavaScript arrays and objects:
* **Data Structure:** Expenses are stored in a central array (`expenses = []`), where each entry is an object containing `id`, `name`, `amount`, and `category`.
* **Collection Operations:**
  * `.push()` adds new expense records dynamically upon form submission.
  * `.filter()` removes specific items by matching unique `id` values when a user clicks a delete button.
* **Loop Iteration:** Standard loops iterate through the `expenses` array to sum up costs for the dashboard summary and render each record into the user interface.

#### 3. Dynamic DOM Manipulation
The Document Object Model (DOM) is updated programmatically to ensure the browser displays fresh data immediately:
* **Element Selection:** `document.getElementById()` captures key UI targets such as total displays, form inputs, and container elements.
* **Content & Style Updates:** `.textContent` updates dollar amounts across the dashboard summary, while `.classList` toggles display states and alert color themes (`.success`, `.warning`, `.danger`, `.hidden`).
* **Node Generation:** `document.createElement()` and `.appendChild()` dynamically construct structured HTML list items (`<li>`) for each stored expense record.

#### 4. Event-Driven User Interactions
SpendWise relies on event listeners to seamlessly bridge user input with application logic:
* **Form Submissions (`submit`):** Event listeners attached to the budget and expense forms trigger on user submission. Calling `e.preventDefault()` stops default browser reloads and redirects control to JavaScript handling functions.
* **Dynamic Action Triggers (`click`):** Action handlers bound to element buttons enable real-time deletion of individual records, immediately recalculating dashboard totals upon execution.

---

### Challenges Encountered & Resolutions

* **Challenge — Page Reloading on Form Submit:** Submitting forms initially caused the browser to reload, resetting all stored array data and display values.
  * *Resolution:* Applied `e.preventDefault()` inside form event listeners to prevent the default browser refresh and allow JavaScript to manage updates in memory.
* **Challenge — Duplicate Records and Stale UI:** Re-rendering the expense list appended new items onto older elements, creating duplicate entries on the page.
  * *Resolution:* Cleared the target element container (`expenseList.innerHTML = ''`) at the beginning of the render function before iterating through the array to generate fresh elements.
* **Challenge — String Concatenation in Calculations:** Numeric input values retrieved from DOM elements were treated as text strings, leading to incorrect string concatenation instead of mathematical addition.
  * *Resolution:* Wrapped raw input values with `parseFloat()` to guarantee mathematical operations execute on valid floating-point numbers.