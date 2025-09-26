export function toJSON(data) {
    if (data.toJSON) {
        const dataJson = data.toJSON();
        delete dataJson?._id;
        return dataJson;
    }
    return data;
}

export function getErrorMessage(errorMessage: any) {
    return {
        message: Array.isArray(errorMessage)
        ? errorMessage.join(", ")
        : errorMessage,
    }
}