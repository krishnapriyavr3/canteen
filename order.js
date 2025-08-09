fetch('menu.json')
  .then(response => response.json())
  .then(data => {
    document.getElementById('date').textContent = `Menu for ${data.date}`;
    const vegMenu = document.getElementById('veg-menu');
    data.veg.forEach((item, idx) => {
      vegMenu.innerHTML += `
        <div class="card">
          <img src="${item.photo}" alt="${item.item}">
          <div class="card-details">
            <h3>${item.item}</h3>
            <p class="price">${item.price}</p>
            <p class="calories">${item.calories}</p>
            <label>
              Qty:
              <input type="number" min="1" max="10" value="1" id="qty${idx}">
            </label>
            <button class="order-btn" onclick="placeOrder('${item.item}', document.getElementById('qty${idx}').value)">Place Order</button>
          </div>
        </div>
      `;
    });
  });

function placeOrder(item, qty) {
  const orders = JSON.parse(localStorage.getItem('order') || '[]');
  orders.push({ name: item, qty: qty });
  localStorage.setItem('order', JSON.stringify(orders));
  alert(`Order placed for ${qty} x ${item}!`);
}