const path = require('path');
const express = require('express');
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const root = __dirname + '/build';
const port = process.env.LEANCLOUD_APP_PORK || 3000;

server.use(express.static(root, { maxAge: 86400000 }));
server.use(middlewares);

/* 白名单的路由不用 json-server 接管 */
const reactRouterWhiteList = ['/create', '/edit/:itemId'];
server.get(reactRouterWhiteList, (request, response) => {
  response.sendFile(path.resolve(root, 'index.html'));
});

server.use(router);

server.listen(port, () => {
  console.log('server is running');
});
