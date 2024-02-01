import jwt from 'jsonwebtoken';

//Secret Key For Tokens
let privateKey = "VivekIsGoodBoy"

const fetchuser = (req, res, next) => {
    let token = req.header("authtoken")

    if (!token) {
        res.status(401).send({ error: "Please Auhtentictae using valid tokens" })
    }

    // Retrieving the ID from jwt tokens
    try {
        let data = jwt.verify(token, privateKey);
        req.user = data.user;
        next()
    } catch (err) {
        res.status(401).send({ error: "Please Auhtentictae using valid tokens" })
    }
}

export default fetchuser