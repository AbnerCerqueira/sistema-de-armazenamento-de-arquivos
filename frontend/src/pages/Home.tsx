import api from "../api/Api"
import Cookies from "js-cookie"
import { Modal, Typography } from "@mui/material"
import { ArrowDown, ArrowUp, Download, LogOut, Search, X } from "lucide-react"
import { ChangeEvent, useEffect, useMemo, useState } from "react"
import { Form, useActionData, useLoaderData } from "react-router-dom"
import { FilesUser } from "../types"

export default function Home() {
    const fetchFiles = useLoaderData() as FilesUser[]
    const message = useActionData() as string

    const [originalFetch] = useState<FilesUser[] | null>(fetchFiles)
    const [files, setFiles] = useState<FilesUser[] | null>(originalFetch)
    const [username, setUsername] = useState<string | undefined>()
    const [fileInput, setFileInput] = useState<File | null>(null)
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => { setOpen(false), setFileInput(null) }
    
    const handleFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.files?.length ? setFileInput(e.currentTarget.files[0]) : setFileInput(null)
    }

    const previewURL = useMemo(() => {
        return fileInput ? URL.createObjectURL(fileInput) : null
    }, [fileInput])


    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        const input = e.currentTarget.value.trim().toLocaleLowerCase()
        if (input.length === 0) {
            return setFiles(originalFetch)
        }

        const filteredData = originalFetch?.filter((file) => file.filename.toLowerCase().includes(input))
        filteredData && setFiles(filteredData)
    }

    function handleSortAsc() {
        const sortedFiles = [...files ?? []].sort((a, b) => a.filename.localeCompare(b.filename))
        setFiles(sortedFiles)
    }

    function handleSortDesc() {
        const sortedFiles = [...files ?? []].sort((a, b) => b.filename.localeCompare(a.filename))
        setFiles(sortedFiles)
    }

    useEffect(() => {
        const tokenCookieSub = Cookies.get("token-sub")
        if (tokenCookieSub) {
            const { username_user } = JSON.parse(tokenCookieSub)
            setUsername(username_user)
        }
    }, [])

    return (
        <main className="flex flex-col space-y-12 text-white h-screen bg-custom-black">
            <div onClick={() => { Cookies.remove("token"), window.location.reload() }} className="absolute top-5 left-5 cursor-pointer">
                <LogOut />
            </div>

            <div className="flex justify-center h-4/5 space-x-10">
                <div className="flex flex-col items-center space-y-3">
                    <h1 className="font-medium text-xl">
                        Bem vindo {username}
                    </h1>
                    <div className="inline-flex items-center -space-x-8">
                        <span className="z-10"><Search color="#000" /></span>
                        <input onChange={handleSearch} type="search" placeholder="Pesquisar arquivo" className="h-10 text-center    text-black rounded focus:outline-none border duration-200 hover:border-custom-green" />
                    </div>
                    <a onClick={handleOpen} className="text-blue-500 underline cursor-pointer">Adicionar um novo arquivo</a>
                </div>
                <div className="overflow-x-hidden overflow-y-auto">
                    <table className="border rounded table-fixed">
                        <thead className="uppercase">
                            <tr className="text-left">
                                <th className="p-3 border border-custom-green"><span className="inline-flex space-x-2"><span>arquivo</span> <ArrowUp onClick={handleSortAsc} cursor="pointer"/><ArrowDown onClick={handleSortDesc} cursor="pointer"/></span></th>
                                <th className="p-3 border border-custom-green">baixar</th>
                                <th className="p-3 border border-custom-green">apagar</th>
                            </tr>
                        </thead>
                        <tbody>{files?.map((file) => (
                            <tr key={file.id_file} className="border border-custom-green text-left odd:bg-custom-black even:bg-black">
                                <td className="p-6 pl-3">
                                    {file.filename.length <= 20 ? (
                                        file.filename
                                    ) : (<>
                                        {file.filename.substring(0, 20)}
                                        {"... ."}
                                        {file.filename.split(".")[file.filename.split(".").length - 1]}
                                    </>)}
                                </td>
                                <td onClick={() => { handleDownload(file.id_file, file.filename) }} className="p-7 border border-custom-green cursor-pointer duration-200 hover:bg-custom-purple"><Download /></td>
                                <td onClick={() => { handleDelete(file.id_file) }} className="p-7 text-center cursor-pointer duration-200 hover:bg-custom-purple"><X /></td>
                            </tr>))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-20 text-white bg-custom-black leading-none rounded">
                    <Typography id="modal-modal-title" variant="h6" component="h2" className="text-center ">
                        <button type="button" onClick={handleClose} className="absolute top-0 right-0 bg-red-500"><X /></button>
                    </Typography>

                    <Form method="post" action={`/user/${username}`} encType="multipart/form-data">
                        <Typography id="modal-modal-description" sx={{ mt: 2 }} className="space-y-6 text-center">
                            <span className="relative block w-96 h-40 p-4 text-center border-2 border-dotted border-custom-green rounded-md duration-200 hover:border-solid">
                                {previewURL && <img src={previewURL} className="absolute z-10 left-1/3 w-1/3"></img>}
                                <span className={previewURL ? "hidden" : ""}>Arraste aqui seu arquivo</span>
                                <input name="input-file" type="file" onChange={handleFileSelected} className={`absolute z-10 top-0 left-0 w-full h-full text-center cursor-pointer file:${previewURL ? "hidden" : ""} file:absolute file:bottom-1 file:right-8 file:w-4/5 file:h-1/4 file:bg-custom-purple file:text-white file:border-0 file:rounded file:cursor-pointer`} />
                            </span>
                            <button type="submit" className="w-full h-10 bg-custom-purple border border-custom-purple rounded duration-200 hover:border-custom-green">Adicionar</button>
                            {message && <span>{message}<a onClick={() => { window.location.reload() }} className="text-blue-500 underline cursor-pointer">{" "}atualizar pagina</a></span>}
                        </Typography>
                    </Form>
                </div>
            </Modal>
        </main >
    )
}

export async function upload({ request }: { request: Request }) {
    const data = await request.formData()
    try {
        const result = await api.post("/api/upload", data, { headers: { "Content-Type": "multipart/form-data" } })
        return result.status === 204 ? "" : result.data.message ?? ""
    }
    catch (err: any) {
        return err.response.data.message
    }
}

async function handleDownload(id_file: number, filename: string) {
    try {
        const result = await api.get(`/api/download/${id_file}`, { responseType: "blob" })

        const url = window.URL.createObjectURL(new Blob([result.data]))
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", filename)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

    } catch (err) {
        return err
    }
}

async function handleDelete(id_file: number) {
    try {
        await api.delete(`/api/delete/${id_file}`)
        window.location.reload()
    } catch (err) {
        return err
    }
}

export async function fetchFiles() {
    try {
        const result = await api.get("/api/files")
        return result.data
    } catch (err) {
        return err
    }
}
