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
