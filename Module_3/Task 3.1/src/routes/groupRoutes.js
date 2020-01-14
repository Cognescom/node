import GroupController from './../controllers/GroupController';

export default router => {
    router.get('/groups', GroupController.getAll);
    router.post('/groups/add', GroupController.create);
    router.get('/groups/:id', GroupController.get);
    router.put('/groups/:id/update', GroupController.update);
    router.delete('/groups/:id/delete', GroupController.delete);
    router.post('/groups/:id/addUsers', GroupController.addUsersToGroup);
};
