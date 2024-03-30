const validateParameterUser = (req, res, next) => {
    const {user} = req.body;
    if (!user.email || !user.password || !user.rol || !user.languaje){
        return res.status(400).json({ error: "email, password, rol y languaje deben estar presentes"})
    }
    next();
};

export {validateParameterUser}