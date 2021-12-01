const baseRepository = (model) => ({
    async getAll() {
        const elements = await model.find()
        return elements
    },

    async getById(id) {
        const element = await model.findById(id)
        return element
    },

    async create(element) {
        const newElement = await model.create(element)
        return newElement
    },

    async update(id, data) {
        const elementUpdated = await model.findByIdAndUpdate(id, data)
        return elementUpdated
    },

    async dalete(id) {
        const elementDeleted = await model.findByIdAndDelete(id)
        return elementDeleted
    }
})

module.exports = baseRepository