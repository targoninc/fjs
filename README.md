# fjs (factory js)

URL for latest version: `https://fjs.targoninc.com/f.js` 

[![npm Package](https://github.com/targoninc/fjs/actions/workflows/npm-publish.yml/badge.svg?branch=main)](https://github.com/targoninc/fjs/actions/workflows/npm-publish.yml)
[![Docker Image](https://github.com/targoninc/fjs/actions/workflows/docker-image.yml/badge.svg)](https://github.com/targoninc/fjs/actions/workflows/docker-image.yml)

## npm package

https://www.npmjs.com/package/@targoninc/fjs

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
import { create, signal } from '@targon/fjs';

// elements make sense to be created in a function
function testElement(classes = []) {
    const text = signal('test');
    
    return create("span")
        .classes('border', ...classes)
        .attributes('data-test', 'test', 'data-test2', 'test2')
        // signals can be passed to any attribute and they will be updated when the signal's value is updated
        .text(text)
        .onclick(() => {
            // signals can be updated to update the text of the element
            text.value = 'clicked';
        })
        // children can be created by passing them as arguments to the children method
        .children(testChild(text))
        .build();
}

function testChild(text) {
    const childText = signal(text.value + " in child");
    // subscribe to the parent signal to update the child signal
    text.subscribe((value) => {
        childText.value = value + " in child";
    });
    
    return create("span")
        .classes('border')
        .text(childText)
        .build();
}

const app = document.querySelector('#app');
app.appendChild(testElement(['testClass']));
```
