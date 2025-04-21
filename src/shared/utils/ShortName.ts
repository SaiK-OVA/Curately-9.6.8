
export const getShortName = (name: string) => {
    let tempNameArray = name.split(' ');
    if (tempNameArray.length > 1) {
        return `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`;
    } else if ((tempNameArray.length === 1) && name.split(' ')[0] && name.split(' ')[0][1]) {
        return `${name.split(' ')[0][0]}${name.split(' ')[0][1]}`;

    } else {
        return ``;
    }
}