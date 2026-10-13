document.addEventListener("DOMContentLoaded", function () {

  // Trocar imagem do produto
  document.querySelectorAll(".thumb").forEach(function (botao) {
    botao.onclick = function () {
      document.getElementById("mainProductImage").src =
        botao.querySelector("img").src;
    };
  });

  // Ampliar imagem
  document.getElementById("zoomButton").onclick = function () {
    window.open(
      document.getElementById("mainProductImage").src,
      "_blank"
    );
  };

  // Pesquisar produto
  document.getElementById("searchInput").oninput = function () {
    let termo = this.value.toLowerCase();
    let conteudo = document.getElementById("produto").innerText;

    document.getElementById("searchStatus").innerText =
      conteudo.toLowerCase().includes(termo) || termo === ""
        ? "Produto encontrado na ficha."
        : "Nenhum resultado encontrado.";
  };

  // Salvar observações no navegador
  document.getElementById("saveNotes").onclick = function () {
    let notas = document.getElementById("productionNotes").value;

    localStorage.setItem("observacoes", notas);

    document.getElementById("notesStatus").innerText =
      "Observações salvas!";
  };

  // Recuperar observações salvas
  document.getElementById("productionNotes").value =
    localStorage.getItem("observacoes") || "";

  // Exportar especificações para CSV
  document.getElementById("exportSpecs").onclick = function () {
    let texto = "Campo;Valor\n";

    document.querySelectorAll("#spec-content tbody tr").forEach(function (linha) {
      let colunas = linha.querySelectorAll("th, td");

      texto += colunas[0].innerText + ";" +
               colunas[1].innerText + "\n";
    });

    let arquivo = new Blob(["\uFEFF" + texto], {
      type: "text/csv;charset=utf-8;"
    });

    let link = document.createElement("a");
    link.href = URL.createObjectURL(arquivo);
    link.download = "especificacoes.csv";
    link.click();

    URL.revokeObjectURL(link.href);
  };

});