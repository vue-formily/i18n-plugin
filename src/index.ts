import { flatArray, isPlainObject, get } from '@vue-formily/util';
import stringFormat from '@vue-formily/string-format';

export type Resource = {
  [key: string]: string | string[] | Resource;
};

export type Locale = {
  code: string;
  localize?: Record<string, any>;
  resource?: Resource;
};

export type I18nOptions = {
  locale: string;
  locales?: Locale[];
};

let _activeLocale = 'en-US';
const _locales: Record<string, Locale> = {};

export default {
  switchLocale(locale: string) {
    if (!_locales[locale]) {
      throw new Error(`${locale} does not exist.`);
    }

    _activeLocale = locale;
  },
  addLocale(locale: Locale) {
    if (isPlainObject(locale)) {
      _locales[locale.code] = locale;
    }
  },
  removeLocale(locale: string) {
    delete _locales[locale];
  },
  getLocale(locale: string) {
    return _locales[locale];
  },
  translate(key: string, data?: Record<string, any> | Record<string, any>[], options: { locale?: string } = {}) {
    let locale = options.locale;

    if (isPlainObject(data) && (data as any).formType === 'field') {
      const { i18n = {} } = (data as any).options || {};
      locale = i18n.locale;
    }

    const loc = _locales[locale || _activeLocale] || {};

    const format = get(key, loc.resource);

    return stringFormat.format(format !== undefined ? format : key, flatArray([data, loc.localize]));
  },
  install(this: any, Objeto: any, options: I18nOptions) {
    this.options = options;
    const { locales = [], locale = _activeLocale } = this.options;

    locales.forEach((locale: Locale) => this.addLocale(locale));

    this.switchLocale(locale);

    Objeto.prototype.$i18n = this;
  }
};
