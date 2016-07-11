(function () {
  'use strict';

  angular
    .module('profiles')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Profiles',
      state: 'profiles',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'profiles', {
      title: 'List Profiles',
      state: 'profiles.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'profiles', {
      title: 'Create Profile',
      state: 'profiles.create',
      roles: ['user']
    });
  }
})();
