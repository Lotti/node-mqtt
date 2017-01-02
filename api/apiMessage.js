module.exports = (obj, isError) => {
    if (isError || obj instanceof Error) {
        return {
            error: true,
            message: obj.message
        };
    } else {
        return obj;
    }
};