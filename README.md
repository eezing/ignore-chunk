# Base Template

## Get Started

```bash
npm install ignore-chunk
```

```javascript
const IgnoreChunk = require('ignore-chunk');

const myIgnore = new IgnoreChunk('--ignore-chunk');

const someString = `
  Foo!
  --ignore-chunk
  Bar!
  --ignore-chunk
  Baz!
`;

myIgnore(someString);
// -->
// Foo!
// Baz!
```

---

## Development

1. `npm install -g nodemon` for global packages
1. `npm install` to install project packages
1. `npm test` to run tests
1. VSCode > Start Debugging (F5)
