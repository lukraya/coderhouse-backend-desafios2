const MessageService = require('../src/services/message')
const FakeMessageModel = require('./__mock__/fake-messageModel')

describe("Message service test", ()=>{
    it("getAllMessages() should return an array of elements if there's any", async ()=> {
        const elements = require('./__mock__/fake-messages-list')
        const service = new MessageService(new FakeMessageModel(elements))
        const response = await service.getAllMessages()
        expect(Array.isArray(response)).toBeTruthy()
    })

    it("getAllMessages() should return and empty array when there's no elements", async ()=>{
        const elements = require('./__mock__/fake-messages-empty')
        const service = new MessageService(new FakeMessageModel(elements))
        const response = await service.getAllMessages()
        expect(Array.isArray(response)).toBeTruthy()
        expect(response.length).toBe(0)
    })

    it("createMessage() should return the new data when the message is saved", async ()=>{
        const element = require('./__mock__/fake-message-new')
        const service = new MessageService(new FakeMessageModel(element))
        const {authour, text} = element
        const response = await service.createMessage({authour, text})
        expect(response).toEqual(element)
    })
})