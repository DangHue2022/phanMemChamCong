const express = require('express');
const { glob } = require('glob');
const path = require('path');

const httpMethod = [
    'get', 'put', 'patch', 'delete', 'head', 'post', 'connect', 'options', 'trace'
];

module.exports = async (app) => {
    const modules = await glob(path.resolve(__dirname, '*').replace(/\\/g, '/'), { ignore: '**/index.js' });
    modules.forEach(async (module) => {
        const folders = await glob(path.join(module, '*').replace(/\\/g, '/'), {});
        folders.forEach(folder => {
            const mod = require(`${folder}/router`);
            const router = express.Router();

            router.use(mod.handler || []);
            mod.default.forEach(element => {
                const method = element.method.toLowerCase();
                if (!httpMethod.includes(method)) {
                    throw new Error(
                        `${method} is not allowed in http method`
                    )
                }
                router[method](element.route, element.handler);
            })
            app.use(mod.baseUrl, router);
        })
    })
}