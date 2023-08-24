const decreaseButton = document.querySelector('.decrease');
const increaseButton = document.querySelector('.increase');
const countInput = document.querySelector('.count');

decreaseButton.addEventListener('click', () => {
  let count = parseInt(countInput.value);
  if (count > 1) {
    count--;
    countInput.value = count;
  }
});

increaseButton.addEventListener('click', () => {
  let count = parseInt(countInput.value);
  count++;
  countInput.value = count;
});

// Khai báo biến chứa URL của API
const apiUrl = '<https://api.storerestapi.com/products/running-sneaker>';

// Hàm lấy dữ liệu sản phẩm từ API
async function getProducts() {
    try {
        // Gửi yêu cầu lấy dữ liệu từ API
        const response = await fetch(apiUrl);
        // Chuyển đổi dữ liệu trả về từ API sang định dạng JSON
        const data = await response.json();
        // Trả về dữ liệu sản phẩm
        return data;
    } catch (error) {
        // Xử lý lỗi khi gọi API
        console.error(error);
    }
}

// Hàm hiển thị thông tin sản phẩm lên trang web
function displayProducts(products) {
    // Tìm phần tử HTML chứa danh sách sản phẩm
    const productContainer = document.querySelector('.menu');
    // Xóa nội dung hiện tại của phần tử HTML chứa danh sách sản phẩm
    productContainer.innerHTML = '';
    // Duyệt qua từng sản phẩm trong danh sách sản phẩm
    for (const product of products) {
        // Tạo một phần tử HTML mới để hiển thị thông tin sản phẩm
        const productElement = document.createElement('div');
        productElement.classList.add('card');
        productElement.innerHTML = `
            <div class="imgProduct">
                <img src="${product.image}" alt="">
            </div>
            <div class="textProduct">
                <h2>${product.name}</h2>
                <h3>${product.description}</h3>
            </div>
            <div class="button">
                <div class="bt1"><a href="./productDetail.html?id=${product.id}">Buy Now</a></div>
                <div class="bt2">${product.price}$</div>
            </div>
        `;
        // Thêm phần tử HTML mới vào phần tử HTML chứa danh sách sản phẩm
        productContainer.appendChild(productElement);
    }
}

// Hàm khởi tạo
async function init() {
    // Lấy dữ liệu sản phẩm từ API
    const products = await getProducts();
    // Hiển thị thông tin sản phẩm lên trang web
    displayProducts(products);
}

// Gọi hàm khởi tạo khi trang web được tải xong
window.addEventListener('load', init);
