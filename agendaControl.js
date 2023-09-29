// Arquivo main.js
const vetContatos = [];
const salvarContatoBtn = document.getElementById('salvar-contato');
const tabelaContatos = document.querySelector('#lista-contatos tbody');

const inputs = {
  nome: document.getElementById('nome'),
  email: document.getElementById('email'),
  telefone: document.getElementById('telefone'),
  endereco: document.getElementById('endereco'),
  cpf: document.getElementById('cpf'),
  dataNascimento: document.getElementById('dataNascimento')
};

document.getElementById('adicionar-contato').addEventListener('click', acrescentarContato);

document.getElementById('btPesquisar').addEventListener('click', pesquisarContato);

function acrescentarContato() {
  const { nome, email, telefone, endereco, cpf, dataNascimento } = inputs;
  if (Object.values(inputs).some(input => input.value === '')) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }
  const novoContato = {
    nome: nome.value,
    email: email.value,
    telefone: telefone.value,
    endereco: endereco.value,
    cpf: cpf.value,
    dataNascimento: dataNascimento.value
  };
  vetContatos.push(novoContato);
  alert(`Contato ${nome.value} adicionado com sucesso.`);
  limparCampos();
  atualizarTabelaContatos();
}



function pesquisarContato() {
  const termoPesquisa = document.getElementById('inPesquisar').value.toLowerCase();
  const resultados = vetContatos.filter(contato => contato.nome.toLowerCase().includes(termoPesquisa));
  atualizarTabelaContatos(resultados);
}


function atualizarTabelaContatos() {
  tabelaContatos.innerHTML = '';
  vetContatos.forEach((contato, index) => {
    const row = tabelaContatos.insertRow();

    Object.values(contato).forEach(value => {
      const cell = row.insertCell();
      cell.textContent = value;
    });

    const cellAcoes = row.insertCell();
    const botaoEditar = criarBotao('Editar', () => editarContato(index));
    const botaoExcluir = criarBotao('Excluir', () => excluirContato(index));

    cellAcoes.appendChild(botaoEditar);
    cellAcoes.appendChild(botaoExcluir);
  });
}


function criarBotao(texto, callback) {
  const botao = document.createElement('button');
  botao.textContent = texto;
  botao.addEventListener('click', callback);
  botao.classList.add('botao'); // Adiciona uma classe chamada 'botao' aos botões
  return botao;
}

function editarContato(index) {
  const contato = vetContatos[index];
  Object.entries(inputs).forEach(([key, input]) => {
    input.value = contato[key];
  });
}

function excluirContato(index) {
  if (confirm("Tem certeza de que deseja excluir este contato?")) {
    vetContatos.splice(index, 1);
    atualizarTabelaContatos();
  }
}

function limparCampos() {
  Object.values(inputs).forEach(input => {
    input.value = '';
  });
}
