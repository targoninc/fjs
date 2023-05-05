# fjs (factory js)

[![npm Package](https://github.com/targoninc/fjs/actions/workflows/npm-publish.yml/badge.svg?branch=main)](https://github.com/targoninc/fjs/actions/workflows/npm-publish.yml)

## Installation

```bash
npm install @targoninc/fjs
```

## Usage

As an example, we'll create two files: `test.mjs` and `test.html`.

`test.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>FJS Test</title>
    <style>
        body, span {
            padding: 10px;
            display: block;
            width: max-content;
        }

        .border {
            border: 1px solid black;
        }
    </style>
</head>
<body>
    <div id="app"></div>
    <script src="test.mjs" type="module"></script>
</body>
</html>
```

`test.mjs`
```js
import { FJS } from '@targon/fjs';

const testElement = testClass => {
    return FJS.create("span")
        .classes(testClass, 'border')
        .attributes('data-test', 'test', 'data-test2', 'test2')
        .text('test text')
        .onclick(() => {
            console.log('test');
        })
        .children(testChild())
        .build();
};
const testChild = () => {
    return FJS.create("span")
        .classes('border')
        .text('test child').build();
};

const app = document.querySelector('#app');
app.appendChild(testElement('testClass'));
```