import { Button, Modal, Typography } from "@mui/material";
import { Box, Download, Search, X } from "lucide-react";
import { useState } from "react";

export default function Home() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <main className="flex flex-col space-y-12 text-white h-screen bg-custom-black leading-none">
            <h1 className="font-medium mt-10 text-xl text-center">
                Arquivos Nome Pessoa
            </h1>
            <div className="flex flex-col items-center h-4/5 space-y-6">
                <a onClick={handleOpen} className="text-blue-500 underline cursor-pointer">Adicionar um novo arquivo</a>
                <div className="inline-flex items-center space-x-1">
                    <Search />
                    <input type="search" placeholder="Pesquisar arquivo" className="h-10 text-black rounded focus:outline-none border duration-200 hover:border-custom-green" />
                </div>
                <div className="overflow-x-hidden overflow-y-auto">
                    <table className="border rounded table-fixed">
                        <thead className="uppercase">
                            <tr className="text-left">
                                <th className="p-3 border border-custom-green">arquivo</th>
                                <th className="p-3 border border-custom-green">baixar</th>
                                <th className="p-3 border border-custom-green">apagar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border border-custom-green text-left odd:bg-custom-black even:bg-black">
                                <td className="p-6 pl-3">arquivo.jpg</td>
                                <td className="p-6 border border-custom-green cursor-pointer duration-200 hover:bg-custom-green"><Download /></td>
                                <td className="p-7 text-center cursor-pointer duration-200 hover:bg-custom-green"><X /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-20 text-white bg-custom-black leading-none rounded">
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center ">
                        <button onClick={handleClose} className="absolute top-0 right-0 bg-red-500"><X /></button>
                        Clique para selecionar arquivo
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} className="space-y-6">
                        <input name="input-file" type="file" className="h-20 w-full border border-custom-black rounded cursor-pointer duration-200  hover:border-custom-green file:w-1/2 file:h-full file:bg-custom-purple file:text-white file:border-0 file:rounded file:cursor-pointer" />
                        <button className="w-full h-10 bg-custom-purple border border-custom-purple rounded duration-200 hover:border-custom-green">Adicionar</button>
                    </Typography>
                </div>
            </Modal>
        </main>
    )
}