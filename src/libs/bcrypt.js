import bcrypt from 'bcryptjs';

export const encode = async (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};

export const isMatch = (password, encodedPassword) => {
    return bcrypt.compare(password.toString(), encodedPassword);
};
