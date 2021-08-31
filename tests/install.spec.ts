import { createLocalVue, mount } from '@vue/test-utils';
import VueFormily from '@vue-formily/formily';
import i18n from '@/.';

const mockFormatter = {
  format(format: any) {
    return format;
  },
  install(Objeto: any) {
    Objeto.prototype.$stringFormat = this;
  }
};

describe('Installation', () => {
  let localVue: any;

  beforeEach(() => {
    localVue = createLocalVue();
  });

  it('Should install by vue-formily `plugins` options successfully', async () => {
    localVue.use(VueFormily, {
      plugins: [
        mockFormatter,
        {
          ...i18n,
          options: {
            locales: [
              {
                code: 'en-US',
                resource: {
                  hi: 'Hi, {value}'
                }
              }
            ]
          }
        }
      ]
    });

    const wrapper = mount(
      {
        template: '<div></div>'
      },
      {
        localVue
      }
    );

    const vm = wrapper.vm as any;

    vm.$formily.addForm({
      formId: 'test',
      fields: [
        {
          formId: 'a',
          type: 'string',
          value: 'test',
          format: 'hi',
          on: {
            validated(field: any) {
              expect(field.formatted).toBe('Hi, test');
            }
          }
        }
      ]
    });
  });

  it('Should install by vue-formily `plug` method successfully', async () => {
    VueFormily.plug(i18n, {
      locales: [
        {
          code: 'en-US',
          resource: {
            hi: 'Hi, {value}'
          }
        }
      ]
    });

    localVue.use(VueFormily, {
      plugins: [mockFormatter]
    });

    const wrapper = mount(
      {
        template: '<div></div>'
      },
      {
        localVue
      }
    );

    const vm = wrapper.vm as any;

    vm.$formily.addForm({
      formId: 'test',
      fields: [
        {
          formId: 'a',
          type: 'string',
          value: 'test',
          format: 'hi',
          on: {
            validated(field: any) {
              expect(field.formatted).toBe('Hi, test');
            }
          }
        }
      ]
    });
  });
});
