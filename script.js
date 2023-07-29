// Function to add an expense
function addExpense(name, amount) {
    const expenseList = document.getElementById('expenseList');
  
    // Create a new expense item
    const expenseItem = document.createElement('div');
    expenseItem.classList.add('expense-item');
    expenseItem.innerHTML = `
      <span class="expense-name">${name}</span>
      <span class="expense-amount">${amount}</span>
    `;
  
    expenseList.appendChild(expenseItem);
  
    // Update total expense
    updateTotalExpense(amount);
  }
  
  // Function to update the total expense
  function updateTotalExpense(amount) {
    const totalElement = document.getElementById('totalExpense');
    const currentTotal = parseFloat(totalElement.textContent) || 0;
  
    const newTotal = currentTotal + parseFloat(amount);
    totalElement.textContent = newTotal.toFixed(2);
  }
  
  // Function to handle form submission
  function handleFormSubmit(event) {
    event.preventDefault();
  
    const expenseNameInput = document.getElementById('expenseName');
    const expenseAmountInput = document.getElementById('expenseAmount');
  
    const expenseName = expenseNameInput.value;
    const expenseAmount = parseFloat(expenseAmountInput.value);
  
    if (!expenseName || isNaN(expenseAmount) || expenseAmount <= 0) {
      alert('Please enter a valid expense name and amount.');
      return;
    }
  
    addExpense(expenseName, expenseAmount);
  
    // Clear input fields
    expenseNameInput.value = '';
    expenseAmountInput.value = '';
  
    // Save the expense data to local storage
    saveExpenseData(expenseName, expenseAmount);
  }
  
  // Function to save expense data to local storage
  function saveExpenseData(name, amount) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    expenses.push({ name, amount });
  
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }
  
  // Function to load saved expense data from local storage
  function loadExpenseData() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
    expenses.forEach((expense) => {
      addExpense(expense.name, expense.amount);
    });
  }
  
  // Add event listener to the form for submitting expenses
  document.getElementById('expenseForm').addEventListener('submit', handleFormSubmit);
  
  // Load saved expense data when the app starts
  loadExpenseData();
  