class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <nav class="topnav">
      <a href="home.html">Home</a>
      <a href="clientes.html">Clientes</a>
      <a href="produto.html">Produtos</a>
      <a href="pedidos.html">Pedidos</a>
      <a href="javascript:void(0);" class="icon">
          <span class="line"></span>
          <span class="line"></span>
          <span class="line"></span>
      </a>
    </nav>`;
  }
}

customElements.define('main-header', Header);