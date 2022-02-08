<div align="center">
<img width="100%" src="https://raw.githubusercontent.com/elsowiny/DigitalAssets/master/readmecovers/readmecoverprofanity.gif" alt="cover photo" />


[![CodeQL](https://github.com/elsowiny/badwordsfilter/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/elsowiny/badwordsfilter/actions/workflows/codeql-analysis.yml)

[![buildandtest](https://github.com/elsowiny/badwordsfilter/actions/workflows/node.js.yml/badge.svg)](https://github.com/elsowiny/badwordsfilter/actions/workflows/node.js.yml)

[![codecov](https://codecov.io/gh/elsowiny/badwordsfilter/branch/master/graph/badge.svg?token=19X7AYBX5Y)](https://codecov.io/gh/elsowiny/badwordsfilter)
</div>

Install
=======

    npm install 

Usage
=====

Check if a word is profane

```typescript
import {profane, filter, addWord, removeWord, filterArray, FilterConfig as fc} from "@elsowiny/badwordsfilter";

console.log(profane(username));
//returns true or false bool

```

For adding/exluding certain words just supply a list of those words to the config object

```typescript
import {profane, filter, addWord, removeWord, filterArray, FilterConfig as fc} from "@elsowiny/badwordsfilter";

fc.include(["noob", "dang it"])
fc.exclude(["obgyn", "bloody"]) // can include or exclude as much as you want

console.log(filter("noob"))
// ****

console.log(filter("obgyn"))
// obgyn
```
Add/remove individual strings
```typescript
import {profane, filter, addWord, removeWord, filterArray, FilterConfig as fc} from "@elsowiny/badwordsfilter";

addWord("noodle");

removeWord("darn");

console.log(filterArray["noodle", "darn"])
// ['******', 'darn']
```

Change the asterik(*) to be a different replacement value when filtering
```typescript
import {profane, filter, addWord, removeWord, filterArray, FilterConfig as fc} from "@elsowiny/badwordsfilter";

fc.replacer("x") // sets the value of the replacer

addWord("noob");
console.log(filter("noob"));
// xxxx
console.log(filterArray(["noob", "noodle"]))
// ['xxxx', 'noodle'];
```

Testing
=======

#### Requires
- Jest, Babel (specified in Dev Dependencies)


```
npm test

Runs Jest using the babel.config settings as needed to run tests for TS by Jest.
```


