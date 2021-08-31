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
  name: 'i18n',
  switchLocale(locale: string = _activeLocale) {
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
  translate(
    key: string,
    data?: Record<string, any> | Record<string, any>[],
    { locale = _activeLocale }: { locale?: string } = {}
  ) {
    const loc = _locales[locale] || {};

    const format = get(key, loc.resource);

    return stringFormat.format(format !== undefined ? format : key, flatArray([data, loc.localize]));
  },
  install(Objeto: any, options: I18nOptions) {
    this.options = { ...this.options, ...options };
    const { locales = [], locale = _activeLocale } = this.options;

    locales.forEach(locale => this.addLocale(locale));

    this.switchLocale(locale);

    Objeto.prototype.$i18n = this;
  },
  options: {} as I18nOptions
};
