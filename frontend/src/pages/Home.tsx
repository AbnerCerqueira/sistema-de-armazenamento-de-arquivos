import { Download, X } from "lucide-react";

export default function Home() {
    return (
        <main className="flex flex-col space-y-12 text-white h-screen bg-custom-black">
            <h1 className="font-medium mt-10 text-xl text-center">
                Arquivos Nome Pessoa
            </h1>
            <div className="flex justify-center h-4/5 space-x-16">
                <div className="w-1/4 space-y-6">
                    <input id="input-file" type="file" className="h-20 w-full border border-custom-black rounded cursor-pointer duration-200  hover:border-custom-green file:w-1/2 file:h-full file:bg-custom-purple file:text-white file:rounded file:cursor-pointer" />
                    <button className="w-full h-10 text-white bg-custom-purple border border-custom-purple rounded duration-200 hover:border-custom-green">Adicionar</button>
                </div>
                <div className="overflow-x-hidden overflow-y-auto">
                    <table className="table-fixed">
                        <thead></thead>
                        <tbody>
                            <tr className="border">
                                <td className="p-6">nome arquivo</td>
                                <td className="p-6 bg-green-500 cursor-pointer duration-200 hover:bg-green-300"><Download /></td>
                                <td className="p-6 cursor-pointer bg-red-500 duration-200 hover:bg-red-300"><X /></td>
                            </tr>
                            <tr className="border">
                                <td className="p-6">nome arquivo</td>
                                <td className="p-6 bg-green-500 cursor-pointer duration-200 hover:bg-green-300"><Download /></td>
                                <td className="p-6 cursor-pointer bg-red-500 duration-200 hover:bg-red-300"><X /></td>
                            </tr>
                            <tr className="border">
                                <td className="p-6">nome arquivo</td>
                                <td className="p-6 bg-green-500 cursor-pointer duration-200 hover:bg-green-300"><Download /></td>
                                <td className="p-6 cursor-pointer bg-red-500 duration-200 hover:bg-red-300"><X /></td>
                            </tr>
                            <tr className="border">
                                <td className="p-6">nome arquivo</td>
                                <td className="p-6 bg-green-500 cursor-pointer duration-200 hover:bg-green-300"><Download /></td>
                                <td className="p-6 cursor-pointer bg-red-500 duration-200 hover:bg-red-300"><X /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}