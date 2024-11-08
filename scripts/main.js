// Função para abrir o modal de cadastro
function openSignupModal() {
    document.getElementById('signupModal').style.display = 'flex';
}

// Função para fechar o modal de cadastro
function closeSignupModal() {
    document.getElementById('signupModal').style.display = 'none';
}

// Função para verificar se o formulário foi preenchido corretamente e salvar os dados
function submitForm(event) {
    event.preventDefault(); // Evitar o envio do formulário

    // Pegar os dados dos campos
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Verificar se as senhas são iguais
    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }

    // Criar um objeto com os dados do usuário
    const userData = {
        name: name,
        email: email,
        password: password
    };

    // Salvar os dados no localStorage
    localStorage.setItem('user', JSON.stringify(userData));

    // Exibir mensagem de sucesso
    alert('Cadastro realizado com sucesso!');

    // Fechar o modal
    closeSignupModal();
}

// Verificar se o usuário já está cadastrado (opcional)
function checkUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        console.log('Usuário cadastrado:', user);
    } else {
        console.log('Nenhum usuário encontrado.');
    }
}

// Chamar a função para verificar o usuário
checkUser();

// Função para alternar a visibilidade do menu
function toggleMenu() {
    const navbar = document.getElementById('navbar'); // Obtém o elemento <nav>

    // Verifica se o menu está visível ou não
    if (navbar.style.display === 'block') {
        navbar.style.display = 'none'; // Se visível, esconde o menu
    } else {
        navbar.style.display = 'block'; // Caso contrário, exibe o menu
    }
}

// Função para mostrar detalhes do produto
function showProductDetails(product) {
    const productModal = document.createElement('div');
    productModal.classList.add('product-modal');
    productModal.innerHTML = `
        <div class="modal-content">
            <h3>${product.name}</h3>
            <p>Preço: ${product.price} Reais</p>
            <button onclick="addToCart(${JSON.stringify(product)})">Adicionar ao Carrinho</button>
        </div>
    `;
    document.body.appendChild(productModal);
    // Fecha o modal de produto ao clicar fora
    productModal.addEventListener('click', () => {
        productModal.remove();
    });
}

// Função para adicionar um produto ao carrinho
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Produto adicionado ao carrinho!');
    closeProductModal();  // Fecha o modal de produto após adicionar ao carrinho
}

// Função para abrir o modal de carrinho e exibir os itens
function openCartModal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsList = document.getElementById('cartItemsList');
    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p>Seu carrinho está vazio!</p>';
    } else {
        cart.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('cart-item');
            productItem.innerHTML = `
                <p><strong>${product.name}</strong> - ${product.price} Reais</p>
            `;
            cartItemsList.appendChild(productItem);
        });
    }

    document.getElementById('cartModal').style.display = 'flex';
}

// Função para fechar o modal do carrinho
function closeCartModal() {
    document.getElementById('cartModal').style.display = 'none';
}

// Função para finalizar a compra (placeholder)
function checkout() {
    alert('Finalizando compra...');
    localStorage.removeItem('cart');  // Limpa o carrinho após o checkout
    closeCartModal();
}

// Função para adicionar evento de clique nas imagens dos produtos
document.querySelectorAll('.product img').forEach(img => {
    img.addEventListener('click', () => {
        const productName = img.alt;
        const productPrice = img.parentElement.querySelector('.product-price').innerText;
        const product = {
            name: productName,
            price: productPrice.replace(' Reais', '') // Remove " Reais" do preço
        };
        showProductDetails(product);
    });
});

// Adiciona o evento de clique no ícone de carrinho para abrir o modal
document.querySelector('.navbar .nav-icon-container img:first-child').addEventListener('click', openCartModal);

// Função para rolar suavemente até a seção de produtos
function scrollToProducts() {
    const produtosSection = document.getElementById('produtos'); // Obtém a seção de produtos
    produtosSection.scrollIntoView({ behavior: 'smooth' }); // Rola até a seção com animação suave
}
