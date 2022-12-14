import { I18nLocale } from '../models/locales.model';

export const nl: I18nLocale = {
  translations: {
    buttons: {
      preview: 'Preview',
      publish: 'Publish',
      chooseFile: 'Choose file',
      revert: 'Revert',
      removePermanent: 'Remove permanently',
      deletePermanent: 'Delete permanently',
      remove: 'Remove',
      cancel: 'Cancel',
      continue: 'Continue',
      save: 'Save',
      new: 'New',
      addImage: 'Add image',
      settings: 'Settings',
      visible: 'Visible',
      hidden: 'Hidden',
      edit: 'Edit',
      sure: 'Yes, I am sure',
      reload: 'Reload',
      video: 'Video',
      text: 'Text',
      translations: 'Text Translations',
      AllWidgets: 'Add widget texts',
      MaxMenuItems7: 'Max menu items 7',
    },
    placeholders: {
      searchPublications: 'Search publications',
      requiredField: 'Required field',
      confirm: 'Are you sure?',
      all: 'All',
      placeholder: 'Placeholder',
    },
    sortBy: {
      lastAdded: 'Last added',
      alphabetic: 'Alphabetic',
      lastPublished: 'Last Published',
      mostRead: 'Most read',
    },
    tableHeaders: {
      actions: 'Actions',
      status: 'Status',
      published: 'Published',
      modified: 'Modified',
      draft: 'Draft',
      locked: 'Locked',
      dialog: {
        title: 'Locked for editing',
        desc1: 'This page is locked by ',
        desc2: " and can't be edited by you until it has been unlocked",
      },
    },
    header: {
      title: 'BoomPublish',
      managePortals: 'Manage Portals',
      home: 'Home',
    },
    portals: {
      title: 'Select portal',
    },
    journals: {
      title: 'Select journal',
    },
    databases: {
      title: 'Select database',
    },
    sidebar: {
      portals: 'Portals',
      journals: 'Journals',
      databases: 'Databases',
      home: 'Settings',
      catalog: 'Catalog',
      layout: 'Layout',
      themes: 'Themes',
      pages: 'Pages',
      appearance: 'Appearance',
      news: 'News',
      events: 'Events',
      management: 'MANAGEMENT',
      statistics: 'Statistics',
      subscriptions: 'Subscriptions',
      users: 'Users',
      themeCatalog: 'Catalog',
      themeSettings: 'Settings',
      themePages: 'Pages',
      calendarNews: 'Calendar news',
    },
    themes: {
      title: 'Manage themes',
      error: 'Themes not found',
      creationDialog: {
        title: 'Create new theme',
        name: 'Theme name',
        visible: 'Visible',
        hidden: 'Hidden',
      },
    },
    themesCatalog: {
      publications: 'Publications',
      taxonomy: 'Taxonomy',
      details: 'Details',
      recovery: 'Recovery',
      publish: 'Publish',
    },
    themePages: {
      title: ' manage',
      creationDialog: {
        title: 'Create new theme page',
      },
    },
    settings: {
      title: 'Portal settings',
      name: 'Site name',
      domain: 'Domain',
      clientId: 'ClientID',
      favicon: 'Add favicon',
      logo: 'Add logo',
      background: 'Add background',
      colorSettings: 'Color settings',
      primaryColor: 'Primary color',
      secondaryColor: 'Secondary color',
      mainMenuColor: 'Main menu color',
      secondaryMenuColor: 'Secondary menu color',
      fontSettings: 'Font settings',
      primaryFont: 'Primary font',
      secondaryFont: 'Secondary font',
      portalMenu: 'Portal menu',
      menuItemsOnBookPages: 'Menu items on book pages',
      interfaceElements: 'Interface elements',
      removePortal: 'Remove portal',
      deleteMessage:
        'You are going to permanently delete this theme and everything under, would you like to continue?',
      menuItemTitle: 'Add menu item',
      menuItemController: 'Controller',
      menuItemTheme: 'Theme',
      menuItemLabel: 'Label',
      menuItemPage: 'Page',
      menuItemNews: 'News',
      menuEntries: {
        pages: 'pages',
        news: 'news',
        themes: "theme's",
        catalog: 'catalogs',
        themeIndex: 'theme index',
        newsIndex: 'news index',
        calendarNews: 'calendar news',
        persons: 'persons catalog',
      },
      relatedPublications: 'Related',
      catalogAsHomePage: 'Use catalog as homepage',
      videos: 'Videos',
      availableEditions: 'Available editions',
      eLearning: 'e-Learning',
      groupAccess: 'Group access',
      fullTextSearch: 'Full-text search',
      languageSelector: 'Language selector',
      hidden: 'Hidden',
      visible: 'Visible',
    },
    pages: {
      title: 'Manage pages',
      creationDialog: {
        title: 'Page settings',
        name: 'Page name',
        permalink: 'Permalink',
        seoTitle: 'SEO title',
        seoDescription: 'SEO description',
        preventLanguageChange:
          'When adding pages, the portal default language can no longer be changed.',
        currentLanguageHelper:
          'The language is set to <strong>{{language}}</strong>. This can be changed in the',
        language: 'Dutch',
        portalSettings: 'portal settings',
        addPage: 'Add page',
      },
      addWidget: 'Add widget',
      layoutEditing: {
        portalName: 'Portal name',
        menuItems: 'Menuitems',
        login: 'Login',
      },
      deletePage: 'Delete page',
      deleteMessage:
        'You are going to permanently delete this page and everything under, would you like to continue?',
      widgetTranslations: {
        title: 'Text translations',
        copyTitle: 'Kopieer uit Nederlandse tekstvelden',
        copyAlert:
          'Weet je zeker dat je alle tekst uit het Nederlands wilt kopiëren en de huidige Engelse tekst wilt verwijderen?',
        agree: 'Akkoord',
        disagree: 'Oneens',
        PortalDefaultLanguage: 'Portal default language:',
        language: {
          en: 'English',
          nl: 'Nederlands',
        },
        errors: {
          isRequired: 'is Required',
          isRequiredWhen: 'is required when',
          languageIsNotEmpty: 'language is not empty',
          and: 'and',
          translationsMustBeDifferent: 'Translations must be different',
        },
      },
      alerts: {
        publishSuccess: 'Page has successfully been published',
        revertSuccess: 'Page has been reverted',
        blocked:
          'While you’re editing this page, it will be locked for others to edit. Publish or revert the page if you want to make it available for editing by others.',
      },
      confirmRevert1:
        'You’re about to revert this page to the version published on ',
      confirmRevert2: '. Do you want to continue?',
      revertTitle: 'Revert changes',
    },
    portal: {
      creationDialog: {
        title: 'Create new portal',
        name: 'Portal name',
      },
    },
    journal: {
      creationDialog: {
        title: 'Create new journal content',
        name: 'Journal name',
      },
    },
    journalSettings: {
      journalName: 'Journal name',
      journalMenu: 'Journal menu',
      deleteJournal: 'Delete journal',
      deleteMessage:
        'You are going to permanently delete this journal and everything under, would you like to continue?',
      headerBackground: 'Header background',
      journalSelector: 'Select journal from catalog',
      selector: 'Select journal',
      description: 'Description',
      journalCover: 'Add cover',
      journalSettings: 'Journal settings',
      licenses: 'Licenses',
      openAccess: 'Open access',
    },
    database: {
      creationDialog: {
        title: 'Create new database',
        name: 'Database name',
      },
    },
    databaseSettings: {
      databaseName: 'Database name',
      deleteDatabase: 'Delete database',
      deleteMessage:
        'You are going to permanently delete this database and everything under, would you like to continue?',
      databaseSettings: 'Database settings',
      databaseSelector: 'Select database from catalog',
      selector: 'Select database',
      description: 'Description',
      databaseCover: 'Add cover',
      databaseCssFile: 'Add CSS',
      licenses: 'Licenses',
      databaseUrl: 'Database url',
    },
    calendarNews: {
      creationDialog: {
        title: 'Create new calendar database',
        name: 'Calendar database name',
      },
    },
    calendarNewSettings: {
      calendarNewName: 'Calendar new name',
      calendarNewMenu: 'Calendar new menu',
      deleteCalendarNew: 'Delete calendar new',
      deleteMessage:
        'You are going to permanently delete this calendar new and everything under, would you like to continue?',
      headerBackground: 'Header background',
      calendarNewSelector: 'Select database from catalog',
      selector: 'Select calendar new',
      calendarNewCover: 'Add cover',
      calendarNewSettings: 'Calendar new settings',
      description: 'Description',
      licenses: 'Licenses',
      openAccess: 'Open access',
    },
    themeSettings: {
      themeName: 'Theme name',
      size: 'Size',
      themeLink: 'Permalink',
      addHeaderImage: 'Add header image',
      addLogoImage: 'Add logo image',
      description: 'Description',
      addPreviewImage: 'Add preview image',
      headerBackground: 'Header background',
      themeMenu: 'Theme menu',
      newItemMenu: 'New item menu',
      deteleTheme: 'Delete theme',
      colorSettings: 'Color setting',
      deleteMessage:
        'You are going to permanently delete this theme and everything under, would you like to continue?',
    },
    themeFilters: {
      openAccessContent: 'Open access content',
      onlyOpenAccess: 'Only open access',
      allContent: 'All content',
      publicationType: 'Publication type',
      book: 'Book',
      journal: 'Journal',
      journalArticle: 'Journal article',
      databases: 'Databases',
      databasesArticle: 'Databases article',
      year: 'Year',
    },
    catalog: {
      title: 'Catalog',
    },
    news: {
      title: 'News',
      searchFilterPH: 'Search',
      onlyEventFilter: 'Only events',
      domainFilter: 'Domains',
      addNews: 'Add news',
      titleField: 'Title',
      eventDate: 'Event date',
      visibleOn: 'Show',
      hideDate: 'Hide',
      relatedPublications: 'Related publications',
      relatedTaxonomies: 'Related taxonomies',
      videos: 'Videos',
      availableEditions: 'Available editions',
      eLearning: 'e-Learning',
      groupAccess: 'Group access',
      fullTextSearch: 'Full-text search',
      languageSelector: 'Language selector',
      deleteMessage:
        'You are going to permanently delete this news and everything under, would you like to continue?',
      calendarNews: 'Calendar news',
      subtitle: 'Subtitle',
      authors: 'Authors',
      language: 'Language',
      note: 'Note',
      english: 'English',
      dutch: 'Dutch',
    },
    widgets: {
      title: {
        select: 'Select widget type',
        banner: 'Banner Widget',
        text: 'Text Widget',
        taxonomy: 'Taxonomy Widget',
        events: 'Events Widget',
        news: 'News Widget',
        publications: 'Publications Widget',
        readOn: 'Read On Widget',
        kpi: 'Kpi Widget',
        search: 'Search Widget',
        catalog: 'Catalog Widget',
        promotion: 'Promotion Widget',
        myPublications: 'My Publications Widget',
        favorites: 'Favorites Widget',
        calendarNews: 'Calendar News Widget',
        mySubscriptions: 'My Subscriptions Widget',
      },
      readOn: 'Read On',
      catalog: 'Catalog',
      promotion: 'Promotion',
      publications: 'Publications',
      search: 'Search',
      kpi: 'KPI',
      text: 'Flat text',
      banner: 'Banner',
      taxonomy: 'Taxonomy',
      events: 'Events',
      news: 'News',
      myPublications: 'My Publications',
      favorites: 'Favorites',
      calendarNews: 'Calendar News Widget',
      mySubscriptions: 'My Subscriptions',
      deleteDialog: {
        title: 'Delete widget',
        description: 'The widget will be deleted permanently.',
        label: 'Delete',
      },
    },
    banner: {
      title: 'Title',
      controller: 'Controller',
      label: 'Button',
      internal: 'Internal',
      external: 'External',
      fixed: 'Fixed',
      scalable: 'Scalable',
      text: 'Text',
      url: 'URL',
      border: 'Border',
      fontColor: 'Font color',
      backgroundColor: 'Background color',
      openNewTab: 'Open in new window',
    },
    catalogWidget: {
      title: 'Title',
      publicationType: 'Publication type',
      sortBy: 'Sort by',
      border: 'Border',
      fontColor: 'Font color',
      backgroundColor: 'Background color',
    },
    promotionWidget: {
      title: 'Title',
      publicationType: 'Publication type',
      sortBy: 'Sort by',
      border: 'Border',
      fontColor: 'Font color',
      backgroundColor: 'Background color',
    },
    taxonomy: {
      title: 'Taxonomy widget',
      backgroundColor: 'Background color',
      border: 'Border',
    },
    event: {
      calendar: 'Calendar',
      list: 'List',
      eventTitle: 'Events',
      newsTitle: 'News',
    },
    publication: {
      vertical: 'Vertical',
      horizontal: 'Horizontal',
      matrix: 'Matrix',
      display: 'Display',
      title: 'Title',
      publications: 'Publications',
      backgroundColor: 'Background color',
      warning:
        'Deze widget kan alleen in Themepagina’s gebruikt worden. In andere pagina’s bestaat het risico dat de widget leeg is.',
    },
    myPublications: {
      title: {
        title: 'Title',
        defaultValue: 'Mijn publicaties'
      },
      controller: 'Controller',
      label: 'Button',
      internal: 'Internal',
      external: 'External',
      text: {
        title: 'Text',
        defaultValue: 'To see your publications, you need to login first.'
      },
      url: 'URL',
      border: 'Border',
      fontColor: 'Font color',
      backgroundColor: 'Background color',
      openNewTab: 'Open in new window',
      titleNotLogged: {
        title: 'Title',
        defaultValue: 'Welkom op Boomportaal'
      },
      noAvailablePublications:  {
        title: 'No available publications',
        defaultValue: 'Er zijn nog geen publicaties toegevoegd aan je account'
      },
      catalogLink: {
        title: 'Catalog link',
        defaultValue: 'Toon al mijn publicaties'
      },
      activationTitle: {
        title: 'Activation title',
        defaultValue: 'Toegang activeren'
      },
      activationDescription: {
        title: 'Activation description',
        defaultValue: 'Abonnementen toevoegen met activatiecode'
      },
      activationFieldPlaceholder: {
        title: 'Activation field placeholder',
        defaultValue: 'Voer activatiecode in'
      },
      loggedOut: {
        title: "Logged out",
        message: "These elements are shown when a visitor is logged out."
      },
      loggedIn: {
        title: "Logged in",
        message: "These elements are shown when a visitor is logged in."
      }
    },
    mySubscriptions: {
      title: {
        title: 'Title',
        defaultValue: 'My subscriptions'
      },
      controller: 'Controller',
      label: 'Button',
      internal: 'Internal',
      external: 'External',
      text: {
        title: 'Text',
        defaultValue: 'Om je licenties bij Boom te kunnen tonen moet je ingelogd zijn. Log hieronder in.'
      },
      url: 'URL',
      border: 'Border',
      fontColor: 'Font color',
      backgroundColor: 'Background color',
      openNewTab: 'Open in new window',
      titleNotLogged: {
        title: 'Title',
        defaultValue: 'Welcome to Boomportaal'
      },
      noAvailableSubscriptions:  {
        title: 'No available subscriptions',
        defaultValue: 'No subscriptions have been added to your account'
      },
      catalogLink: {
        title: 'Catalog link',
        defaultValue: 'Show all my subscriptions'
      },
      activationTitle: {
        title: 'Activation title',
        defaultValue: 'Activation access'
      },
      activationDescription: {
        title: 'Activation description',
        defaultValue: 'Add subscriptions using your activation code'
      },
      activationFieldPlaceholder: {
        title: 'Activation field placeholder',
        defaultValue: 'Enter activation code'
      },
      loggedOut: {
        title: "Logged out",
        message: "These elements are shown when a visitor is logged out."
      },
      loggedIn: {
        title: "Logged in",
        message: "These elements are shown when a visitor is logged in."
      }
    },
  },
};
