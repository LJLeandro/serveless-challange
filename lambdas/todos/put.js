const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const ssm = new AWS.SSM();

const normalizeEvent = require('/opt/nodejs/normalizer');
const response = require('/opt/nodejs/response');

exports.handler = async event => {
    if (process.env.DEBUG) {
        console.log({
            message: 'Evento Recebido',
            data: JSON.stringify(event),
        });
    }

    try {
        const { Parameter: { Value: table } } = await ssm.getParameter({ Name: process.env.TABLE }).promise();
        const { data } = normalizeEvent(event);
        const params = {
            TableName: table,
            Key: {
                Id: parseInt(data.Id, 10),
            },
            UpdateExpression: 'set #b = :s, #c = :t, #d = :x',
            ExpressionAttributeNames: {
                '#b': 'Cargo',
                '#c': 'Nome',
                '#d': 'Idade'
            },
            ExpressionAttributeValues: {
                ':s': data.Cargo,
                ':t': data.Nome,
                ':x': data.Idade
            },
        };

        await dynamo.update(params).promise();

        console.log({
            message: 'O Funcionário foi alterado com sucesso.',
            data: JSON.stringify(params),
        });

        return response(200, `O Funcionário com ID ${data.Id} foi alterado.`);
    } catch (err) {
        console.error(err);
        return response(500, 'Algo de errado aconteceu. ' + err);
    }
};
