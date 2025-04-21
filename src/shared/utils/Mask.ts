const Mask = {
    email(email: string) {
        if (email) {
            return email.replace(/(^[^@]+)/, '****');
            // return email.replace(/(^[^@]+)/, (match) => '*'.repeat(match.length));
        }
        return ""
    },
    phone(phone: string) {
        if (phone?.replace(/\D/g, '')) {
            const onlyDigits = phone?.replace(/\D/g, '');
            const visiblePartIndex = onlyDigits.length - 3;
            // return '****' + onlyDigits.substring(visiblePartIndex);
            return onlyDigits.substring(0, visiblePartIndex).replace(/./g, '*') + onlyDigits.substring(visiblePartIndex);
        }
        return ""
    }
}

export default Mask;