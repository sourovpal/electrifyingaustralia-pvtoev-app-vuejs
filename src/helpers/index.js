import api from "@actions/api";

export async function mergeTimelineLogs(oldData, newData, latest = false) {

    for (let date in newData) {
        if (!oldData[date]) {
            oldData = { ...oldData, [date]: [...newData[date]] };
        } else {
            if (latest) {
                newData[date].map((item) => {
                    var index = oldData[date].findIndex(o => o.timeline_id == item.timeline_id);
                    if (index > -1) {
                        oldData[date][index] = item;
                    } else {
                        oldData[date].push(item);
                    }
                });
            } else {
                oldData = { ...oldData, [date]: newData[date].concat(oldData[date]) }
            }
        }
    }

    return Object.keys(oldData).sort().reduce((acc, currValue) => {
        acc[currValue] = oldData[currValue];
        return acc;
    }, {});
}

export function shortenFileName(fileName, maxLength) {
    const extension = fileName.split('.').pop();
    const baseName = fileName.slice(0, -(extension.length + 1));

    if (baseName.length > maxLength) {
        const partLength = Math.floor((maxLength - 3) / 2);
        const firstPart = baseName.slice(0, partLength);
        const secondPart = baseName.slice(-partLength);
        return firstPart + '...' + secondPart + '.' + extension;
    } else {
        return fileName;
    }
}

export const leadImageTypes = ["png", "jpg", "jpeg", "webp", "bmp", "tiff", "svg", "gif"];

export const fileNameToExtension = (fileName) => {
    var ext = fileName.split('.').pop().toLowerCase();
    if (ext) {
        return ext;
    }
    return null;
}


export const handleDownloadFile = async (url, $filename) => {
    await api({
        url,
        method: 'GET',
        responseType: 'blob'
    }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', $filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
    }).catch((error) => {
        console.error('File download failed', error);
    });
}