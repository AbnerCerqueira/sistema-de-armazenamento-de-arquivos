export type User = {
    id_user: number,
    username_user: string,
    password_user: string,
    confpass?: string
}

export type File = {
    id_file?: number
    filename: string,
    dir_file: string,
    id_user: number
}
