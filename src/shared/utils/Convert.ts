
const Convert = {

    formatToDaysCount(days: number) {
        days = +days;
        if (Number.isInteger(+days)) {
            let years = Math.floor(days / 365);
            days %= 365;
            let months = Math.floor(days / 30);
            days = days % 30;
            return `${years ? years + (years === 1 ? ' year ' : ' years ') : ""} ${months ? months + (months === 1 ? ' month ' : ' months ') : ""} ${days ? days + (days === 1 ? ' day ' : ' days ') : ""}`;
        } else {
            return '';
        }
    },


    capitalizeWords(text: string) {
        if(text === null || text === undefined ||  text.trim().toLowerCase() === "null" ||
        text.trim().toLowerCase() === "undefined") {
            return '';
        }
        return text
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    },


    capitalizeAllLetters(text: string) {
        if(text === null || text === undefined ||text.trim().toLowerCase() === "null" || text.trim().toLowerCase() === "undefined"
        ) {
            return '';
        }
        return text
            .split('')
            .map(letter => letter.charAt(0).toUpperCase())
            .join('');
    }


}

export default Convert;