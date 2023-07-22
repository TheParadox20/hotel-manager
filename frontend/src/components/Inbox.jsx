export default function Inbox(){
    return(
        <div class="p-4 rounded-lg dark:border-gray-700 mt-14 text-gray-300">
            <div className="text-3xl font-bold my-4">Download Report</div>
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                        <p class="text-2xl">+</p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                        <p class="text-2xl">+</p>
                    </div>
                    <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                        <p class="text-2xl">+</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p class="text-2xl text-gray-400 dark">+</p>
                    </div>
                    <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p class="text-2xl">+</p>
                    </div>
                    <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p class="text-2xl">+</p>
                    </div>
                    <div class="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
                        <p class="text-2xl">+</p>
                    </div>
                </div>
        </div>
    )
}