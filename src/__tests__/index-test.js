'use strict';

const IgnoreChunk = require('../index');

describe('class IgnoreChunk with valid arguments', () => {
  const cases = [
    {
      description:
        'Given begin & end as strings, and source string has 0 chunks',
      begin: '--ignore-begin',
      end: '--ignore-end',
      source: `
      Foo!
      hello world!
      Bar!
    `,
      expected: `
      Foo!
      hello world!
      Bar!
    `
    },
    {
      description:
        'Given begin & end as strings, and source string has 1 chunk',
      begin: '--ignore-begin',
      end: '--ignore-end',
      source: `
      Foo!
      --ignore-begin
      hello world!
      --ignore-end
      Bar!
    `,
      expected: `
      Foo!
      Bar!
    `
    },
    {
      description:
        'Given begin & end as strings, and source string has 2 chunks',
      begin: '--ignore-begin',
      end: '--ignore-end',
      source: `
      Foo!
      --ignore-begin
      hello world!
      --ignore-end
      Bar!
      --ignore-begin
      hello dude!
      --ignore-end
      Baz!
    `,
      expected: `
      Foo!
      Bar!
      Baz!
    `
    },
    {
      description: 'Given begin as string only, and source string has 2 chunks',
      begin: '--ignore',
      source: `
      Foo!
      --ignore
      hello world!
      --ignore
      Bar!
      --ignore
      hello dude!
      --ignore
      Baz!
    `,
      expected: `
      Foo!
      Bar!
      Baz!
    `
    },
    {
      description:
        'Given begin & end as functions, and source string has 2 chunks',
      begin: l => l.includes('--ignore-begin'),
      end: l => l.includes('--ignore-end'),
      source: `
      Foo!
      --ignore-begin
      hello world!
      --ignore-end
      Bar!
      --ignore-begin
      hello dude!
      --ignore-end
      Baz!
    `,
      expected: `
      Foo!
      Bar!
      Baz!
    `
    },
    {
      description:
        'Given begin as function only, and source string has 2 chunks',
      begin: l => l.includes('--ignore'),
      source: `
      Foo!
      --ignore
      hello world!
      --ignore
      Bar!
      --ignore
      hello dude!
      --ignore
      Baz!
    `,
      expected: `
      Foo!
      Bar!
      Baz!
    `
    },
    {
      description:
        'Given begin as string & end as function, and source string has 2 chunks',
      begin: '--ignore-begin',
      end: l => l.includes('--ignore-end'),
      source: `
      Foo!
      --ignore-begin
      hello world!
      --ignore-end
      Bar!
      --ignore-begin
      hello dude!
      --ignore-end
      Baz!
    `,
      expected: `
      Foo!
      Bar!
      Baz!
    `
    }
  ];

  cases.forEach(c =>
    test(c.description, () => {
      const ignoreChunk = new IgnoreChunk(c.begin, c.end);
      const result = ignoreChunk.inString(c.source);
      expect(result).toBe(c.expected);
    })
  );
});

describe('class IgnoreChunk with invalid arguments', () => {
  const cases = [
    {
      description: 'Given begin & end as undefined, constructor should throw',
      source: `
      Foo!
      --ignore
      hello world!
      --ignore
      Bar!
    `,
      expected: 'begin argument must be of type'
    },
    {
      description:
        'Given begin as undefined & end as string, constructor should throw',
      end: '--ignore',
      source: `
      Foo!
      --ignore
      hello world!
      --ignore
      Bar!
    `,
      expected: 'begin argument must be of type'
    },
    {
      description:
        'Given begin as string & end as null, constructor should throw',
      begin: 'ignore',
      end: null,
      source: `
      Foo!
      --ignore
      hello world!
      --ignore
      Bar!
    `,
      expected: 'end argument must be of type'
    },
    {
      description:
        'Given begin as string & end as object, constructor should throw',
      begin: 'ignore',
      end: {},
      source: `
      Foo!
      --ignore
      hello world!
      --ignore
      Bar!
    `,
      expected: 'end argument must be of type'
    }
  ];

  cases.forEach(c =>
    test(c.description, () => {
      expect(() => new IgnoreChunk(c.begin, c.end)).toThrow(c.expected);
    })
  );
});
