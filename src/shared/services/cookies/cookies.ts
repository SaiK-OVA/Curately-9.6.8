
const cookieStore = {

    setCookie(name: string, value: string, days: number = 365) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },

    // Function to get a cookie by name
    getCookie(name: string) {
        const nameEQ = name + "=";
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim(); if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return "";
    },

    eraseCookie(name: string) {
        document.cookie = name + '=; Max-Age=-99999999;';
    }
}

export { cookieStore };