import { ImageIcon, DocumentIcon, PdfIcon } from "@assets/icons";

export default {
    data(){
        return {
        }
    },
    methods: {
        getFileIconByFileExtension(extension = "") {
            var ext = extension?.toLocaleLowerCase();
            var imgExt = ["jpg", "jpeg", "png", "gif", "bmp", "svg", "webp"];
            if (imgExt.includes(ext)) {
                return ImageIcon;
            } else if (ext == "pdf") {
                return PdfIcon;
            } else {
                return DocumentIcon;
            }
        },
        resizeFileNameHandler(fileName = "", length = 20) {
            if (fileName.length <= length) {
                return fileName;
            } else {
                const firstPart = fileName.substring(0, length);
                const lastPart = fileName.substring(fileName.length - 10);
                return `${firstPart} ... ${lastPart}`;
            }
        }
    }

}

