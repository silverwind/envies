# envies
[![](https://img.shields.io/npm/v/envies.svg?style=flat)](https://www.npmjs.org/package/envies) [![](https://img.shields.io/npm/dm/envies.svg)](https://www.npmjs.org/package/envies) [![](https://packagephobia.com/badge?p=envies)](https://packagephobia.com/result?p=envies)

> Zero-config .env parser

No configuration, just import it and use it. Checks the following in the working directory (lowest to highest precedence):

- `.default.env`
- `.env`,
- `.env.local`

## Usage
```console
npm i envies
```
```js
import {config} from "envies";
console.log(config.USER);
```

© [silverwind](https://github.com/silverwind), distributed under BSD licence
