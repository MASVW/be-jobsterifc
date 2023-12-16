const Hapi = require('@hapi/hapi');
const fs = require('fs');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        // host: 'localhost',
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
