// Data Storage Keys
const STORAGE_KEYS = {
    MENU_ITEMS: 'menuItems',
    ORDERS: 'orders'
};

// Default Menu Items
const DEFAULT_MENU_ITEMS = [
    { id: 1, name: 'Idly', price: 30, category: 'Breakfast', image: 'https://images.pexels.com/photos/433149/pexels-photo-433149.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
    { id: 2, name: 'Puttu', price: 35, category: 'Breakfast', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
    { id: 3, name: 'Masala Dosa', price: 45, category: 'Breakfast', image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
    { id: 4, name: 'Parotta', price: 25, category: 'Snacks', image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
    { id: 5, name: 'Filter Coffee', price: 15, category: 'Beverages', image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
    { id: 6, name: 'Banana Fritters', price: 20, category: 'Snacks', image: 'https://images.pexels.com/photos/357573/pexels-photo-357573.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
    { id: 7, name: 'Medu Vada', price: 25, category: 'Snacks', image: 'https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
    { id: 8, name: 'Chicken Biryani', price: 120, category: 'Main Course', image: 'https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
    { id: 9, name: 'Fish Curry with Rice', price: 150, category: 'Main Course', image: 'https://images.pexels.com/photos/3147493/pexels-photo-3147493.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
    { id: 10, name: 'Vanilla Ice Cream', price: 50, category: 'Desserts', image: 'https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
    { id: 11, name: 'Paneer Butter Masala', price: 100, category: 'Main Course', image: 'https://images.pexels.com/photos/960983/pexels-photo-960983.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
    { id: 12, name: 'Vegetable Fried Rice', price: 80, category: 'Main Course', image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
    { id: 13, name: 'Chocolate Cake', price: 60, category: 'Desserts', image: 'https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
    { id: 14, name: 'Fresh Orange Juice', price: 40, category: 'Beverages', image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
    { id: 15, name: 'Samosa', price: 15, category: 'Snacks', image: 'https://images.pexels.com/photos/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
    { id: 16, name: 'Butter Chicken', price: 130, category: 'Main Course', image: 'https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
    { id: 17, name: 'Mutton Curry', price: 140, category: 'Main Course', image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
    { id: 18, name: 'Ras Malai', price: 45, category: 'Desserts', image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
    { id: 19, name: 'Lassi', price: 35, category: 'Beverages', image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' },
    { id: 20, name: 'Pakora', price: 30, category: 'Snacks', image: 'https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop' }
];

// State
let cart = [];
let editingItemId = null;
let currentOrderId = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
    initializeEventListeners();
    loadMenuItems();
    updateCartDisplay();
    initializeSalesReport();
});

// Initialize Data - Load default items if not exists
function initializeData() {
    if (!localStorage.getItem(STORAGE_KEYS.MENU_ITEMS)) {
        localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(DEFAULT_MENU_ITEMS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
        localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
    }
}

// Initialize Event Listeners
function initializeEventListeners() {
    // Navigation tabs
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const section = e.target.getAttribute('data-section');
            switchSection(section);
        });
    });

    // Cart toggle
    document.getElementById('cart-toggle').addEventListener('click', toggleCart);
    document.getElementById('close-cart').addEventListener('click', toggleCart);

    // Menu form
    document.getElementById('menu-form').addEventListener('submit', handleMenuFormSubmit);
    document.getElementById('cancel-btn').addEventListener('click', cancelEdit);

    // Cart actions
    document.getElementById('clear-cart-btn').addEventListener('click', clearCart);
    document.getElementById('pay-now-btn').addEventListener('click', openPaymentModal);
    document.getElementById('print-bill-btn').addEventListener('click', printBill);

    // Payment modal
    document.getElementById('close-qr-modal').addEventListener('click', closePaymentModal);
    document.getElementById('cancel-payment-btn').addEventListener('click', closePaymentModal);
    document.getElementById('confirm-payment-btn').addEventListener('click', confirmPayment);

    // Sales report
    document.getElementById('generate-report-btn').addEventListener('click', generateSalesReport);
    
    // Set default month to current month
    const now = new Date();
    const monthString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    document.getElementById('report-month').value = monthString;
}

// Switch Sections
function switchSection(sectionName) {
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === sectionName) {
            btn.classList.add('active');
        }
    });

    // Update sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Load data if needed
    if (sectionName === 'manage') {
        loadManageItems();
    } else if (sectionName === 'sales') {
        generateSalesReport();
    }
}

// ==================== MENU CRUD OPERATIONS ====================

// Load Menu Items
function loadMenuItems() {
    const menuItems = getMenuItems();
    const menuGrid = document.getElementById('menu-grid');
    menuGrid.innerHTML = '';

    if (menuItems.length === 0) {
        menuGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No menu items available. Add items in Manage Menu section.</p>';
        return;
    }

    menuItems.forEach(item => {
        const menuItemElement = createMenuItemElement(item);
        menuGrid.appendChild(menuItemElement);
    });
}

// Create Menu Item Element
function createMenuItemElement(item) {
    const div = document.createElement('div');
    div.className = 'menu-item';

    // Add special background for Idly
    const backgroundClass = item.name === 'Idly' ? 'idly-background' : '';

    div.innerHTML = `
        <div class="menu-item-bg ${backgroundClass}"></div>
        <img src="${item.image || 'https://via.placeholder.com/300x200?text=No+Image'}"
             alt="${item.name}"
             class="menu-item-image"
             onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
        <div class="menu-item-info">
            <div class="menu-item-name">${item.name}</div>
            <div class="menu-item-category">${item.category}</div>
            <div class="menu-item-price">₹${item.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
        </div>
    `;

    div.querySelector('.add-to-cart-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(item.id);
    });

    return div;
}

// Get Menu Items from localStorage
function getMenuItems() {
    const items = localStorage.getItem(STORAGE_KEYS.MENU_ITEMS);
    return items ? JSON.parse(items) : [];
}

// Save Menu Items to localStorage
function saveMenuItems(items) {
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
}

// Handle Menu Form Submit
function handleMenuFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('item-name').value.trim();
    const price = parseFloat(document.getElementById('item-price').value);
    const category = document.getElementById('item-category').value.trim();
    const image = document.getElementById('item-image').value.trim();

    if (!name || price <= 0 || !category) {
        alert('Please fill in all required fields correctly.');
        return;
    }

    const menuItems = getMenuItems();

    if (editingItemId) {
        // Update existing item
        const index = menuItems.findIndex(item => item.id === editingItemId);
        if (index !== -1) {
            menuItems[index] = {
                ...menuItems[index],
                name,
                price,
                category,
                image: image || menuItems[index].image
            };
            saveMenuItems(menuItems);
            cancelEdit();
        }
    } else {
        // Add new item
        const newId = menuItems.length > 0 ? Math.max(...menuItems.map(item => item.id)) + 1 : 1;
        const newItem = {
            id: newId,
            name,
            price,
            category,
            image: image || 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(name)
        };
        menuItems.push(newItem);
        saveMenuItems(menuItems);
        document.getElementById('menu-form').reset();
    }

    loadMenuItems();
    loadManageItems();
}

// Load Manage Items
function loadManageItems() {
    const menuItems = getMenuItems();
    const manageList = document.getElementById('manage-items-list');
    manageList.innerHTML = '';

    if (menuItems.length === 0) {
        manageList.innerHTML = '<p style="text-align: center; color: #999; padding: 2rem;">No items to manage. Add items using the form above.</p>';
        return;
    }

    menuItems.forEach(item => {
        const manageItemElement = createManageItemElement(item);
        manageList.appendChild(manageItemElement);
    });
}

// Create Manage Item Element
function createManageItemElement(item) {
    const div = document.createElement('div');
    div.className = 'manage-item';
    div.innerHTML = `
        <img src="${item.image || 'https://via.placeholder.com/300x200?text=No+Image'}" 
             alt="${item.name}" 
             class="manage-item-image"
             onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
        <div class="manage-item-info">
            <div class="manage-item-name">${item.name}</div>
            <div class="manage-item-details">
                Category: ${item.category} | Price: ₹${item.price.toFixed(2)}
            </div>
        </div>
        <div class="manage-item-actions">
            <button class="btn btn-edit" data-id="${item.id}">Edit</button>
            <button class="btn btn-delete" data-id="${item.id}">Delete</button>
        </div>
    `;

    div.querySelector('.btn-edit').addEventListener('click', () => editMenuItem(item.id));
    div.querySelector('.btn-delete').addEventListener('click', () => deleteMenuItem(item.id));

    return div;
}

// Edit Menu Item
function editMenuItem(id) {
    const menuItems = getMenuItems();
    const item = menuItems.find(item => item.id === id);
    
    if (!item) return;

    editingItemId = id;
    document.getElementById('menu-item-id').value = id;
    document.getElementById('item-name').value = item.name;
    document.getElementById('item-price').value = item.price;
    document.getElementById('item-category').value = item.category;
    document.getElementById('item-image').value = item.image || '';
    document.getElementById('save-btn').textContent = 'Update Item';
    document.getElementById('cancel-btn').style.display = 'inline-block';

    // Scroll to form
    document.querySelector('.manage-form').scrollIntoView({ behavior: 'smooth' });
}

// Delete Menu Item
function deleteMenuItem(id) {
    if (!confirm('Are you sure you want to delete this item?')) {
        return;
    }

    const menuItems = getMenuItems();
    const filteredItems = menuItems.filter(item => item.id !== id);
    saveMenuItems(filteredItems);
    
    loadMenuItems();
    loadManageItems();
}

// Cancel Edit
function cancelEdit() {
    editingItemId = null;
    document.getElementById('menu-form').reset();
    document.getElementById('menu-item-id').value = '';
    document.getElementById('save-btn').textContent = 'Add Item';
    document.getElementById('cancel-btn').style.display = 'none';
}

// ==================== CART FUNCTIONALITY ====================

// Add to Cart
function addToCart(itemId) {
    const menuItems = getMenuItems();
    const item = menuItems.find(item => item.id === itemId);
    
    if (!item) return;

    const existingCartItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingCartItem) {
        existingCartItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: 1
        });
    }

    updateCartDisplay();
    toggleCart(); // Open cart sidebar when item is added
}

// Remove from Cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
}

// Update Quantity
function updateQuantity(itemId, change) {
    const cartItem = cart.find(item => item.id === itemId);
    if (!cartItem) return;

    cartItem.quantity += change;
    
    if (cartItem.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        updateCartDisplay();
    }
}

// Clear Cart
function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('Are you sure you want to clear the cart?')) {
        cart = [];
        updateCartDisplay();
    }
}

// Calculate Cart Total
function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Update Cart Display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    
    cartTotalElement.textContent = calculateCartTotal().toFixed(2);
    cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Cart is empty</p>';
    } else {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const cartItemElement = createCartItemElement(item);
            cartItemsContainer.appendChild(cartItemElement);
        });
    }

    // Enable/disable buttons based on cart state
    const payBtn = document.getElementById('pay-now-btn');
    const printBtn = document.getElementById('print-bill-btn');
    const clearBtn = document.getElementById('clear-cart-btn');
    
    const hasItems = cart.length > 0;
    payBtn.disabled = !hasItems;
    printBtn.disabled = !hasItems;
    clearBtn.disabled = !hasItems;
}

