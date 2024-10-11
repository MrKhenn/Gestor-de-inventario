// Arreglo para almacenar los productos
let inventory = [];

// Función para agregar un producto
function addProduct() {
    const name = document.getElementById('productName').value.trim();
    const quantity = parseInt(document.getElementById('productQuantity').value);

    // Verifica si los campos están completos y la cantidad es válida
    if (name === "" || isNaN(quantity) || quantity <= 0) {
        alert("Por favor, ingresa un nombre de producto y una cantidad válida.");
        return;
    }

    // Verifica si el producto ya existe
    const existingProduct = inventory.find(product => product.name.toLowerCase() === name.toLowerCase());

    if (existingProduct) {
        existingProduct.quantity += quantity;
        alert(`Cantidad de ${name} actualizada.`);
    } else {
        inventory.push({ name, quantity });
        alert(`${name} agregado al inventario.`);
    }

    updateInventoryDisplay();
    clearForm();
}

// Función para actualizar la cantidad de un producto
function updateProductQuantity() {
    const name = document.getElementById('updateProductName').value.trim();
    const newQuantity = parseInt(document.getElementById('updateProductQuantity').value);

    if (name === "" || isNaN(newQuantity) || newQuantity < 0) {
        alert("Por favor, ingresa un nombre de producto y una cantidad válida.");
        return;
    }

    const productToUpdate = inventory.find(product => product.name.toLowerCase() === name.toLowerCase());

    if (productToUpdate) {
        productToUpdate.quantity = newQuantity;

        if (newQuantity === 0) {
            inventory = inventory.filter(product => product.quantity > 0);
            alert(`${name} ha sido eliminado del inventario por falta de stock.`);
        } else {
            alert(`Cantidad de ${name} actualizada a ${newQuantity}.`);
        }

        updateInventoryDisplay();
        clearUpdateForm();
    } else {
        alert(`El producto ${name} no existe en el inventario.`);
    }
}

// Función para actualizar la visualización del inventario
function updateInventoryDisplay() {
    const productList = document.getElementById('productList');
    const emptyMessage = document.getElementById('emptyMessage');
    
    productList.innerHTML = "";

    if (inventory.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";

        inventory.forEach((product, index) => {
            const li = document.createElement('li');
            li.className = 'product-item';
            li.innerHTML = `
                ${product.name} - Cantidad: ${product.quantity} 
                <button class="delete-btn" onclick="removeProduct(${index})">Eliminar</button>
            `;
            productList.appendChild(li);
        });
    }
}

// Función para eliminar productos
function removeProduct(index) {
    inventory.splice(index, 1);
    updateInventoryDisplay();
}

// Limpiar formularios
function clearForm() {
    document.getElementById('productName').value = "";
    document.getElementById('productQuantity').value = "";
}

function clearUpdateForm() {
    document.getElementById('updateProductName').value = "";
    document.getElementById('updateProductQuantity').value = "";
}
