export const adminMiddleware = (req, res, next) => {

    if (req.user && req.user.role === 'admin') {

        return next();
    }
    return res.status(403).json({ message: 'No tienes permisos para realizar esta acción.' });
};