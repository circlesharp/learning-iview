# webpack

## 1-当前的缺陷
1. It is not immediately apparent that the script depends on an external library.
2. If a dependency is missing, or included in the wrong order, the application will not function properly.
3. If a dependency is included but not used, the browser will be forced to download unnecessary code.

## 2-Creating a Bundle
1. npx webpack

## 3-Using a Configuration
1. npx webpack --config webpack.config.js
2. If a webpack.config.js is present, the webpack command picks it up by default.
3. This will be useful for more complex configurations that need to be split into multiple files.

## 4-Asset Management
1. loading css: style-loader, css-loader
2. loading pic: built-in Asset Modules
3. ...

## 5-Output Management
1. 配置多个 entry
2. html-webpack-plugin by default will generate its own index.html file, even though we already have one in the dist/ folder.
3. cleaning up the /dist folder

## 6-Development
1. mode, devtool (source map)
2. Development Tool
  1. watch mode: automatically recompiles the changed module
  2. webpack-dev-server: keeps bundle files in memory and serves them as if they were real files mounted at the server's root path.
  3. webpack-dev-middleware: is a wrapper that will emit files processed by webpack to a server.
