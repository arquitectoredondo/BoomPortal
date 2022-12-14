import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { WidgetWysiwyg } from './WidgetWysiwyg';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  i: {
    uuid: '7c43ec544eaa423e9f0fc83bfac260b3',
    widgetType: 5,
    x: 0,
    y: 0,
    h: 24,
    w: 6,
    minH: 24,
    minW: 6,
    placeholder: {
      nl: '',
      en: '',
    },
    borderTop: false,
    borderRight: false,
    borderBottom: false,
    borderLeft: false,
    title: {
      nl: 'title test1',
      en: '',
    },
    label: {
      nl: '',
      en: '',
    },
    text: {
      nl: '<p><em>rich </em><strong>editor </strong><ins>test1</ins></p>\n',
      en: '',
    },
    videoFormat: false,
    i: '0',
    static: false,
  },
  label: 'Text',
  widgetPayload: {
    '7c43ec544eaa423e9f0fc83bfac260b3': {
      title: {
        nl: 'title test1',
        en: 'title test1',
      },
      placeholder: {
        nl: '',
        en: '',
      },
      text: {
        nl: '<p><em>rich </em><strong>editor </strong><ins>test1</ins></p>\n',
        en: '<p><em>rich </em><strong>editor </strong><ins>test1</ins></p>\n',
      },
      label: {
        nl: '',
        en: '',
      },
    },
  },
  languages: ['nl', 'en'],
  requiredLanguage: 'nl',
  required: true,
  setWidgetPayload: jest.fn(),
  validationRules: jest.fn().mockReturnValue([
    {
      error: false,
      helperText: ' ',
      type: 0,
    },
  ]),
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(<WidgetWysiwyg {...props} />);
  return {
    props,
    enzymeWrapper,
  };
}

describe('WidgetsTranslationsDialog', () => {
  it('should render self and subcomponents', () => {
    const { enzymeWrapper } = setup(initProps);
    expect(enzymeWrapper).toBeTruthy();
  });

  it('should render titles', () => {
    const { enzymeWrapper } = setup(initProps);
    const titles: ShallowWrapper = enzymeWrapper.find('.editor-container span');
    expect(titles.at(0).text()).toBe('Text (NL)*');
    expect(titles.at(1).text()).toBe('Text (EN)');
  });

  it('should render custom option in text editor', () => {
    const { enzymeWrapper } = setup(initProps);
    const customOption: ShallowWrapper = enzymeWrapper.find('CustomOption');
    expect(customOption).toBeTruthy();
  });

  it('should have a hidden dialog', () => {
    const { enzymeWrapper } = setup(initProps);
    const dialog: ShallowWrapper = enzymeWrapper.find('.copy-dialog');
    expect(dialog.prop('open')).toBe(false);
  });

  it('should have a open dialog', () => {
    const myInitialState = true;
    React.useState = jest.fn().mockReturnValue([myInitialState, {}]);
    const { enzymeWrapper } = setup(initProps);
    const dialog: ShallowWrapper = enzymeWrapper.find('.copy-dialog');
    expect(dialog.prop('open')).toBe(true);
  });
});
