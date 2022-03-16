const today = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Kolkata' }).replace(/\//g, "-");
today = today.replace(',', "");
const prefix = today + " divya-traders-api: ";

module.exports = {
    addMessage: (module) => {
        console.log(prefix, module, " added");
        return (module + " added successfully");
    },
    deleteMessage: (module) => {
        console.log(prefix, module, " deleted");
        return (module + " deleted successfully");
    },
    updateMessage: (module) => {
        console.log(prefix, module, " updated");
        return (module + " updated successfully");
    },
    noRecord: (module) => {
        console.log(prefix, module, " record not found");
        return (module + " does not exists or is deleted.");
    }
}