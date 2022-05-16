const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    isValidObjectId(id) {
        if (ObjectId.isValid(id)) {
            return (String)(new ObjectId(id)) === id;
        }
        return false;
    }
};