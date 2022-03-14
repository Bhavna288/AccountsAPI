module.exports = {
    addMessage: (module) => {
        return (module + " added successfully");
    },
    deleteMessage: (module) => {
        return (module + " deleted successfully");
    },
    updateMessage: (module) => {
        return (module + " updated successfully");
    },
    noRecord: (module) => {
        return (module + " does not exists or is deleted.");
    }
}