const formatStringToUsPhoneNumber = (phoneNumber: string): string => {
    // Remove all non-numeric characters from the phone number.
    const onlyDigitsFromString = phoneNumber.replace(/\D/g, '');

    // Check if the phone number is 10 digits long.
    if (onlyDigitsFromString.length !== 10) {
        // Invalid phone number.
        return '';
    }

    // Format the phone number as (XXX) XXX-XXXX.
    const formattedPhoneNumber = `(${onlyDigitsFromString.substring(0, 3)}) ${onlyDigitsFromString.substring(3, 6)}-${onlyDigitsFromString.substring(6)}`;

    return formattedPhoneNumber;
}

export default formatStringToUsPhoneNumber;
