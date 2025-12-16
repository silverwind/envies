# envies
[![](https://img.shields.io/npm/v/envies.svg?style=flat)](https://www.npmjs.org/package/envies) [![](https://img.shields.io/npm/dm/envies.svg)](https://www.npmjs.org/package/envies) [![](https://packagephobia.com/badge?p=envies)](https://packagephobia.com/result?p=envies) [![](https://depx.co/api/badge/envies)](https://depx.co/pkg/envies)

>  Teeny tiny .env loader

## Usage

```js
import {env} from "envies";
console.log(env.USER);
```

## Details

It loads variables in ascending precedence from the following sources:

- `.default.env` in the script directory
- `.default.env` in the working directory
- `.env` in the script directory
- `.env` in the working directory
- `.env.local` in the script directory
- `.env.local` in the working directory
- The current environment variables

### Notes

- Variables are loaded on-demand once when properties on `env` are first accessed
- The script directory is determined from `process.argv[1]`
- To change the default source filenames, set `ENVIES_SOURCES=.example.env,.env` in the environment.

© [silverwind](https://github.com/silverwind), distributed under BSD licence
