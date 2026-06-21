# Pipeline CI - Serviço de Pagamento

## Objetivo
O Serviço de Pagamento é uma aplicação desenvolvida em Node.js para simular o pagamento de boletos. A aplicação possui dois métodos principais:

- Pagar: recebe o código de barras, a empresa e o valor do boleto.
- Consultar último pagamento: retorna o último pagamento realizado.

Ao realizar um pagamento, a aplicação classifica a transação conforme o valor informado:

- Categoria "cara": pagamentos com valor superior a 100,00.
- Categoria "padrão": pagamentos com valor igual ou inferior a 100,00.

Cada pagamento é armazenado como um objeto em uma lista interna, sendo possível consultar apenas o último pagamento efetuado.

Foram implementados testes automatizados para validar os principais cenários da aplicação, incluindo casos de sucesso, mensagem de erro e testes de limite. Esses testes são executados automaticamente pela pipeline de Integração Contínua utilizando GitHub Actions.

## Tecnologias utilizadas
- Node.js
- Mocha
- Mochawesome
- GitHub Actions

## Pipeline de Integração Contínua

A pipeline foi desenvolvida utilizando GitHub Actions e possui três formas de execução:
- Push na branch main, executando automaticamente após cada envio de alteração;
- Execução manual, pelo gatilho workflow_dispatch executado dentro do GitHub Actions;
- Agendamento semanal (cron), executa todo domingo às 23:59 horario UTC (correspondente à 20:59 horario de Brasília) automaticamente.

## Etapas da Pipeline

A pipeline executa as seguintes etapas:
1. Checkout do código-fonte
2. Setup do ambiente Node.js
3. Instalação das dependências do projeto (npm install)
4. Execução dos testes automatizados (npm test)
5. Geração do relatório de testes usando Mochawesome
6. Publicação do relatório como artefato da execução da pipeline

## Testes Automatizados
Os testes foram desenvolvidos utilizando o framework Mocha.

Durante a execução da pipeline, o comando 'npm test' executa todos os testes automatizados e gera um relatório HTML utilizando o reporter Mochawesome.

Os testes contemplam:

- cenários de sucesso;
- casos de limite para classificação dos pagamentos;
- validação das regras de negócio implementadas (disparo de mensagem de erro).

## Relatório de testes

Ao término da execução da pipeline, o relatório é disponibilizado como um artefato do GitHub Actions. Para acessá-lo:

1. Acesse a aba Actions do repositório.
2. Selecione uma execução da pipeline concluída com sucesso.
3. Na seção Artifacts, faça o download do arquivo test-report.zip.
4. Extraia o arquivo .zip e abra o arquivo .html no seu navegador.

## Execução local

Para executar localmente o projeto sem uso de pipelines, abra o Terminal na pasta do projeto e digite os comandos abaixo para instalar as dependências e executar os testes respectivamente:

`npm install`
`npm test`