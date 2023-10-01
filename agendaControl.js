const vetContatos = [
  {
    nome: "Alice",
    email: "alice@email.com",
    telefone: "111-111-1111",
    endereco: "123 Oak St",
    cpf: "12345678901",
    dataNascimento: "1990-03-15"
  },
  {
    nome: "Bob",
    email: "bob@email.com",
    telefone: "222-222-2222",
    endereco: "456 Maple St",
    cpf: "98765432109",
    dataNascimento: "1985-06-20"
  },
  {
    nome: "Carol",
    email: "carol@email.com",
    telefone: "333-333-3333",
    endereco: "789 Pine St",
    cpf: "55555555555",
    dataNascimento: "1992-11-10"
  },
  // Novo contato
  {
    nome: "David",
    email: "david@email.com",
    telefone: "444-444-4444",
    endereco: "101 Elm St",
    cpf: "77777777777",
    dataNascimento: "1988-04-25"
  },
  // Novo contato
  {
    nome: "Eva",
    email: "eva@email.com",
    telefone: "555-555-5555",
    endereco: "202 Birch St",
    cpf: "88888888888",
    dataNascimento: "1995-09-05"
  }
];

// Seletores dos inputs
const inputs = {
  nome: document.getElementById('nome'),
  email: document.getElementById('email'),
  telefone: document.getElementById('telefone'),
  endereco: document.getElementById('endereco'),
  cpf: document.getElementById('cpf'),
  dataNascimento: document.getElementById('dataNascimento')
};

// Seletores dos elementos HTML
const salvarContatoBtn = document.getElementById('salvar-contato');
const tabelaContatos = document.querySelector('#lista-contatos tbody');
const divResultados = document.querySelector('.outResultados');
const inPesquisar = document.getElementById('inPesquisar');

// Event listeners
document.getElementById('adicionar-contato').addEventListener('click', acrescentarContato);
document.getElementById('mostrar-contatos').addEventListener('click', atualizarTabelaContatos);
document.getElementById('btPesquisar').addEventListener('click', pesquisarContato);
salvarContatoBtn.addEventListener('click', salvarEdicaoContato);
tabelaContatos.addEventListener('click', handleTabelaContatosClick);

// Função para verificar se os campos de entrada estão vazios
function isEmptyInput() {
  for (const key in inputs) {
    if (inputs[key].value.trim() === '') {
      return true; // Retorna true se encontrar um campo vazio
    }
  }
  return false; // Retorna false se todos os campos estiverem preenchidos
}

// Função para adicionar um novo contato
function acrescentarContato() {
  if (isEmptyInput()) {
    const mensagemErro = "Por favor, preencha todos os campos obrigatórios.";
    alert(mensagemErro);
    return;
  }
  const novoContato = {
    nome: inputs.nome.value,
    email: inputs.email.value,
    telefone: inputs.telefone.value,
    endereco: inputs.endereco.value,
    cpf: inputs.cpf.value,
    dataNascimento: inputs.dataNascimento.value
  };
  vetContatos.push(novoContato);
  alert(`Contato ${novoContato.nome} adicionado com sucesso.`);
  limparCampos();
  atualizarTabelaContatos();
}

// Função para pesquisar um contato pelo nome
function pesquisarContato() {
  const campoPesquisa = inPesquisar.value.trim().toLowerCase();
  const resultados = vetContatos.filter(contato => contato.nome.toLowerCase().includes(campoPesquisa));

  if (resultados.length === 0) {
    divResultados.textContent = "Nenhum contato encontrado.";
  } else {
    let informacoesContatos = '';

    resultados.forEach(contato => {
      informacoesContatos += `Nome: ${contato.nome}\n`;
      informacoesContatos += `Email: ${contato.email}\n`;
      informacoesContatos += `Telefone: ${contato.telefone}\n`;
      informacoesContatos += `Endereço: ${contato.endereco}\n`;
      informacoesContatos += `CPF: ${contato.cpf}\n`;
      informacoesContatos += `Data de Nascimento: ${contato.dataNascimento}\n\n`;
    });

    divResultados.textContent = informacoesContatos;
  }
}

// Função para atualizar a tabela de contatos
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

// Função para manipular o clique na tabela de contatos
function handleTabelaContatosClick(event) {
  if (event.target.classList.contains('botao-editar')) {
    const index = event.target.dataset.index;
    editarContato(index);
  } else if (event.target.classList.contains('botao-excluir')) {
    const index = event.target.dataset.index;
    excluirContato(index);
  }
}

// Função para criar botões dinamicamente
function criarBotao(texto, callback, classe) {
  const botao = document.createElement('button');
  botao.textContent = texto;
  botao.addEventListener('click', callback);
  botao.classList.add(classe); // Adiciona a classe especificada aos botões
  return botao;
}

// Função para editar um contato
function editarContato(index) {
  const contato = vetContatos[index];
  Object.entries(inputs).forEach(([key, input]) => {
    input.value = contato[key];
  });

  salvarContatoBtn.style.display = "block";
  salvarContatoBtn.dataset.index = index; // Armazena o índice do contato a ser editado
}

// Função para salvar a edição de um contato
function salvarEdicaoContato(index) {
  const contato = vetContatos[index];
  Object.entries(inputs).forEach(([key, input]) => {
    contato[key] = input.value;
  });

  alert(`Contato ${contato.nome} editado com sucesso.`);
  limparCampos();
  salvarContatoBtn.style.display = "none";
  atualizarTabelaContatos();
}

// Função para excluir um contato
function excluirContato(index) {
  if (confirm("Tem certeza de que deseja excluir este contato?")) {
    vetContatos.splice(index, 1);
    atualizarTabelaContatos();
  }
}

// Função para limpar os campos de entrada
function limparCampos() {
  Object.values(inputs).forEach(input => {
    input.value = '';
  });
}