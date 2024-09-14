export async function mergeTimelineLogs(oldData, newData) {
    for (let date in newData) {
        if (!oldData[date]) {
            oldData = { ...oldData, [date]: newData[date] };
        } else {
            for (let key in newData[date]) {
                if (!oldData[date][key]) {
                    oldData[date] = { [key]: newData[date][key], ...oldData[date] };
                } else {
                    oldData[date][key] = [...newData[date][key], ...oldData[date][key]];
                }
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
