export default function Table(){
    let cards = [
        {
          "id": 12341235,
          "card": "null",
          "description": "demo data"
        },
        {
            "id": 12341235,
            "card": "null",
            "description": "demo data"
        },
        {
            "id": 12341235,
            "card": "null",
            "description": "demo data"
        }
    ]
    return(
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        UID
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Description
                    </th>
                    <th scope="col" class="px-6 py-3">
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    cards.map((card, index) => {
                        return (<tr key={index} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                            <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {card.id}
                            </td>
                            <td class="px-6 py-4">
                                {card.card}
                            </td>
                            <td class="px-6 py-4">
                                {card.description}
                            </td>
                            <td class="px-6 py-4">
                                <button class="font-medium text-green-500 dark:text-green-500 hover:text-green-400 hover:font-bold" onClick={(e)=>deleteCard(e,index)}>Delete</button>
                            </td>
                        </tr>)})
                }
            </tbody>
        </table>
    );
}