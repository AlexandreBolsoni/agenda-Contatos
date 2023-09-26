import { Contato } from "./contatos";

const adicionarContato = document.getElementById('adicionar-contato');
adicionarContato.addEventListener('click', () => {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value.toString(); // Converte para string
    const endereco = document.getElementById('endereco').value;
    const cpf = document.getElementById('cpf').value;
    const dataNascimento = document.getElementById('dataNascimento').value;

    agenda.adicionarContato(nome, email, telefone, endereco, cpf, dataNascimento);
});



class Agenda {
    constructor() {
        this.vetContatos = [];
    }

    adicionarContato(nome, email, telefone, endereco, cpf, dataNascimento) {
        const nomeUpperCase = nome.toUpperCase();
        const contatoExistente = this.vetContatos.some(contato => contato.nome === nomeUpperCase);

        if (nome === "" || email === "" || telefone === "" ||
            endereco === "" || cpf === "" || dataNascimento === "") {
            alert("Por favor, preencha todos os campos obrigatórios.");
        } else if (contatoExistente) {
            alert(`Já existe um contato com o nome ${nome}.`);
        } else {
            const novoContato = new Contato(nome, email, telefone, endereco, cpf, dataNascimento);
            this.vetContatos.push(novoContato);
            alert(`Contato ${nome} adicionado com sucesso.`);
            this.atualizarTabelaContatos();
        }
    }

    atualizarTabelaContatos() {
        const tabelaContatos = document.querySelector('#lista-contatos tbody');
        tabelaContatos.innerHTML = ''; // Limpe a tabela

        // Adicione cada contato à tabela
        this.vetContatos.forEach(contato => {
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
}

const agenda = new Agenda();
