window.onload = function (e) {

    
    var link = document.querySelector('.topnav a[href=\'produto.html\']');
    link.className = 'active';

    var usuarioGuid = localStorage.getItem("usuarioGuid");

    if (usuarioGuid == null) {
        window.location.href = "login.html";
    }

    var txtNomeProduto = document.getElementById("txtNomeProduto");

    txtNomeProduto.focus();

    var form = document.getElementById("frmCadastro");

    form.onsubmit = function (e) {

        e.preventDefault();

        var nomeProduto = txtNomeProduto.value;

        var codigoProduto = document.getElementById("txtCodigoProduto").value;

        var preco = document.getElementById("txtPreco").value;

        var qtdeEstoque = document.getElementById("txtQtdeEstoque").value;

        if (nomeProduto == "" ||
            codigoProduto == "" ||
            preco == "" ||
            qtdeEstoque == "") {

            var mensagem = "Os campos acima são obrigatórios.";

            exibirMensagemErro(mensagem);
        }
        else {
            fazerCadastro(nomeProduto, codigoProduto, preco, qtdeEstoque);
        }
    };

    function fazerCadastro(nomeProduto, codigoProduto, preco, qtdeEstoque) {

        var data = JSON.stringify({
            "nome": nomeProduto,
            "codigo": codigoProduto,
            "preco": parseFloat(preco),
            "qtdeEstoque": parseInt(qtdeEstoque)
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var result = JSON.parse(this.responseText);

                if (result.sucesso)
                {
                    alert('Cadastro realizado com sucesso');

                    window.location.href = "home.html";
                }
                else {
                    exibirMensagemErro(result.mensagem);
                }
            }
        });

        xhr.open("POST", "http://localhost:58735/api/produto/cadastro");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }

    function exibirMensagemErro(mensagem) {
        var spnErro = document.getElementById("spnErro");

        spnErro.innerText = mensagem;

        spnErro.style.display = "block";

        setTimeout(function () {
            spnErro.style.display = "none";
        }, 5000);

    }
}