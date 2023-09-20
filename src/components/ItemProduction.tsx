require('dotenv').config();
import React, { useState, useEffect } from 'react';
import { resources, objectStructure, updateUtilityItems } from '../utils/items'
import { useFactories } from '@/contexts/FactoriesContext';
import OpenAI from 'openai';

const ItemProduction: React.FC = () => {
  const [newItemName, setNewItemName] = useState('');
  const {items, setItems, oak } = useFactories()

//   async function callChatGPTWithFunctions() {
//     const openai = new OpenAI({apiKey: oak, dangerouslyAllowBrowser: true})

//     function objectStructures() {
//       return JSON.stringify(objectStructure)
//   }

//   const explaination = (`the type field is to define what kind of item it is, avalible options are tool, machine, weapon, material. 
//   the value is a calculated field based on that wood is valued at 1. attributes is a field that define attributes to be used ingame. 
//   attributes are also used to unlock new items, sometimes the requirement might be a workbench, then the created workbench has to include "workbench" as an attribute.
//   enhancements are used to assign items to buildings. currently the avalible building types are: extraction, production and farm
//   requirements are to define what is needed to create the item, normaly related to machines or tools. change no fields in the template, the values are to be presented as they are, dont make strings unless the example has strings
//   use them all. use the following template,`)

//   function AvalibleItems() {
//       const answer = []
//       for (const key in items) {
//         if (items.hasOwnProperty(key) && items[key].hasOwnProperty("name")){
//             answer.push(items[key].name)
//         }
//     }
//       for (const key in resources) {
//           if (resources.hasOwnProperty(key) && resources[key].hasOwnProperty("name")){
//               answer.push(resources[key].name)
//           }
//       }
//       console.log(answer)
//       const ra = JSON.stringify(answer)
//       const oe = JSON.stringify(objectStructure)
//       const answerString = ("Items and resources avalible for crafting: " +ra + "Object example, dont change the structure: " +oe+ " If resources or items are missing, create them also. " +explaination)
//       return answerString;
//   }

//     const messages = [{
//         role: 'user',
//         content: `Using functions itemsAvalible please Create a new item called: ` + newItemName +  `. use existing items and if they are not enough create new items then format the answer in accordance with the example, dont change any structure from the object example`
//     }]

//     const functions = [
//         {
//             name: "itemsAvalible",
//             description: "Gives GPT the name of all avalible items and resources together with an object example",
//             parameters: {
//                 type: "object",
//                 properties: {
//                     items: {
//                         type: "string",
//                         description: "all items names",
//                     },
//                 },
//             }
//     },
//     {
//         name: "objectAnswer",
//         description: "Gives GPT an example object",
//         parameters: {
//             type: "object",
//             properties: {
//                 objectexample: {
//                     type: "string",
//                     description: "how a game object looks",
//                 },
//             },
//         }
//     }
// ]

//     let chat = await openai.chat.completions.create({
//         model: "gpt-3.5-turbo-0613",
//         messages: messages,
//         functions: functions,
//         function_call: "auto"
//     })

//     const response = chat.choices[0].message
//     console.log(response)

//     if (response.function_call) {
//         const availableFunctions = {
//             objectAnswer: objectStructures,
//             itemsAvalible: AvalibleItems,
//             // objectFormat: objectFormat,
//         };
//         const functionName = response.function_call.name
//         console.log(functionName)
//         const functionToCall = availableFunctions[functionName]
//         console.log(response.function_call.arguments)
//         const functionArgs = JSON.parse(response.function_call.arguments)
//         console.log(functionArgs)
//         const functionResponse = functionToCall(functionArgs.itemName)

//         messages.push(response)
//         messages.push({
//             'role': 'function',
//             'name': functionName,
//             'content': functionResponse
//         })
//         const secondResponse = await openai.chat.completions.create({
//             model: 'gpt-3.5-turbo-0613',
//             messages: messages,
//         })
//         console.log(secondResponse.choices[0].message.content)
//         const item = secondResponse.choices[0].message.content
//         return item
//     }
// }

// const handleAddItem = () => {
//   callChatGPTWithFunctions().then((newItemResponse) => {
//     try {
//       const newItemData = JSON.parse(newItemResponse);

//       // Ensure newItemData has the expected structure
//       if (typeof newItemData === 'object') {
//         // Send a POST request to your API to add the new item
//         fetch('/api/getItems', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(newItemData),
//         })
//           .then((response) => {
//             if (response.status === 201) {
//               // Successfully added the item to the database
//               console.log('Item added successfully');
//               return response.json();
//             } else {
//               // Handle errors or display a message
//               console.error('Error adding item:', response.statusText);
//               throw new Error('Error adding item');
//             }
//           })
//           .then(() => {
//             fetch('/api/getItems') // This will route to your API route
//             .then((response) => response.json())
//             .then((data) => {
//               setItems(data);
//               updateUtilityItems(data); // Call updateUtilityItems with fetched data
//             })
//             .catch((error) => console.error('Error fetching data:', error));
//           })
//           .catch((error) => {
//             console.error('Error:', error);
//           });
//       } else {
//         console.error('Error: Invalid item data from GPT API');
//       }
//     } catch (error) {
//       console.error('Error parsing or adding new item:', error);
//     }
//   });
// };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Item Management</h2>

      <div className="mb-6">
        <h3 className="text-md font-semibold mb-2">What item do you wnat to create?</h3>

        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Item Name"
          className="p-1 mb-2 border"
        />

        {/* <button onClick={handleAddItem} className="p-2 bg-blue-500 text-white rounded">Try to create</button> */}
      </div>

      <div>
        <h3 className="text-md font-semibold mb-2">Existing Recipes</h3>
      </div>
      <div>
      <h1>Items</h1>
      <ul>
      {
    Object.values(items).map((item, index) => (
        <tr key={index}>
            <td className="border p-2">{item.name}</td>
        </tr>
    ))
}



      </ul>
    </div>
    </div>
  );
};

export default ItemProduction;
