import Controller from './../controllers/Controller';
import schema from './../config/validator';
import validator from './../utils/validator';

export default router => {
    router.get('/users', Controller.getAll);
    router.post('/users/add', validator(schema), Controller.insert);
    router.get('/users/:id', Controller.get);
    router.put('/users/:id/update', validator(schema), Controller.update);
    router.delete('/users/:id/delete', Controller.delete);
};
