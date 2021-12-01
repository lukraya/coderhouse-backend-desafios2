const { messageService } = require('../src/services')

describe("Message service test", ()=>{
    it("getAllMessages() should return an array of elements if there's any", async ()=> {
        const response = await messageService.getAllMessages()
        expect(Array.isArray(response)).toBeTruthy()
        expect(response.length).not.toBe(0)
    })
    
    it("findByIdAndUpdate() should return a valid object after updating", async ()=> {
        const element = require('./__mock__/fake-message-updated')
        const response = await messageService.updateMessage("correctId", element)
        expect(response).toEqual(element)
    })

    it("createMessage() should return the new data when the message is saved", async ()=>{
        const element = require('./__mock__/fake-message-new')
        const {authour, text} = element
        const response = await messageService.createMessage({authour, text})
        expect(response).toEqual(element)
    })
})