const bar = document.getElementById('bar')
const close = document.getElementById('close')
const nav = document.getElementById('navbar')
if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}
function updateSubtotal(input) {
    var row = input.parentNode.parentNode; // Lấy thẻ cha (row) của trường input
    var priceCell = row.cells[3]; // Ô chứa giá sản phẩm
    var subtotalCell = row.cells[5]; // Ô chứa tổng giá trị

    var price = parseFloat(priceCell.innerText.replace('$', '')); // Lấy giá sản phẩm và chuyển sang số thực
    var quantity = parseInt(input.value); // Lấy số lượng sản phẩm
    if (quantity < 0) {
        input.value = 0;
        quantity = 0;
    }
    var subtotal = price * quantity; // Tính toán tổng giá trị

    subtotalCell.innerText = '$' + subtotal.toFixed(2); // Cập nhật tổng giá trị mới

    calculateTotals();
}
function calculateTotals() {
    var cartSubtotal = 0;
    var subtotalCells = document.querySelectorAll("#cart tbody tr td:nth-child(6)");
    for (var i = 0; i < subtotalCells.length; i++) {
        var subtotalText = subtotalCells[i].innerText;
        var subtotalValue = parseFloat(subtotalText.replace('$', ''));
        cartSubtotal += subtotalValue;
    }

    var cartSubtotalCell = document.querySelector("#subtotal table tr:first-child td:last-child");
    cartSubtotalCell.innerText = "$ " + cartSubtotal.toFixed(2);

    var totalAmountCell = document.querySelector("#subtotal table tr:last-child td:last-child");
    totalAmountCell.innerText = "$ " + cartSubtotal.toFixed(2);
}

// Lắng nghe sự kiện nhập input
var quantityInputs = document.querySelectorAll("#cart tbody tr td:nth-child(5) input[type='number']");
for (var i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener('input', function () {
        updateSubtotal(this);
    });
}

calculateTotals();
