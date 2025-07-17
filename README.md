# envies
[![](https://img.shields.io/npm/v/envies.svg?style=flat)](https://www.npmjs.org/package/envies) [![](https://img.shields.io/npm/dm/envies.svg)](https://www.npmjs.org/package/envies) [![](https://packagephobia.com/badge?p=envies)](https://packagephobia.com/result?p=envies)

>  Teeny tiny .env loader

No initialization, just import it and use the variables. It loads variables in ascending precedence from the following sources:

- `.default.env` in the script directory
- `.default.env` in the working directory
- `.env` in the script directory
- `.env` in the working directory
- `.env.local` in the script directory
- `.env.local` in the working directory
- The current environment variables

Variables are loaded only once when properties on `env` are first accessed.

## Usage
```js
import {env} from "envies";
console.log(env.USER);
```

© [silverwind](https://github.com/silverwind), distributed under BSD licence
