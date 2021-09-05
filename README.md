# Rollup plugin prompt replace

Rollup plugin that ask for text to replace

----

This plugin use [`@rollup/plugin-replace`](https://github.com/rollup/plugins/tree/master/packages/replace) under the hood.
Any options of `@rollup/plugin-replace` can be used.

## Installation

```
npm install --save-dev @macfja/rollup-plugin-prompt-replace
```

## Usage

```javascript
import replace from "@macfja/rollup-plugin-prompt-replace"

module.exports = {
    ...
        plugins: [replace({ '__test_api_endpoint__': 'URL to the test API: ' })]
};
```

## Contributing

Contributions are welcome. Please open up an issue or create PR if you would like to help out.

Read more in the [Contributing file](CONTRIBUTING.md)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.