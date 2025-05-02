const databaseError = {
    "22P02": {
        code: 400,
        message: "Invalid params value",
    },
    23502: {
        code: 400,
        message: "Bad request",
    },
    "XX000": {
        code: 400,
        message: "Internal error",
    },
    "XX001": {
        code: 400,
        message: "Data corrupted",
    },
    "XX002": {
        code: 400,
        message: "Index corrupted",
    },
    "42P01": {
        code: 400,
        message: "No existe la relación"
    },
    53000: {
        code: 503,
        message: "Insufficient resources",
    },
    53100: {
        code: 503,
        message: "Disk full",
    },
    53200: {
        code: 503,
        message: "Out of memory",
    },
    53300: {
        code: 503,
        message: "To many connections",
    },
    53400: {
        code: 503,
        message: "To many arguments",
    },

};
export const getDatabaseError = (code) => {
return databaseError[code] || { code: 500, message: "Internal server error" };
};