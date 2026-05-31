import { ServicoDePagamento } from "../src/servicoDePagamento.js";
import assert from 'node:assert';

describe('Testando método pagar', function() {
    it('Criar pagamento corretamente', function(){
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        servicoDePagamento.pagar('123-456-789', 'Pizzaria', 89);
        const pagamento = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.deepStrictEqual(pagamento, {       //deepStrictEqual compara conteudo, nao referencias
            codigoBarras: '123-456-789',
            empresa: 'Pizzaria',
            valor: 89,
            categoria: 'padrao'
        });    
    });
    it('Criar pagamento com categoria cara (valor > 100)', function(){
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();
 
        // Act
        servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
        const pagamento = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(pagamento.categoria, 'cara');
    });
    it('Criar pagamento com categoria padrao (valor < 100)', function(){
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        servicoDePagamento.pagar('2345-6-78', 'Empresa Biscoito', 50.99);
        const pagamento = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(pagamento.categoria, 'padrao');
    });
    it('Criar pagamento com categoria padrao (valor = 100)', function(){
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act
        servicoDePagamento.pagar('744-447', 'Empresa Fran', 100);
        const pagamento = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.equal(pagamento.categoria, 'padrao');
    });
});

describe('Testando método consultar ultimo pagamento', function() {
    it('Retornar ultimo pagamento de uma lista com 1 unico pagamento', function(){
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();
        servicoDePagamento.pagar('123-456', 'Empresa A', 489.90);

        // Act
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.deepStrictEqual(ultimoPagamento, {           //deepStrictEqual compara conteudo, nao referencias
            codigoBarras: '123-456',
            empresa: 'Empresa A',
            valor: 489.90,
            categoria: 'cara'
        });
    });
    it('Retornar ultimo pagamento de uma lista com N pagamentos', function(){
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();
        servicoDePagamento.pagar('123-456', 'Empresa A', 489.90);
        servicoDePagamento.pagar('456-789', 'Empresa B', 48.90);
        servicoDePagamento.pagar('666-666', 'Empresa C', 4.90);

        // Act
        const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

        // Assert
        assert.deepStrictEqual(ultimoPagamento, {
            codigoBarras: '666-666',
            empresa: 'Empresa C',
            valor: 4.90,
            categoria: 'padrao'
        });
    });
    it('Retornar mensagem de erro quando a lista de pagamentos está vazia', function(){
        // Arrange
        const servicoDePagamento = new ServicoDePagamento();

        // Act

        // Assert
        assert.throws( () => servicoDePagamento.consultarUltimoPagamento(), {
            message: 'Nenhum pagamento encontrado'
        });
    });
});