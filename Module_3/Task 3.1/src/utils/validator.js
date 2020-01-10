function errorResponse(schemaError) {
    const errors = schemaError.map(error => {
        const { path, message } = error;
        return { path, message };
    });
    return {
        status: 'failed',
        errors
    };
}

function validateSchema(schema) {
    return (req, resp, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });
        if (error !== null) {
            resp.status(400).json(errorResponse(error.details));
        } else {
            // eslint-disable-next-line callback-return
            next();
        }
    };
}

export default validateSchema;
