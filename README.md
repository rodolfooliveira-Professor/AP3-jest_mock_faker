# Atividade AP3 - Liberação de Cartão

## Descrição
Este projeto testa a liberação de cartões para clientes com base em idade e renda, usando **Jest + Faker + Mock**.

### Regras de negócio
1. Cliente deve ter 18 anos ou mais.
2. Cliente deve ter renda mensal superior a R$ 2.000.
3. Renda > R$ 5.000 → cartão PREMIUM.
4. Renda entre 2.001 e 5.000 → cartão BÁSICO.
5. Qualquer condição não atendida → cartão NEGADO.

### Estrutura do projeto
- `src/cardService.js` → lógica de liberação de cartão
- `test/cardService.test.js` → 100 testes aleatórios com Faker e Mock

### Como rodar os testes
1. Instale as dependências:
```bash
npm install
