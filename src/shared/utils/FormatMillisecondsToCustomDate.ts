
const FormatMillisecondsToCustomDateTime = {

    formatMillisecondsToCustomDateTime(milliseconds: number): string {
        const date = new Date(milliseconds);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    } 

}
const FormatMillisecondsToCustomDate = {

    formatMillisecondsToCustomDate(milliseconds: number): string {
        const date = new Date(milliseconds);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        //const hours = String(date.getHours()).padStart(2, '0');
       // const minutes = String(date.getMinutes()).padStart(2, '0');
      //  const seconds = String(date.getSeconds()).padStart(2, '0');
    
        return `${month}/${day}/${year}`;
    } 

}
export {FormatMillisecondsToCustomDateTime, FormatMillisecondsToCustomDate}