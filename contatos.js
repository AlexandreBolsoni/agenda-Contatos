export class Contato {
    nome;
    email;
    telefone;
    endereco;
    cpf;
    dataNascimento;
    constructor(nome, email, telefone, endereco, cpf, dataNascimento) {
        this.nome = nome.toUpperCase();
        this.email = email.toUpperCase();
        this.telefone = telefone.toUpperCase();
        this.endereco = endereco.toUpperCase();
        this.cpf = cpf.toUpperCase();
        this.dataNascimento = dataNascimento.toUpperCase();
    }
}
