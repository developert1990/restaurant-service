export const createRestaurantPK = (name, street, postalCode) => {
    return name + street.replace(/ +/g, '') + postalCode;
};
