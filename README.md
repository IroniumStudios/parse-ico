# parse-ico

A JavaScript library to use ICO.
Works on both Node.js and the browser.

NOTE: This package is a fork of parse-ico.

## Install

```sh
npm install parse-ico
```

### Node.js:

```js
const ICO = require('parse-ico');
```

### Browser:

```js
const ICO = require('parse-ico/browser')
```

or

```html
<script type="text/javascript" src="node_modules/parse-ico/dist/ico.js"></script>
```

To fully use this library, browsers must support **JavaScript typed arrays**, **Canvas API** and **Promise**.
Chrome, Edge 12, Firefox and Safari 9 support these functions.

## Example

### Node.js:

```js
const fs = require('fs');
const ICO = require('parse-ico');

const buffer = fs.readFileSync('favicon.ico');
ICO.parse(buffer, 'image/png').then(images => {
  // save as png files
  images.forEach(image => {
    const file = `${image.width}x${image.height}-${image.bpp}bit.png`;
    const data = Buffer.from(image.buffer);
    fs.writeFileSync(file, data);
  });
});
```

### Browser:

```html
<input type="file" id="input-file" />
<script>
  document.getElementById('input-file').addEventListener('change', function (evt) {
    // use FileReader for converting File object to ArrayBuffer object
    var reader = new FileReader();
    reader.onload = function (e) {
      ICO.parse(e.target.result).then(function (images) {
        // logs images
        console.dir(images);
      })
    };
    reader.readAsArrayBuffer(evt.target.files[0]);
  }, false);
</script>
```

## API

<a name="module_ICO"></a>

### ICO

* [ICO](#module_ICO)
    * [isICO(source)](#exp_module_ICO--isICO) ⇒ <code>boolean</code> ⏏
    * [parse(buffer, [mime])](#exp_module_ICO--parse) ⇒ <code>Promise.&lt;Array.&lt;ParsedImage&gt;&gt;</code> ⏏

<a name="exp_module_ICO--isICO"></a>

#### isICO(source) ⇒ <code>boolean</code> ⏏
Check the ArrayBuffer is valid ICO.

**Kind**: global method of [<code>ICO</code>](#module_ICO)  
**Returns**: <code>boolean</code> - True if arg is ICO.  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>ArrayBuffer</code> \| <code>Buffer</code> | ICO file data. |

<a name="exp_module_ICO--parse"></a>

#### parse(buffer, [mime]) ⇒ <code>Promise.&lt;Array.&lt;ParsedImage&gt;&gt;</code> ⏏
Parse ICO and return some images.

**Kind**: global method of [<code>ICO</code>](#module_ICO)  
**Returns**: <code>Promise.&lt;Array.&lt;ParsedImage&gt;&gt;</code> - Resolves to an array of [ParsedImage](#ParsedImage).  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| buffer | <code>ArrayBuffer</code> \| <code>Buffer</code> |  | ICO file data. |
| [mime] | <code>string</code> | <code>&quot;image/png&quot;</code> | MIME type for output. |


## Typedefs

<a name="ParsedImage"></a>

### ParsedImage : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| width | <code>number</code> | Image width. |
| height | <code>number</code> | Image height. |
| bpp | <code>number</code> | Image color depth as bits per pixel. |
| buffer | <code>ArrayBuffer</code> | Image buffer. |


## License

MIT license
