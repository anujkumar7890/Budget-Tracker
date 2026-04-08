const balance = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  const transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);
  updateUI();

  text.value = "";
  amount.value = "";
}

// Update UI
function updateUI() {
  list.innerHTML = "";

  let amounts = transactions.map(t => t.amount);

  let total = amounts.reduce((acc, item) => acc + item, 0);
  let income = amounts.filter(a => a > 0).reduce((acc, a) => acc + a, 0);
  let expense = amounts.filter(a => a < 0).reduce((acc, a) => acc + a, 0);

  balance.innerText = `₹${total}`;
  incomeEl.innerText = `₹${income}`;
  expenseEl.innerText = `₹${Math.abs(expense)}`;

  transactions.forEach(addToList);
}

// Add to list
function addToList(transaction) {
  const li = document.createElement("li");

  li.classList.add(transaction.amount > 0 ? "income" : "expense");

  li.innerHTML = `
    ${transaction.text} 
    <span>₹${transaction.amount}</span>
    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">x</button>
  `;

  list.appendChild(li);
}

// Delete transaction
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateUI();
}

form.addEventListener("submit", addTransaction);