// Create Cart Item Element
function createCartItemElement(item) {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
        <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">₹${item.price.toFixed(2)} each</div>
        </div>
        <div class="cart-item-controls">
            <button class="quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
            <span class="quantity-display">${item.quantity}</span>
            <button class="quantity-btn" data-id="${item.id}" data-action="increase">+</button>
            <button class="remove-item-btn" data-id="${item.id}">Remove</button>
        </div>
    `;

    div.querySelector('[data-action="decrease"]').addEventListener('click', () => updateQuantity(item.id, -1));
    div.querySelector('[data-action="increase"]').addEventListener('click', () => updateQuantity(item.id, 1));
    div.querySelector('.remove-item-btn').addEventListener('click', () => removeFromCart(item.id));

    return div;
}

// Toggle Cart Sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('open');
}

// ==================== ORDER PROCESSING & PAYMENT ====================

// Open Payment Modal
function openPaymentModal() {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }

    const total = calculateCartTotal();
    document.getElementById('payment-total').textContent = total.toFixed(2);

    // Generate QR Code
    generateQRCode(total);

    // Show modal
    document.getElementById('qr-modal').classList.add('show');
}

// Generate QR Code
function generateQRCode(amount) {
    const qrContainer = document.getElementById('qr-code');
    qrContainer.innerHTML = ''; // Clear previous QR code

    // Generate QR code data (payment info)
    const qrData = JSON.stringify({
        amount: amount,
        orderId: `ORDER-${Date.now()}`,
        timestamp: new Date().toISOString()
    });

    // Use QRCode.js library to generate QR code
    QRCode.toCanvas(qrContainer, qrData, {
        width: 256,
        margin: 2,
        color: {
            dark: '#000000',
            light: '#FFFFFF'
        }
    }, (error) => {
        if (error) {
            console.error('QR Code generation error:', error);
            qrContainer.innerHTML = '<p>QR Code generation failed. Please try again.</p>';
        }
    });
}

// Close Payment Modal
function closePaymentModal() {
    document.getElementById('qr-modal').classList.remove('show');
}

// Confirm Payment
function confirmPayment() {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }

    // Generate order ID
    const orderId = `ORDER-${Date.now()}`;
    currentOrderId = orderId;

    // Create order object
    const order = {
        id: orderId,
        items: cart.map(item => ({ ...item })),
        total: calculateCartTotal(),
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date().toISOString()
    };

    // Save order to localStorage
    const orders = getOrders();
    orders.push(order);
    saveOrders(orders);

    // Clear cart
    cart = [];
    updateCartDisplay();

    // Close modal
    closePaymentModal();

    // Show success message
    alert(`Order confirmed! Order ID: ${orderId}\nTotal: ₹${order.total.toFixed(2)}`);

    // Switch to sales report to show the new order
    switchSection('sales');
}

// Get Orders from localStorage
function getOrders() {
    const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return orders ? JSON.parse(orders) : [];
}

// Save Orders to localStorage
function saveOrders(orders) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

// ==================== BILL PRINTING ====================

// Print Bill
function printBill() {
    console.log('Print bill called, cart length:', cart.length);

    if (cart.length === 0) {
        alert('Cart is empty! Please add items to your cart before printing.');
        return;
    }

    // Confirm before printing
    if (!confirm('Are you ready to print the bill? This will open a new window for printing.')) {
        return;
    }

    try {
        const total = calculateCartTotal();
        console.log('Cart total:', total);

        const orderId = `ORDER-${Date.now()}`;
        const date = new Date();

        console.log('Generating bill for order:', orderId);

        // Create order object
        const order = {
            id: orderId,
            items: cart.map(item => ({ ...item })),
            total: total,
            date: date.toISOString().split('T')[0],
            timestamp: date.toISOString()
        };

        // Save order to localStorage
        const orders = getOrders();
        orders.push(order);
        saveOrders(orders);

        // Clear cart
        cart = [];
        updateCartDisplay();

        const subtotal = total;
        const cgst = subtotal * 0.09;
        const sgst = subtotal * 0.09;
        const grandTotal = subtotal + cgst + sgst;

        // Create print content
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Restaurant Bill - ${orderId}</title>
                <style>
                    body {
                        font-family: 'Courier New', monospace;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background: white;
                        line-height: 1.4;
                    }
                    .bill-header {
                        text-align: center;
                        border-bottom: 2px solid #333;
                        padding-bottom: 15px;
                        margin-bottom: 20px;
                    }
                    .bill-logo {
                        margin-bottom: 10px;
                    }
                    .bill-logo img {
                        width: 120px;
                        height: 60px;
                        object-fit: cover;
                        border-radius: 5px;
                        border: 1px solid #ccc;
                    }
                    .bill-header h1 {
                        font-size: 24px;
                        margin: 10px 0;
                        color: #333;
                        font-weight: bold;
                    }
                    .restaurant-details {
                        text-align: center;
                        font-size: 12px;
                        margin-bottom: 10px;
                    }
                    .bill-info {
                        display: flex;
                        justify-content: space-between;
                        font-size: 12px;
                        margin: 10px 0;
                    }
                    .bill-table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 20px 0;
                    }
                    .bill-table th, .bill-table td {
                        border: 1px solid #333;
                        padding: 8px;
                        text-align: left;
                        font-size: 12px;
                    }
                    .bill-table th {
                        background: #f0f0f0;
                        font-weight: bold;
                    }
                    .bill-table .amount {
                        text-align: right;
                    }
                    .bill-totals {
                        margin: 20px 0;
                        font-size: 14px;
                    }
                    .bill-totals div {
                        display: flex;
                        justify-content: space-between;
                        padding: 5px 0;
                    }
                    .bill-total {
                        font-weight: bold;
                        font-size: 16px;
                        border-top: 2px solid #333;
                        border-bottom: 2px solid #333;
                        padding: 10px 0;
                        margin-top: 10px;
                    }
                    .thank-you {
                        text-align: center;
                        margin-top: 20px;
                        font-style: italic;
                        color: #666;
                        font-size: 13px;
                    }
                    .restaurant-info {
                        text-align: center;
                        font-size: 10px;
                        color: #999;
                        margin-top: 15px;
                        border-top: 1px solid #eee;
                        padding-top: 10px;
                    }
                    @media print {
                        body {
                            margin: 0;
                            padding: 15px;
                        }
                        .no-print {
                            display: none;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="bill-header">
                    <div class="bill-logo">
                        <img src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=200&h=100&fit=crop" alt="Restaurant Logo">
                    </div>
                    <h1>RESTAURANT BILL</h1>
                    <div class="restaurant-details">
                        123 Main Street, City, State - 123456<br>
                        Phone: +91-9876543210 | GSTIN: 22AAAAA0000A1Z5
                    </div>
                </div>

                <div class="bill-info">
                    <div><strong>Order ID:</strong> ${orderId}</div>
                    <div><strong>Table:</strong> 1</div>
                </div>
                <div class="bill-info">
                    <div><strong>Date:</strong> ${date.toLocaleDateString()}</div>
                    <div><strong>Time:</strong> ${date.toLocaleTimeString()}</div>
                </div>

                <table class="bill-table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Rate</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map((item, index) => `
                            <tr>
                                <td>${index + 1}</td>
                                <td>${item.name}</td>
                                <td>${item.quantity}</td>
                                <td class="amount">₹${item.price.toFixed(2)}</td>
                                <td class="amount">₹${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <div class="bill-totals">
                    <div><span>Subtotal:</span><span>₹${subtotal.toFixed(2)}</span></div>
                    <div><span>CGST (9%):</span><span>₹${cgst.toFixed(2)}</span></div>
                    <div><span>SGST (9%):</span><span>₹${sgst.toFixed(2)}</span></div>
                    <div class="bill-total"><span>Total Amount:</span><span>₹${grandTotal.toFixed(2)}</span></div>
                </div>

                <div class="thank-you">
                    Thank you for dining with us!<br>
                    We hope to serve you again soon!
                </div>

                <div class="restaurant-info">
                    Restaurant Management System<br>
                    Generated on ${new Date().toLocaleDateString()}
                </div>
            </body>
            </html>
        `;

        // Open print window
        const printWindow = window.open('', '_blank', 'width=450,height=700,scrollbars=yes,resizable=yes');
        if (!printWindow) {
            alert('Please allow pop-ups for this website to print bills.');
            return;
        }

        printWindow.document.write(printContent);
        printWindow.document.close();

        // Wait for content to load then print
        printWindow.onload = function() {
            try {
                console.log('Print window loaded, calling print()');
                printWindow.print();
                console.log('Print dialog opened successfully');
            } catch (error) {
                console.error('Print failed:', error);
                alert('Print failed. Please try again or use Ctrl+P to print manually.');
            }
        };

    } catch (error) {
        console.error('Error generating bill:', error);
        alert('Error generating bill. Please try again.');
    }
}

// ==================== SALES REPORT ====================

// Initialize Sales Report
function initializeSalesReport() {
    const now = new Date();
    const monthString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    document.getElementById('report-month').value = monthString;
}

// Generate Sales Report
function generateSalesReport() {
    const selectedMonth = document.getElementById('report-month').value;
    if (!selectedMonth) {
        alert('Please select a month');
        return;
    }

    const orders = getOrders();
    const [year, month] = selectedMonth.split('-').map(Number);

    // Filter orders by selected month
    const filteredOrders = orders.filter(order => {
        const orderDate = new Date(order.date);
        return orderDate.getFullYear() === year && orderDate.getMonth() + 1 === month;
    });

    // Calculate statistics
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = filteredOrders.length;

    // Item-wise sales
    const itemSales = {};
    filteredOrders.forEach(order => {
        order.items.forEach(item => {
            if (!itemSales[item.name]) {
                itemSales[item.name] = {
                    quantity: 0,
                    revenue: 0
                };
            }
            itemSales[item.name].quantity += item.quantity;
            itemSales[item.name].revenue += item.price * item.quantity;
        });
    });

    // Display report
    displaySalesReport(filteredOrders, totalRevenue, totalOrders, itemSales, selectedMonth);
}

// Display Sales Report
function displaySalesReport(orders, totalRevenue, totalOrders, itemSales, selectedMonth) {
    const reportContent = document.getElementById('sales-report-content');
    
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const [year, month] = selectedMonth.split('-').map(Number);
    const monthName = monthNames[month - 1];

    let html = `
        <div class="sales-summary">
            <h3>Summary for ${monthName} ${year}</h3>
            <div class="sales-summary-item">
                <span>Total Orders:</span>
                <span>${totalOrders}</span>
            </div>
            <div class="sales-summary-item">
                <span>Total Revenue:</span>
                <span>₹${totalRevenue.toFixed(2)}</span>
            </div>
        </div>
    `;

    if (Object.keys(itemSales).length > 0) {
        html += `
            <table class="sales-report-table">
                <thead>
                    <tr>
                        <th>Item Name</th>
                        <th>Quantity Sold</th>
                        <th>Revenue</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // Sort items by revenue (descending)
        const sortedItems = Object.entries(itemSales).sort((a, b) => b[1].revenue - a[1].revenue);

        sortedItems.forEach(([itemName, stats]) => {
            html += `
                <tr>
                    <td>${itemName}</td>
                    <td>${stats.quantity}</td>
                    <td>₹${stats.revenue.toFixed(2)}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;
    } else {
        html += '<p style="text-align: center; color: #999; padding: 2rem;">No sales data for the selected month.</p>';
    }

    // Order details table
    if (orders.length > 0) {
        html += `
            <h3 style="margin-top: 2rem; color: #667eea;">Order Details</h3>
            <table class="sales-report-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Items</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
        `;

        orders.forEach(order => {
            const orderDate = new Date(order.date);
            const formattedDate = orderDate.toLocaleDateString();
            const itemsList = order.items.map(item => `${item.name} (x${item.quantity})`).join(', ');
            
            html += `
                <tr>
                    <td>${order.id}</td>
                    <td>${formattedDate}</td>
                    <td>${itemsList}</td>
                    <td>₹${order.total.toFixed(2)}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;
    }

    reportContent.innerHTML = html;
}

