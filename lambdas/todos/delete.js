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
        const {
            data: { Id },
        } = normalizeEvent(event);

        const params = {
            TableName: table,
            Key: {
                Id: parseInt(Id, 10),
            },
        };

        await dynamo.delete(params).promise();

        console.log({
            message: 'O Funcionário foi removido.',
            data: JSON.stringify(params),
        });

        return response(200, `O Funcionário com o ID ${Id} foi removido`);
    } catch (err) {
        console.error(err);
        return response(500, 'Algo de errado aconteceu. Erro: ' + err);
    }
};
