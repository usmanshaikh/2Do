const allRoles = {
  user: [],
  admin: [
    'getAllUsers',
    'deleteAllUsers',
    'getAllTasks',
    'deleteAllTasks',
    'getAllChecklists',
    'deleteAllChecklists',
    'getAllCategories',
    'deleteAllCategories',
    'getAllCardColors',
    'createCardColor',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
