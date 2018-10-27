'use strict';

class IgnoreChunk {
  constructor(begin, end) {
    try {
      this.begin = this.constructor.makeCheckFunc(begin);
    } catch (error) {
      if (error === 'invalid_type') {
        throw new Error(
          'begin argument must be of type "string" or "function".'
        );
      }
    }

    try {
      this.end =
        end !== undefined ? this.constructor.makeCheckFunc(end) : this.begin;
    } catch (error) {
      if (error === 'invalid_type') {
        throw new Error(
          'end argument must be of type "string" or "function" or undefined (default to begin).'
        );
      }
    }

    this.inString = this.inString.bind(this);
  }

  inString(data) {
    const lines = data.split('\n');
    let ignoreOn = false;

    return lines
      .filter(l => {
        if (ignoreOn === false && this.begin(l) === true) {
          ignoreOn = true;
          return false;
        } else if (ignoreOn === true && this.end(l) === true) {
          ignoreOn = false;
          return false;
        } else {
          return ignoreOn === false;
        }
      })
      .join('\n');
  }

  static makeCheckFunc(arg) {
    switch (typeof arg) {
      case 'string':
        return line => line.trim().startsWith(arg);

      case 'function':
        return arg;

      default:
        throw 'invalid_type';
    }
  }
}

module.exports = IgnoreChunk;
