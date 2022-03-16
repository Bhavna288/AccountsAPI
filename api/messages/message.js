module.exports = {
    addMessage: (module) => {
        console.log(module, " added");
        return (module + " added successfully");
    },
    deleteMessage: (module) => {
        console.log(module, " deleted");
        return (module + " deleted successfully");
    },
    updateMessage: (module) => {
        console.log(module, " updated");
        return (module + " updated successfully");
    },
    noRecord: (module) => {
        console.log(module, " record not found");
        return (module + " does not exists or is deleted.");
    }
}