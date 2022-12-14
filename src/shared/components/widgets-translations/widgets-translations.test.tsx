import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AllWidgetsFields } from './widgets-translations';

Enzyme.configure({ adapter: new Adapter() });

const initProps: any = {
  open: false,
  title: 'Translations',
  onConfirmDelete: jest.fn(),
  onCloseDialog: jest.fn(),
  data: {
    cms: [
      {
        uuid: '8b9e92dc01994f3aaf1e9391347d5952',
        widgetType: 6,
        x: 0,
        y: 0,
        h: 45,
        w: 10,
        minH: 45,
        minW: 6,
        placeholder: {
          nl: '',
          en: '',
        },
        backgroundColor: 'transparent',
        fontColor: '#000',
        borderTop: true,
        borderRight: true,
        borderBottom: true,
        borderLeft: true,
        scalableImage: false,
        title: {
          nl: 'Test Color Picker',
          en: 'Test Color Picker',
        },
        label: {
          nl: '',
          en: '',
        },
        internal: true,
        type: 0,
        text: {
          nl: 'text ',
          en: 'text ',
        },
        image: '',
        url: 'home',
        isButtonVisible: false,
        openNewTab: true,
        videoFormat: false,
        i: '0',
        static: false,
      },
      {
        uuid: 'fbf4e27779534d8c95ee4689f40e7f48',
        widgetType: 11,
        x: 6,
        y: 503,
        h: 54,
        w: 6,
        minH: 54,
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
          nl: 'Promotion Widgett___',
          en: 'Promotion Widgett___',
        },
        display: 'horizontal',
        typeOfPublication: 2,
        sortBy: 0,
        label: {
          nl: '',
          en: '',
        },
        text: {
          nl: '',
          en: '',
        },
        image: '',
        videoFormat: false,
        databaseSelected: '',
        journalSelected: 'ArA',
        i: '1',
        static: false,
      },
      {
        uuid: 'c28a0ea205a441adb7d3a5b89637565c',
        widgetType: 8,
        x: 0,
        y: 665,
        h: 45,
        w: 6,
        minH: 45,
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
          nl: 'Events Widget____dzsfgzdgf',
          en: 'Events Widget____dzsfgzdgf',
        },
        listView: false,
        label: {
          nl: '',
          en: '',
        },
        text: {
          nl: '',
          en: '',
        },
        image: '',
        videoFormat: false,
        i: '2',
        static: false,
      },
      {
        uuid: '9e23edfb3d6042a298b4ff9d02290128',
        widgetType: 10,
        x: 0,
        y: 611,
        h: 54,
        w: 19,
        minH: 54,
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
          nl: 'Read On Widget',
          en: 'Read On Widget',
        },
        display: 'horizontal',
        label: {
          nl: '',
          en: '',
        },
        text: {
          nl: '',
          en: '',
        },
        videoFormat: false,
        i: '3',
        static: false,
      },
      {
        uuid: '1b9640d86cd34c25a64696c430bf291d',
        widgetType: 9,
        x: 6,
        y: 719,
        h: 45,
        w: 6,
        minH: 45,
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
          nl: 'News Widget_pppp',
          en: 'News Widget_pppp',
        },
        label: {
          nl: '',
          en: '',
        },
        text: {
          nl: '',
          en: '',
        },
        image: '',
        videoFormat: false,
        i: '4',
        static: false,
      },
      {
        uuid: '2eafa9b1dce5450c9577c7605dbaae25',
        widgetType: 5,
        x: 0,
        y: 99,
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
          nl: 'Flat text only english',
          en: 'Flat text only english',
        },
        label: {
          nl: '',
          en: '',
        },
        text: {
          nl: '<p><span style="color: rgba(0,0,0,0.87);background-color: rgb(255,255,255);font-size: medium;font-family: objektiv-mk2, sans-serif;">Text of flat text only english</span>&nbsp;</p>\n',
          en: '<p><span style="color: rgba(0,0,0,0.87);background-color: rgb(255,255,255);font-size: medium;font-family: objektiv-mk2, sans-serif;">Text of flat text only english</span>&nbsp;</p>\n',
        },
        videoFormat: false,
        i: '5',
        static: false,
      },
      {
        uuid: 'b6eaf3123b6a49b4854c7712840f82ca',
        widgetType: 6,
        x: 6,
        y: 764,
        h: 45,
        w: 6,
        minH: 45,
        minW: 6,
        placeholder: {
          nl: '',
          en: '',
        },
        fontColor: '#000',
        borderTop: false,
        borderRight: false,
        borderBottom: false,
        borderLeft: false,
        title: {
          nl: 'Banner Widget 2',
          en: 'Banner Widget 2',
        },
        label: {
          nl: 'button 2',
          en: 'button 2',
        },
        internal: false,
        text: {
          nl: 'Banner Widget 2',
          en: 'Banner Widget 2',
        },
        image: '',
        url: 'www.google.com',
        isButtonVisible: true,
        openNewTab: true,
        videoFormat: false,
        i: '6',
        static: false,
      },
      {
        uuid: 'dbe25bc2f8c04c528fc79d29830e7dbf',
        widgetType: 5,
        x: 6,
        y: 665,
        h: 54,
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
          nl: 'Flat Text Widget',
          en: 'Flat Text Widget',
        },
        label: {
          nl: '',
          en: '',
        },
        text: {
          nl: '<p>Flat Text Widget <strong>NL</strong></p>\n',
          en: '<p>aaa</p>\n',
        },
        image: '',
        videoFormat: false,
        i: '7',
        static: false,
      },
      {
        uuid: 'de5abd647de548b498471f40dbf3118b',
        widgetType: 12,
        x: 0,
        y: 339,
        h: 54,
        w: 18,
        minH: 54,
        minW: 18,
        placeholder: {
          nl: '',
          en: '',
        },
        borderTop: false,
        borderRight: false,
        borderBottom: false,
        borderLeft: false,
        title: {
          nl: 'Title My Publications Widget',
          en: 'Title My Publications Widget',
        },
        label: {
          nl: '',
          en: '',
        },
        text: {
          nl: '<p>sdrfgdsfgh</p>\n',
          en: '<p>ttt</p>\n',
        },
        videoFormat: false,
        i: '8',
        static: false,
      },
      {
        uuid: '82b2b044f6fe464c987012531f11ed8e',
        widgetType: 12,
        x: 0,
        y: 285,
        h: 54,
        w: 18,
        minH: 54,
        minW: 18,
        placeholder: {
          nl: '',
          en: '',
        },
        borderTop: true,
        borderRight: true,
        borderBottom: true,
        borderLeft: true,
        title: {
          nl: 'My publications',
          en: 'My publications',
        },
        label: {
          nl: '',
          en: '',
        },
        text: {
          nl: '<p>You must login</p>\n',
          en: '<p>You must login</p>\n',
        },
        videoFormat: false,
        i: '9',
        static: false,
      },
      {
        uuid: 'a261f979d7574d31867e854f4c186dc4',
        widgetType: 12,
        x: 0,
        y: 449,
        h: 54,
        w: 18,
        minH: 54,
        minW: 18,
        placeholder: {
          nl: '',
          en: '',
        },
        borderTop: false,
        borderRight: false,
        borderBottom: false,
        borderLeft: false,
        title: {
          nl: 'a',
          en: 'a',
        },
        label: {
          nl: '',
          en: '',
        },
        text: {
          nl: '<p>a</p>\n',
          en: '<p>a</p>\n',
        },
        videoFormat: false,
        i: '10',
        static: false,
      },
      {
        uuid: '25c853a93fd740f78cdada8dcef16b60',
        widgetType: 7,
        x: 0,
        y: 393,
        h: 56,
        w: 21,
        minH: 45,
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
          nl: 'Taxonimi Widget',
          en: 'Taxonimi Widget',
        },
        label: {
          nl: '',
          en: '',
        },
        text: {
          nl: '',
          en: '',
        },
        videoFormat: false,
        i: '11',
        static: false,
      },
      {
        uuid: 'bf5288be733a4576b7feceecd71c8260',
        widgetType: 4,
        x: 12,
        y: 665,
        h: 54,
        w: 6,
        minH: 54,
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
          nl: 'Kpi Widget',
          en: 'Kpi Widget',
        },
        label: {
          nl: '',
          en: '',
        },
        text: {
          nl: '',
          en: '',
        },
        videoFormat: false,
        i: '12',
        static: false,
      },
      {
        uuid: '385c56f896bd4c20b99516349e17569d',
        widgetType: 13,
        x: 0,
        y: 231,
        h: 54,
        w: 18,
        minH: 54,
        minW: 18,
        placeholder: {
          nl: '',
          en: '',
        },
        borderTop: true,
        borderRight: true,
        borderBottom: true,
        borderLeft: true,
        title: {
          nl: 'Favorites',
          en: 'Favorites',
        },
        label: {
          nl: '',
          en: '',
        },
        text: {
          nl: '',
          en: '',
        },
        videoFormat: false,
        i: '13',
        static: false,
      },
      {
        uuid: 'bb626e81024f412484bf67e20e51eeba',
        widgetType: 6,
        x: 12,
        y: 557,
        h: 54,
        w: 6,
        minH: 45,
        minW: 6,
        placeholder: {
          nl: '',
          en: '',
        },
        fontColor: '#000',
        borderTop: false,
        borderRight: false,
        borderBottom: false,
        borderLeft: false,
        title: {
          nl: 'Banner Widget',
          en: 'Banner Widget',
        },
        label: {
          nl: 'Banner',
          en: 'Banner',
        },
        internal: true,
        type: 0,
        text: {
          nl: 'Banner Widget Text',
          en: 'Banner Widget Text',
        },
        image: '',
        url: 'home',
        isButtonVisible: true,
        openNewTab: true,
        videoFormat: false,
        i: '14',
        static: false,
      },
      {
        uuid: '93fbecf6f98a489a8d6d9b78c8597c0a',
        widgetType: 2,
        x: 12,
        y: 503,
        h: 54,
        w: 6,
        minH: 54,
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
          nl: 'Publication Widget',
          en: 'ggg',
        },
        display: 'horizontal',
        publications: [
          {
            id: null,
            journalId: null,
            title: null,
            author: null,
            type: null,
            cover: null,
            taxonomy: null,
            eans: null,
            journalTitle: null,
            databaseTitle: null,
            readings: 0,
          },
        ],
        label: {
          nl: '',
          en: '',
        },
        text: {
          nl: '',
          en: '',
        },
        videoFormat: false,
        i: '15',
        static: false,
      },
      {
        uuid: 'c7186f379aac45f894be7dbbf7f751f8',
        widgetType: 1,
        x: 13,
        y: 719,
        h: 54,
        w: 6,
        minH: 54,
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
          nl: 'Catalog  Widget 2',
          en: 'dd',
        },
        display: 'horizontal',
        typeOfPublication: 0,
        sortBy: 0,
        label: {
          nl: '',
          en: '',
        },
        text: {
          nl: '',
          en: '',
        },
        videoFormat: false,
        i: '16',
        static: false,
      },
      {
        uuid: '61515c05804e41ab9d1049b8891b0938',
        widgetType: 1,
        x: 0,
        y: 177,
        h: 54,
        w: 16,
        minH: 54,
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
          nl: 'Catalog Widget',
          en: 'ddf',
        },
        display: 'horizontal',
        typeOfPublication: 0,
        sortBy: 0,
        label: {
          nl: '',
          en: '',
        },
        text: {
          nl: '',
          en: '',
        },
        image: '',
        videoFormat: false,
        i: '17',
        static: false,
      },
      {
        uuid: '1a3bc9833e014cd997cdf64810535c6a',
        widgetType: 12,
        x: 0,
        y: 45,
        h: 54,
        w: 18,
        minH: 54,
        minW: 18,
        placeholder: {
          nl: '',
          en: '',
        },
        borderTop: false,
        borderRight: false,
        borderBottom: false,
        borderLeft: false,
        title: {
          nl: 'MY PUBLICATION with empty text',
          en: 'MY PUBLICATION with empty text',
        },
        label: {
          nl: '',
          en: '',
        },
        text: {
          nl: '<p>ggg</p>\n',
          en: '<p>ggg</p>\n',
        },
        videoFormat: false,
        i: '18',
        static: false,
      },
      {
        uuid: 'd6a944a6e8f74aa6a1780bb16ac9f410',
        widgetType: 3,
        x: 18,
        y: 0,
        h: 54,
        w: 6,
        minH: 24,
        minW: 6,
        placeholder: {
          nl: 'Search Widgetrrr',
          en: 'Search Widgetrrr',
        },
        borderTop: false,
        borderRight: false,
        borderBottom: false,
        borderLeft: false,
        title: {
          nl: '',
          en: '',
        },
        label: {
          nl: '',
          en: '',
        },
        text: {
          nl: '',
          en: '',
        },
        image: '',
        videoFormat: false,
        i: '19',
        static: false,
      },
      {
        uuid: '7b50c244ca30453587648c408e8e529b',
        widgetType: 13,
        x: 0,
        y: 123,
        h: 54,
        w: 18,
        minH: 54,
        minW: 18,
        placeholder: {
          nl: '',
          en: '',
        },
        borderTop: false,
        borderRight: false,
        borderBottom: false,
        borderLeft: false,
        title: {
          nl: 'Favorites',
          en: 'Favorites',
        },
        label: {
          nl: '',
          en: '',
        },
        text: {
          nl: '',
          en: '',
        },
        videoFormat: false,
        i: '20',
        static: false,
      },
    ],
  },
};

