const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () =>{
    const server = Hapi.server({
        port: 3306,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    })
    server.route(routes)
    await server.start();
    console.log(server.info.uri);
};

init();