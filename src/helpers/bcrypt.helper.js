const bcrypt = require('bcrypt')
const saltRounds = 20;

const hashPassword = (plainPassword) => {
    return new Promise((resolve) => {
        resolve(bcrypt.hashSync(plainPassword, saltRounds))
    });
};

const comparePassword = (painPassword, passFromDb) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(painPassword, passFromDb, function (err, result) {
            if (err) reject(err);

            resolve(result)
        });
    });
};



module.exports = {
    hashPassword,
    comparePassword
}