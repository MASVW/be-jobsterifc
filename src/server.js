const Hapi = require('@hapi/hapi');
const fs = require('fs');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 5000,
        // port: process.env.PORT || 3306,
        // host: 'localhost',
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
        // tls: {
        //     key: fs.readFileSync('/path/to/your/privkey.pem'),
        //     cert: fs.readFileSync('/path/to/your/cert.pem')
        // }
    });

    server.route(routes);
    await server.start();
    console.log(server.info.uri);
};

init();
