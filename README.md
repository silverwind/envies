# envies
[![](https://img.shields.io/npm/v/envies.svg?style=flat)](https://www.npmjs.org/package/envies) [![](https://img.shields.io/npm/dm/envies.svg)](https://www.npmjs.org/package/envies) [![](https://packagephobia.com/badge?p=envies)](https://packagephobia.com/result?p=envies)

> .env loader

No configuration, just import it and use the variables. It loads variables from the following in the working directory (lowest to highest precedence):

- `.default.env`
- `.env`
- `.env.local`

Variables are loaded once when properties on `env` are first accessed.

## Usage
```js
import {env} from "envies";
console.log(env.USER);
```

© [silverwind](https://github.com/silverwind), distributed under BSD licence
