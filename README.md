<p align="center">
  <a href="https://vue-formily.netlify.app/plugins/i18n" target="_blank">
    <img width="320" src="./.github/logo.png">
  </a>
</p>
<br>

Localization plugin for [**vue-formily**](https://vue-formily.netlify.app).

## Links
- [📚 &nbsp; Documentation](https://vue-formily.netlify.app/plugins/i18n)

## Installation
### NPM
```sh
# install with yarn
yarn add @vue-formily/i18n

# install with npm
npm install @vue-formily/i18n --save
```

### CDN
You can use **i18n** plugin with a script tag and a CDN, import the library like this:

```html
<script src="https://unpkg.com/@vue-formily/i18n@latest"></script>
```

This will inject a `I18nPlugin` global object, which you will use to access the various methods exposed by the plugin or register to [**vue-formily**](https://vue-formily.netlify.app).

If you are using native ES Modules, there is also an ES Modules compatible build:

```html
<script type="module">
  import i18n from 'https://unpkg.com/@vue-formily/i18n@latest/dist/i18n-plugin.esm.js'
</script>
```

### Set Up

```typescript
import Vue from 'vue';
import VueFormily from '@vue-formily/formily';
import i18n from '@vue-formily/i18n';

VueFormily.plug(i18n, {} as I18nOptions);
Vue.use(VueFormily);
```

## Options
```typescript
type Resource = Record<string, string | string[]>;
type Locale = {
  code: string;
  localize?: Record<string, any>;
  resource?: Resource;
};

type I18nOptions = {
  defaultLocale: string;
  locales?: Locale[];
}
```

## Basic Usage
### Stand Along
```typescript
import i18n from 'vue-formily/plugins/i18n';

// Install plugin and locale
VueFormily.plug(i18n, {
  locales: [{
    ...enUS,
    resource: {
      hi: 'Hi, {name}.',
      weekday: 'Today is {date[6]}.',
      validation: {
        dupplicated: '{field} is invalid.'
      }
    },
    // The data will be used to translate the messages above
    localize: {
      name: 'Jo',
      date: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
  }]
});

Vue.use(VueFormily);

// Translation
i18n.translate('hi'); // Hi, Jo.
// Nested object
// The localize data can be checked directly by 2nd parameter
i18n.translate('validation.dupplicated', {
  field: 'Email'
}); // Email is invalid.
// Array
i18n.translate('weekday[6]'); // Today is Saturday.

i18n.addLocale({
  code: 'fr-ca',
  resource: {
    hi: 'Bonjour, {name}.'
  },
  localize: {
    name: 'Jo'
  }
});

i18n.switchLocale('fr-ca');

i18n.translate('hi') // Bonjour, Jo.
```

### In Vue Formily
In **vue-formily**, the **i18n** is used in the [Rule](https://vue-formily.netlify.app/api/rule), [Field](https://vue-formily.netlify.app/api/field), and [props](https://vue-formily.netlify.app/api/element#properties) for all form elements. Here are some examples:
- [Localize Using Vue Formily I18n](https://vue-formily.netlify.app/examples/localize#using-vue-formily-i18n)
- [Localize Using External Library](https://vue-formily.netlify.app/examples/localize#using-external-library)

## Contributing
You are welcome to contribute to this project, but before you do, please make sure you read the [Contributing Guide](https://github.com/vue-formily/formily/blob/main/.github/CONTRIBUTING.md).

## License
[MIT](./LICENSE)
