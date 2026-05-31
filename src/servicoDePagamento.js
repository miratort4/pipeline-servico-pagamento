export class ServicoDePagamento {
    constructor() {
        this.pagamentos = []
    }

    // método pagar
    pagar(codigoBarras, empresa, valor) {
        const pagamento = {
            codigoBarras,
            empresa,
            valor,
            categoria: valor > 100 ? 'cara' : 'padrao'
        };

        this.pagamentos.push(pagamento);
    }

    // método consultar ultimo pagamento
    consultarUltimoPagamento(){
        if (this.pagamentos.length === 0) {
            throw new Error('Nenhum pagamento encontrado');
        } 
        return this.pagamentos.at(-1);
    }
}

/*
const servicoDePagamento = new ServicoDePagamento();
servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
servicoDePagamento.pagar('123456789', 'Samar', 50.99);
servicoDePagamento.pagar('744', 'Fran', 100);
console.log(servicoDePagamento.pagamentos);         // mostra todos os pagamentos da lista
console.log(servicoDePagamento.consultarUltimoPagamento())
*/