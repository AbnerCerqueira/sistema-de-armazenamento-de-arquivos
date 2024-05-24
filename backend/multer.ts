import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // pegar o nome e extensao do arquivo
        const primeiroNome = file.originalname.split('.')[0]
        const extensaoArquivo = file.originalname.split('.')[1];

        cb(null, `${primeiroNome}.${extensaoArquivo}`) // novo nome do arquivo
    }
})

export default storage