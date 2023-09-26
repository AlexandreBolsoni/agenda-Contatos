

import { Contato } from "./contatos.js";

const vetContatos = [];
const adicionarContato = document.getElementById('adicionar-contato');
const tabelaContatos = document.querySelector('#lista-contatos tbody');

const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const telefoneInput = document.getElementById('telefone');
const enderecoInput = document.getElementById('endereco');
const cpfInput = document.getElementById('cpf');
const dataNascimentoInput = document.getElementById('dataNascimento');

adicionarContato.addEventListener('click', acrescentarContato);

function acrescentarContato() {
    const nome = nomeInput.value;
    const email = emailInput.value;
    const telefone = telefoneInput.value.toString(); // Converte para string
    const endereco = enderecoInput.value;
    const cpf = cpfInput.value;
    const dataNascimento = dataNascimentoInput.value;

    if (nome === "" || email === "" || telefone === "" ||
        endereco === "" || cpf === "" || dataNascimento === "") {
        alert("Por favor, preencha todos os campos obrigatórios.");
    } else {
        const novoContato = new Contato(nome, email, telefone, endereco, cpf, dataNascimento);
        const contatoExistente = vetContatos.some(contato => contato.nome === nome);

        if (contatoExistente) {
            alert(`Já existe um contato com o nome ${nome}.`);
        } else {
            // Adicione o novo contato ao array vetContatos
            vetContatos.push(novoContato);
            alert(`Contato ${nome} adicionado com sucesso.`);
        }
    }

    atualizarTabelaContatos();
}

function atualizarTabelaContatos() {
    tabelaContatos.innerHTML = ''; // Limpe a tabela

    // Adicione cada contato à tabela
    vetContatos.forEach(contato => {
        const row = tabelaContatos.insertRow();
        const cellNome = row.insertCell(0);
        const cellEmail = row.insertCell(1);
        const cellTelefone = row.insertCell(2);
        const cellEndereco = row.insertCell(3);
        const cellCPF = row.insertCell(4);
        const cellDataNascimento = row.insertCell(5);

        cellNome.textContent = contato.nome;
        cellEmail.textContent = contato.email;
        cellTelefone.textContent = contato.telefone;
        cellEndereco.textContent = contato.endereco;
        cellCPF.textContent = contato.cpf;
        cellDataNascimento.textContent = contato.dataNascimento;
    });
}


