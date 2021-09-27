<h1>Teste - Serveless Challange</h1>

<h2> Passo a Passo </h2>

1. Configurar as Credential Keys da AWS e Instalar AWS CLI
2. Abrir o Terminal
3. Mover o Terminal até o Caminho 'serveless-challange/terraform'
4. Alterar a variavél 'aws_account_id' no arquivo 'variables.tf' para o código IAM de sua conta.
5. Executar o comando 'terraform init' > 'terraform validate' > 'terraform apply'
6. Acessar a URL que será retornada no Output adicionando o caminho 'v1/todos'
7. Comandos disponiveis:
    > POST
        > JSON de Exemplo:
            {
                "Id": 1,
                "Cargo": "Programador",
                "Nome": "Lucas Jose Leandro",
                "Idade": 25
            }
    > GET 
        v1/todos 
        v1/todos/1 ou v1/todos/{ID desejado}
    > PUT
        > JSON de Exemplo:
            {
                "Id": 1,
                "Cargo": "Programador",
                "Nome": "Lucas Jose Leandro",
                "Idade": 25
            }
    > DELETE
        > JSON de Exemplo:
            {
                "Id": 1
            }
