# envies
[![](https://img.shields.io/npm/v/envies.svg?style=flat)](https://www.npmjs.org/package/envies) [![](https://img.shields.io/npm/dm/envies.svg)](https://www.npmjs.org/package/envies) [![](https://packagephobia.com/badge?p=envies)](https://packagephobia.com/result?p=envies)

> Zero-config .env file parser

Just import it and use it, files will be read on-demand. Has a static list of files it checks in the working directory: `.default.env`, `.env`, `.env.local`.

## Usage
```console
npm i envies
```
```js
import {config} from "envies";
console.log(config.FOO);
```

© [silverwind](https://github.com/silverwind), distributed under BSD licence
