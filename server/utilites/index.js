const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    /**
     * Returns true if the given id is a valid MongoDB Object id.
     * @param id an id string
     * @returns {boolean}
     */
    isValidObjectId(id) {
        if (ObjectId.isValid(id)) {
            return (String)(new ObjectId(id)) === id;
        }
        return false;
    }
};