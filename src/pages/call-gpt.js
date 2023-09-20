import axios from 'axios';
import { useState } from 'react';
import OpenAI from 'openai';
import { items, resources, objectStructure } from '../utils/items'

const CallGPT = (value) => {
    const [printout, setPrintout] = useState("empty")
    const objName = "Lance"
    const configuration = {
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.OPENAI_ORG_KEY,
        dangerouslyAllowBrowser: true
    }
    const key = process.env.OPENAI_API_KEY

    const openai = new OpenAI({ apiKey: key })

    function objectStructures() {
        console.log("Here is the sample")
        console.log(objectStructure)
        return JSON.stringify(objectStructure)
    }

    const explaination = (`the type field is to define what kind of item it is, avalible options are tool, machine, weapon, material. 
    the value is a calculated field based on that wood is valued at 1. attributes is a field that define attributes to be used ingame. 
    attributes are also used to unlock new items, sometimes the requirement might be a workbench, then the created workbench has to include "workbench" as an attribute.
    enhancements are used to assign items to buildings. currently the avalible building types are: extraction, production and farm
    requirements are to define what is needed to create the item, normaly related to machines or tools. change no fields in the template, the values are to be presented as they are, dont make strings unless the example has strings
    use them all. use the following template,`)

    function AvalibleItems() {
        const answer = []
        for (const key in items) {
            if (items.hasOwnProperty(key) && items[key].hasOwnProperty("name")){
                answer.push(items[key].name)
            }
        }
        for (const key in resources) {
            if (resources.hasOwnProperty(key) && resources[key].hasOwnProperty("name")){
                answer.push(resources[key].name)
            }
        }
        console.log(answer)
        const ra = JSON.stringify(answer)
        const oe = JSON.stringify(objectStructure)
        const answerString = ("Items and resources avalible for crafting: " +ra + "Object example, dont change the structure: " +oe+ " If resources or items are missing, create them also. " +explaination)
        return answerString;
    }



    async function callChatGPTWithFunctions() {
        const messages = [{
            role: 'user',
            content: `Using functions "itemsAvalible" and "objectAnswe" please Create a new item called workbench use existing items and if they are not enough create new items then format the answer in accordance with the example, dont change any structure from the object example`
        }]

        const functions = [
            {
                name: "itemsAvalible",
                description: "Gives GPT the name of all items",
                parameters: {
                    type: "object",
                    properties: {
                        items: {
                            type: "string",
                            description: "all items names",
                        },
                    },
                }
        },
        {
            name: "objectAnswer",
            description: "Gives GPT an example object",
            parameters: {
                type: "object",
                properties: {
                    objectexample: {
                        type: "string",
                        description: "how a game object looks",
                    },
                },
            }
        }
    ]

        let chat = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0613",
            messages: messages,
            functions: functions,
            function_call: "auto"
        })

        const response = chat.choices[0].message
        console.log(response)

        if (response.function_call) {
            const availableFunctions = {
                objectAnswer: objectStructures,
                itemsAvalible: AvalibleItems,
                // objectFormat: objectFormat,
            };
            const functionName = response.function_call.name
            console.log(functionName)
            const functionToCall = availableFunctions[functionName]
            console.log(response.function_call.arguments)
            const functionArgs = JSON.parse(response.function_call.arguments)
            console.log(functionArgs)
            const functionResponse = functionToCall(functionArgs.itemName)

            messages.push(response)
            messages.push({
                'role': 'function',
                'name': functionName,
                'content': functionResponse
            })
            const secondResponse = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo-0613',
                messages: messages,
            })
            // console.log(secondResponse.choices[0].message)
            setPrintout(secondResponse.choices[0].message)
            console.log("Messages")
            console.log(messages)
            console.log("end")
            console.log(secondResponse.choices[0].message.content)

        }
    }


    callChatGPTWithFunctions()
    return (
        <div>
            {printout}
        </div>
    )
}

export default CallGPT
