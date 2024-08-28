// export function mergeTimelineLogs(oldData, newData) {
//     for (let date in newData) {
//         if (!oldData[date]) {
//             oldData[date] = newData[date] { [[date][key]]: newData[date][key], ...oldData };
//         } else {
//             for (let key in newData[date]) {
//                 if (!oldData[date][key]) {
//                     // If the key doesn't exist, add it directly
//                     console.log({ [[date][key]]: newData[date][key], ...oldData });
//                     // oldData[date][key] = { [[date][key]]: newData[date][key], ...oldData };
//                 } else {
//                     // If the key exists, concatenate the arrays
//                     oldData[date][key] = newData[date][key].concat(oldData[date][key]);
//                 }
//             }
//         }
//     }
//     return oldData;
// }

export function mergeTimelineLogs(oldData, newData) {
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