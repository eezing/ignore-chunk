# ignore-chunk

Filter out chunks of lines in a string based on start and stop criteria.

```javascript
// Example: Ignore all lines between one and five.

const myIgnore = new IgnoreChunk('two', 'four');

const myString = `
  one
  two
  three
  four
  five
`;

const filteredString = myIgnore.inString(myString);

console.log(filteredString);
// one
// five
```
