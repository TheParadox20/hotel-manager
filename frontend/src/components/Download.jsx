import Table from "./display/Table"
import Filter from "./Filter"

export default function Download(){
    return(
        <div class="p-4 rounded-lg border-gray-700 mt-14 text-gray-300">
            <div class="grid md:grid-rows-3 md:grid-flow-col gap-4 md:grid-cols-3 grid-cols-1">
                <div class="row-span-3 md:col-span-2 overflow-x-scroll overflow-y-scroll order-last md:order-first max-h-screen">
                    <Table/>
                </div>
                <div class="bg-gray-800 py-8 px-2 max-h-24">
                    <img className="inline w-8" src="/download.svg" alt="" />
                    <button className="font-semibold text-xl bg-gray-900 px-4 py-2 float-right rounded-2xl">Download report</button>
                </div>
                <div class="bg-gray-800 max-h-96">
                    <Filter/>
                </div>
            </div>
        </div>
    )
}