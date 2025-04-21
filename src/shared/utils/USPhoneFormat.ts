
const USPhoneFormat = {
    get(phoneNumber: string) {
        let onlyNumber = ('' + phoneNumber).replace(/\D/g, '');
        let startsWithPlusOne = false;
        let telCode = "";
        if (onlyNumber.length > 10) {
            phoneNumber = onlyNumber.slice(-10);
            telCode = '+' + onlyNumber.slice(0, onlyNumber.length - 10);
        } else {
            phoneNumber = onlyNumber;
        }

        // if (onlyNumber.startsWith('1')) {
        //     startsWithPlusOne = true
        //     onlyNumber = onlyNumber.slice(1);
        // }
        // if (onlyNumber.length === 12) {
        //     phoneNumber = onlyNumber.slice(2);
        // }else if (onlyNumber.length > 10) {
        //     phoneNumber = onlyNumber.slice(0, 10);
        // } else {
        //     phoneNumber = onlyNumber;
        // }
        const PhoneAddOne = startsWithPlusOne ? '1' + phoneNumber : phoneNumber;

        const regexMatched = PhoneAddOne.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (regexMatched) {
            const intlCode = (regexMatched[1] ? '+1 ' : telCode);
            return [intlCode, ' (', regexMatched[2], ') ', regexMatched[3], '-', regexMatched[4]].join('');
        }
        return phoneNumber;
    }
}

export default USPhoneFormat;