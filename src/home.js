window.onload = function (e) {
    
    var link = document.querySelector('.topnav a[href=\'home.html\']');
    link.className = 'active';

    var usuarioGuid = localStorage.getItem("usuarioGuid");

    if (usuarioGuid == null) {
        window.location.href = "login.html";
    }
    else {
        obterUsuario(usuarioGuid);
    }

    var lnkSair = document.getElementById("lnkSair");

    lnkSair.onclick = function (e) {

        localStorage.removeItem("usuarioGuid");

        window.location.href = "login.html";
    };

    var icon = document.querySelector(".icon");

    icon.onclick = function (e) {

        var menu = document.querySelector(".topnav");

        if (menu.className == "topnav") {
            menu.className += " open";
        }
        else {
            menu.className = "topnav";
        }
    }

    function obterUsuario(usuarioGuid) {
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {

                var result = JSON.parse(this.responseText);

                if (result.sucesso) {

                    var mensagem = "Bem-vindo ao sitema " + result.nome + "!";

                    document.getElementById("spnMensagem").innerHTML = mensagem;
                }
                else {
                    //window.location.href = "login.html";
                }
            }
        });

        xhr.open("GET", "http://localhost:58735/api/usuario/obterUsuario?usuarioGuid=" + usuarioGuid);

        xhr.send();
    }
}
