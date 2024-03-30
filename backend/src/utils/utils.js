import ERRORS  from "../helpers/error.js";

const findError = (code) => {
    return ERRORS.filter((err) => err.code = code) 
};

export { findError };