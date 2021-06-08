# BitkubAPI-WrapperDemo


## Install

```sh
npm i bitkubapidemo
```


## Usage



```js
import { BitkubSecure, BitkubNonSecure } from 'bitkubapidemo'

const bitkubserver = new BitkubNonSecure();
const bitkub = new BitkubSecure(BITKUB_API_KEY, BITKUB_SECRET_KEY);

```

## Example



```js
const servertime = await bitkubserver.servertime(); 

```
## API Document

    Soon
## Reference
https://github.com/bitkub/bitkub-official-api-docs/blob/master/restful-api.md