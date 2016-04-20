'use strict';

// Configuring the Articles module
angular.module('sisoweb').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'sisoweb',
      state: 'sisoweb',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'sisoweb', {
      title: 'SignIn Page',
      state: 'sisoweb.checkIn'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'sisoweb', {
      title: 'SignOut Page',
      state: 'sisoweb.checkOut'     
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'sisoweb', {
      title: 'List by Manager',
      state: 'sisoweb.listBy'     
    });
  }
]);
