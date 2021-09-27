import { createLocalVue, mount } from '@vue/test-utils';
import { createFormily } from '@vue-formily/formily';
import i18n from '@/.';

const mockFormatter = {
  format(format: any) {
    return format;
  },
  install(config: any) {
    config.plugs.stringFormat = this;
  }
};

describe('Installation', () => {
  let localVue: any;

  beforeEach(() => {
    localVue = createLocalVue();
  });

  it('Should install by vue-formily `plug` method successfully', async () => {
    const formily = createFormily();

    formily.plug(i18n, {
      locales: [
        {
          code: 'en-US',
          resource: {
            hi: 'Hi, {value}'
          }
        }
      ]
    });
    formily.plug(mockFormatter);

    localVue.use(formily);

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
