import { Resource } from 'i18next';

// Object passed to i18n must have i18next Resource properties.
// Extending Resource we can define a common interface for all our locales to translate.
export interface I18nLocale extends Resource {
  translations: {
    buttons: {
      preview: string;
      publish: string;
      chooseFile: string;
      revert: string;
      removePermanent: string;
      deletePermanent: string;
      remove: string;
      cancel: string;
      continue: string;
      save: string;
      new: string;
      addImage: string;
      settings: string;
      visible: string;
      hidden: string;
      edit: string;
      sure: string;
      reload: string;
      video: string;
      text: string;
      translations: string;
      AllWidgets: string;
      MaxMenuItems7: string;
    };
    placeholders: {
      searchPublications: string;
      requiredField: string;
      confirm: string;
      all: string;
      placeholder: string;
    };
    sortBy: {
      lastAdded: string;
      alphabetic: string;
      lastPublished: string;
      mostRead: string;
    };
    tableHeaders: {
      actions: string;
      status: string;
      published: string;
      modified: string;
      draft: string;
      locked: string;
      dialog: {
        title: string;
        desc1: string;
        desc2: string;
      };
    };
    header: {
      title: string;
      managePortals: string;
      home: string;
    };
    portals: {
      title: string;
    };
    journals: {
      title: string;
    };
    databases: {
      title: string;
    };
    sidebar: {
      portals: string;
      journals: string;
      databases: string;
      home: string;
      catalog: string;
      layout: string;
      themes: string;
      pages: string;
      appearance: string;
      news: string;
      events: string;
      management: string;
      statistics: string;
      subscriptions: string;
      users: string;
      themeSettings: string;
      themeCatalog: string;
      themePages: string;
      calendarNews: string;
    };
    themes: {
      title: string;
      error: string;
      creationDialog: {
        title: string;
        name: string;
        visible: string;
        hidden: string;
      };
    };
    themesCatalog: {
      publications: string;
      taxonomy: string;
      details: string;
      recovery: string;
      publish: string;
    };
    themePages: {
      title: string;
      creationDialog: {
        title: string;
      };
    };
    settings: {
      title: string;
      name: string;
      domain: string;
      clientId: string;
      favicon: string;
      logo: string;
      background: string;
      colorSettings: string;
      primaryColor: string;
      secondaryColor: string;
      mainMenuColor: string;
      secondaryMenuColor: string;
      fontSettings: string;
      primaryFont: string;
      secondaryFont: string;
      portalMenu: string;
      menuItemsOnBookPages: string;
      interfaceElements: string;
      removePortal: string;
      deleteMessage: string;
      menuItemTitle: string;
      menuItemController: string;
      menuItemTheme: string;
      menuItemPage: string;
      menuItemLabel: string;
      menuItemNews: string;
      menuEntries: {
        pages: string;
        news: string;
        themes: string;
        catalog: string;
        themeIndex: string;
        newsIndex: string;
        calendarNews: string;
        persons: string;
      };
      relatedPublications: string;
      catalogAsHomePage: string;
      videos: string;
      availableEditions: string;
      eLearning: string;
      groupAccess: string;
      fullTextSearch: string;
      languageSelector: string;
      hidden: string;
      visible: string;
    };
    pages: {
      title: string;
      creationDialog: {
        title: string;
        name: string;
        permalink: string;
        seoTitle: string;
        seoDescription: string;
        preventLanguageChange: string;
        currentLanguageHelper: string;
        language: string;
        portalSettings: string;
        addPage: string;
      };
      addWidget: string;
      layoutEditing: {
        portalName: string;
        menuItems: string;
        login: string;
      };
      deletePage: string;
      deleteMessage: string;
      widgetTranslations: {
        title: string;
        copyTitle: string;
        copyAlert: string;
        agree: string;
        disagree: string;
        PortalDefaultLanguage: string;
        language: {
          en: string;
          nl: string;
        };
        errors: {
          isRequired: string;
          isRequiredWhen: string;
          languageIsNotEmpty: string;
          and: string;
          translationsMustBeDifferent: string;
        };
      };
      alerts: {
        publishSuccess: string;
        revertSuccess: string;
        blocked: string;
      };
      confirmRevert1: string;
      confirmRevert2: string;
      revertTitle: string;
    };
    portal: {
      creationDialog: {
        title: string;
        name: string;
      };
    };
    journal: {
      creationDialog: {
        title: string;
        name: string;
      };
    };
    journalSettings: {
      journalName: string;
      journalMenu: string;
      deleteJournal: string;
      deleteMessage: string;
      headerBackground: string;
      journalSelector: string;
      selector: string;
      journalCover: string;
      journalSettings: string;
      description: string;
      licenses: string;
      openAccess: string;
    };
    database: {
      creationDialog: {
        title: string;
        name: string;
      };
    };
    databaseSettings: {
      databaseName: string;
      deleteDatabase: string;
      deleteMessage: string;
      databaseSettings: string;
      description: string;
      databaseSelector: string;
      selector: string;
      databaseCover: string;
      databaseCssFile: string;
      licenses: string;
      databaseUrl: string;
    };
    calendarNews: {
      creationDialog: {
        title: string;
        name: string;
      };
    };
    calendarNewSettings: {
      calendarNewName: string;
      calendarNewMenu: string;
      deleteCalendarNew: string;
      deleteMessage: string;
      headerBackground: string;
      calendarNewSelector: string;
      selector: string;
      calendarNewCover: string;
      calendarNewSettings: string;
      description: string;
      licenses: string;
      openAccess: string;
    };
    themeSettings: {
      themeName: string;
      size: string;
      themeLink: string;
      addHeaderImage: string;
      addLogoImage: string;
      description: string;
      addPreviewImage: string;
      headerBackground: string;
      themeMenu: string;
      colorSettings: string;
      newItemMenu: string;
      deteleTheme: string;
      deleteMessage: string;
    };
    themeFilters: {
      openAccessContent: string;
      onlyOpenAccess: string;
      allContent: string;
      publicationType: string;
      book: string;
      journal: string;
      journalArticle: string;
      databases: string;
      databasesArticle: string;
      year: string;
    };
    catalog: {
      title: string;
    };
    news: {
      title: string;
      searchFilterPH: string;
      onlyEventFilter: string;
      domainFilter: string;
      addNews: string;
      titleField: string;
      eventDate: string;
      visibleOn: string;
      hideDate: string;
      relatedPublications: string;
      relatedTaxonomies: string;
      videos: string;
      availableEditions: string;
      eLearning: string;
      groupAccess: string;
      fullTextSearch: string;
      languageSelector: string;
      deleteMessage: string;
      calendarNews: string;
      subtitle: string;
      authors: string;
      language: string;
      note: string;
      english: string;
      dutch: string;
    };

    widgets: {
      title: {
        select: string;
        banner: string;
        text: string;
        taxonomy: string;
        events: string;
        news: string;
        publications: string;
        readOn: string;
        kpi: string;
        search: string;
        catalog: string;
        promotion: string;
        myPublications: string;
        favorites: string;
        calendarNews: string;
        mySubscriptions: string;
      };
      readOn: string;
      catalog: string;
      promotion: string;
      publications: string;
      search: string;
      kpi: string;
      text: string;
      banner: string;
      taxonomy: string;
      events: string;
      news: string;
      myPublications: string;
      favorites: string;
      calendarNews: string;
      mySubscriptions: string;
      deleteDialog: {
        title: string;
        description: string;
        label: string;
      };
    };
    banner: {
      title: string;
      controller: string;
      label: string;
      internal: string;
      external: string;
      fixed: string;
      scalable: string;
      text: string;
      url: string;
      border: string;
      fontColor: string;
      backgroundColor: string;
      openNewTab: string;
    };
    catalogWidget: {
      title: string;
      publicationType: string;
      sortBy: string;
      border: string;
      fontColor: string;
      backgroundColor: string;
    };
    promotionWidget: {
      title: string;
      publicationType: string;
      sortBy: string;
      border: string;
      fontColor: string;
      backgroundColor: string;
    };
    taxonomy: {
      title: string;
      backgroundColor: string;
      border: string;
    };
    event: {
      calendar: string;
      list: string;
      eventTitle: string;
      newsTitle: string;
    };
    publication: {
      vertical: string;
      horizontal: string;
      matrix: string;
      display: string;
      title: string;
      publications: string;
      backgroundColor: string;
      warning: string;
    };
    myPublications: {
      title: {
        title: string;
        defaultValue: string;
      };
      controller: string;
      label: string;
      internal: string;
      external: string;
      text: {
        title: string;
        defaultValue: string;
      };
      url: string;
      border: string;
      fontColor: string;
      backgroundColor: string;
      openNewTab: string;
      titleNotLogged: {
        title: string;
        defaultValue: string;
      };
      noAvailablePublications: {
        title: string;
        defaultValue: string;
      };
      catalogLink: {
        title: string;
        defaultValue: string;
      };
      activationTitle: {
        title: string;
        defaultValue: string;
      };
      activationDescription: {
        title: string;
        defaultValue: string;
      };
      activationFieldPlaceholder: {
        title: string;
        defaultValue: string;
      };
      loggedOut: {
        title: string;
        message: string;
      };
      loggedIn: {
        title: string;
        message: string;
      };
    };
    mySubscriptions: {
      title: {
        title: string;
        defaultValue: string;
      };
      controller: string;
      label: string;
      internal: string;
      external: string;
      text: {
        title: string;
        defaultValue: string;
      };
      url: string;
      border: string;
      fontColor: string;
      backgroundColor: string;
      openNewTab: string;
      titleNotLogged: {
        title: string;
        defaultValue: string;
      };
      noAvailableSubscriptions: {
        title: string;
        defaultValue: string;
      };
      catalogLink: {
        title: string;
        defaultValue: string;
      };
      activationTitle: {
        title: string;
        defaultValue: string;
      };
      activationDescription: {
        title: string;
        defaultValue: string;
      };
      activationFieldPlaceholder: {
        title: string;
        defaultValue: string;
      };
      loggedOut: {
        title: string;
        message: string;
      };
      loggedIn: {
        title: string;
        message: string;
      };
    };
  };
}
