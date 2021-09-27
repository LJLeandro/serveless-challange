const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const ssm = new AWS.SSM();

const normalizeEvent = require('/opt/nodejs/normalizer');
const response = require('/opt/nodejs/response');

exports.handler = async event => {
    if (process.env.DEBUG) {
        console.log({
            message: 'Evento recebido',
            data: JSON.stringify(event),
        });
    }

    try {
        const { Parameter: { Value: table } } = await ssm.getParameter({ Name: process.env.TABLE }).promise();
        const { data } = normalizeEvent(event);

        const params = {
            TableName: table,
            Item: {
                ...data,
            },
        };

        await dynamo.put(params).promise();

        console.log({
            message: 'Funcionário criado',
            data: JSON.stringify(params),
        });

        return response(201, `O Funcionário com o ID ${data.Id} foi criado.`);
    } catch (err) {
        console.error(err);
        return response(500, 'Um erro aconteceu. ' + err);
    }
};