function setup(props: any): any {
  const enzymeWrapper: ShallowWrapper = shallow(
    <AllWidgetsFields {...props} />
  );
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

  // it('save button only enables when some field change set', () => {
  //   const { enzymeWrapper } = setup(initProps);
  //   enzymeWrapper.find('WidgetTextField').forEach((e: any) => {
  //     e.shallow().forEach((d: any) => {
  //       const originalSaveButton: ShallowWrapper = enzymeWrapper.find('#save-button');
  //       expect(originalSaveButton.prop('disabled')).toBe(true);
  //       const enField = d.find('[id^="text-field-en"]');
  //       enField.simulate('change', { target: { value: 'field EN' } });
  //       const saveButton: ShallowWrapper = enzymeWrapper.find('#save-button');
  //       expect(saveButton.prop('disabled')).toBe(false);
  //       enField.simulate('change', { target: { value: '' } });
  //     });
  //   });
  // });

  it('cancel button should close dialog without data', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onCloseDialog.mockClear();
    const cancelButton: ShallowWrapper = enzymeWrapper.find('#cancel-button');
    cancelButton.simulate('click');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);
    expect(props.onCloseDialog.mock.calls[0][0]).toBe();
  });

  it('close dialog should close dialog without data', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onCloseDialog.mockClear();
    const dialog: ShallowWrapper = enzymeWrapper.find('#dialog-page-creation');
    dialog.simulate('close');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);
    expect(props.onCloseDialog.mock.calls[0][0]).toBe();
  });

  it('close button should close dialog without data', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onCloseDialog.mockClear();
    const cancelButton: ShallowWrapper = enzymeWrapper.find('#close-button');
    cancelButton.simulate('click');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);
    expect(props.onCloseDialog.mock.calls[0][0]).toBe();
  });

  it('save button should close dialog with data', () => {
    const { enzymeWrapper, props } = setup(initProps);
    props.onCloseDialog.mockClear();
    enzymeWrapper.find('WidgetTextField').forEach((e: any) => {
      e.shallow().forEach((d: any) => {
        const enField = d.find('[id^="text-field-en"]');
        enField.simulate('change', { target: { value: 'field EN' } });
      });
    });
    const form: ShallowWrapper = enzymeWrapper.find('#all-widgets-form');
    form.simulate('submit');
    expect(props.onCloseDialog.mock.calls.length).toBe(1);
    expect(props.onCloseDialog.mock.calls[0][0]).toEqual({
      widgetTranslations: [
        {
          uuid: '8b9e92dc01994f3aaf1e9391347d5952',
          title: { nl: 'Test Color Picker', en: 'Test Color Picker' },
          placeholder: { nl: '', en: '' },
          text: { nl: 'text ', en: 'field EN' },
          url: 'home',
          label: { nl: '', en: '' },
        },
        {
          uuid: 'fbf4e27779534d8c95ee4689f40e7f48',
          title: { nl: 'Promotion Widgett___', en: 'field EN' },
          placeholder: { nl: '', en: '' },
          text: { nl: '', en: '' },
          label: { nl: '', en: '' },
        },
        {
          uuid: 'c28a0ea205a441adb7d3a5b89637565c',
          title: { nl: 'Events Widget____dzsfgzdgf', en: 'field EN' },
          placeholder: { nl: '', en: '' },
          text: { nl: '', en: '' },
          label: { nl: '', en: '' },
        },
        {
          uuid: '9e23edfb3d6042a298b4ff9d02290128',
          title: { nl: 'Read On Widget', en: 'field EN' },
          placeholder: { nl: '', en: '' },
          text: { nl: '', en: '' },
          label: { nl: '', en: '' },
        },
        {
          uuid: '1b9640d86cd34c25a64696c430bf291d',
          title: { nl: 'News Widget_pppp', en: 'field EN' },
          placeholder: { nl: '', en: '' },
          text: { nl: '', en: '' },
          label: { nl: '', en: '' },
        },
        {
          uuid: '2eafa9b1dce5450c9577c7605dbaae25',
          title: { nl: 'Flat text only english', en: 'field EN' },
          placeholder: { nl: '', en: '' },
          text: {
            nl: '<p><span style="color: rgba(0,0,0,0.87);background-color: rgb(255,255,255);font-size: medium;font-family: objektiv-mk2, sans-serif;">Text of flat text only english</span>&nbsp;</p>\n',
            en: '<p><span style="color: rgba(0,0,0,0.87);background-color: rgb(255,255,255);font-size: medium;font-family: objektiv-mk2, sans-serif;">Text of flat text only english</span>&nbsp;</p>\n',
          },
          label: { nl: '', en: '' },
        },
        {
          uuid: 'b6eaf3123b6a49b4854c7712840f82ca',
          title: { nl: 'Banner Widget 2', en: 'Banner Widget 2' },
          placeholder: { nl: '', en: '' },
          text: { nl: 'Banner Widget 2', en: 'Banner Widget 2' },
          url: 'www.google.com',
          label: { nl: 'button 2', en: 'field EN' },
        },
        {
          uuid: 'dbe25bc2f8c04c528fc79d29830e7dbf',
          title: { nl: 'Flat Text Widget', en: 'field EN' },
          placeholder: { nl: '', en: '' },
          text: {
            nl: '<p>Flat Text Widget <strong>NL</strong></p>\n',
            en: '<p>aaa</p>\n',
          },
          label: { nl: '', en: '' },
        },
        {
          uuid: 'de5abd647de548b498471f40dbf3118b',
          title: { nl: 'Title My Publications Widget', en: 'field EN' },
          placeholder: { nl: '', en: '' },
          text: { nl: '<p>sdrfgdsfgh</p>\n', en: '<p>ttt</p>\n' },
          label: { nl: '', en: '' },
        },
        {
          uuid: '82b2b044f6fe464c987012531f11ed8e',
          title: { nl: 'My publications', en: 'field EN' },
          placeholder: { nl: '', en: '' },
          text: {
            nl: '<p>You must login</p>\n',
            en: '<p>You must login</p>\n',
          },
          label: { nl: '', en: '' },
        },
        {
          uuid: 'a261f979d7574d31867e854f4c186dc4',
          title: { nl: 'a', en: 'field EN' },
          placeholder: { nl: '', en: '' },
          text: { nl: '<p>a</p>\n', en: '<p>a</p>\n' },
          label: { nl: '', en: '' },
        },
        {
          uuid: '25c853a93fd740f78cdada8dcef16b60',
          title: { nl: 'Taxonimi Widget', en: 'field EN' },
          placeholder: { nl: '', en: '' },
          text: { nl: '', en: '' },
          label: { nl: '', en: '' },
        },
        {
          uuid: 'bf5288be733a4576b7feceecd71c8260',
          title: { nl: 'Kpi Widget', en: 'field EN' },
          placeholder: { nl: '', en: '' },
          text: { nl: '', en: '' },
          label: { nl: '', en: '' },
        },
        {
          uuid: 'bb626e81024f412484bf67e20e51eeba',
          title: { nl: 'Banner Widget', en: 'Banner Widget' },
          placeholder: { nl: '', en: '' },
          text: { nl: 'Banner Widget Text', en: 'Banner Widget Text' },
          url: 'home',
          label: { nl: 'Banner', en: 'field EN' },
        },
        {
          uuid: '93fbecf6f98a489a8d6d9b78c8597c0a',
          title: { nl: 'Publication Widget', en: 'field EN' },
          placeholder: { nl: '', en: '' },
          text: { nl: '', en: '' },
          label: { nl: '', en: '' },
        },
        {
          uuid: 'c7186f379aac45f894be7dbbf7f751f8',
          title: { nl: 'Catalog  Widget 2', en: 'field EN' },
          placeholder: { nl: '', en: '' },
          text: { nl: '', en: '' },
          label: { nl: '', en: '' },
        },
        {
          uuid: '61515c05804e41ab9d1049b8891b0938',
          title: { nl: 'Catalog Widget', en: 'field EN' },
          placeholder: { nl: '', en: '' },
          text: { nl: '', en: '' },
          label: { nl: '', en: '' },
        },
        {
          uuid: '1a3bc9833e014cd997cdf64810535c6a',
          title: { nl: 'MY PUBLICATION with empty text', en: 'field EN' },
          placeholder: { nl: '', en: '' },
          text: { nl: '<p>ggg</p>\n', en: '<p>ggg</p>\n' },
          label: { nl: '', en: '' },
        },
        {
          uuid: 'd6a944a6e8f74aa6a1780bb16ac9f410',
          title: { nl: '', en: '' },
          placeholder: { nl: 'Search Widgetrrr', en: 'field EN' },
          text: { nl: '', en: '' },
          label: { nl: '', en: '' },
        },
      ],
    });
  });
});
