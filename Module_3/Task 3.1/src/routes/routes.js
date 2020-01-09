import Controller from './../controllers/Controller';

export default router => {
    router.get('/users', Controller.getAll);
    router.post('/users/add', Controller.insert);
    router.get('/users/:id', Controller.get);
    router.put('/users/:id/update', Controller.update);
    router.delete('/users/:id/delete', Controller.delete);
};
