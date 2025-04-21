

import CryptoEs from 'crypto-es';

const EncryptDecryptService = {

    pswdIterations: 10,
    keySize: 256,
    salt: "3FF2EC019C627B945225DEBAD71A01B6985FE84C95A70EB132882F88C0A59A55",
    initializationVector: "3C46C00F3C46C00F3C46C00F3C46C00F",
    password: "careers-curately",


    key() {
        return CryptoEs.PBKDF2(
            this.password,
            CryptoEs.enc.Hex.parse(this.salt),
            {
                keySize: 256 / 32,
                iterations: 10
            }
        );
    },

    encryptAES(plainText: string) {
        //alert(123);
        let encstr = CryptoEs.AES.encrypt(
            plainText,
            this.key(),
            {
                iv: CryptoEs.enc.Hex.parse(this.initializationVector)
            }).ciphertext?.toString(CryptoEs.enc.Base64);
        return encstr;
    },

    decryptAES(encstr: string) {
        //alert(123);
        encstr = encstr.replace(/\r\n/g, '');
        if (/\s/g.test(encstr)) {
            return '';
        }
        let cipherParams = CryptoEs.lib.CipherParams.create({
            ciphertext: CryptoEs.enc.Base64.parse(encstr)
        });
        let decrypted = CryptoEs.AES.decrypt(
            cipherParams,
            this.key(),
            { iv: CryptoEs.enc.Hex.parse(this.initializationVector) }
        );
        let decryptedStr = decrypted.toString(CryptoEs.enc.Utf8) ?? '';
        return decryptedStr;
    },

    ivrs: CryptoEs.enc.Utf8.parse(Math.random().toString(36).substring(8)),

    e(value: string, secretKey: string): string {
        const encrypted = CryptoEs.AES.encrypt(
            CryptoEs.enc.Utf8.parse(JSON.stringify(value)),
            secretKey,
            {
                iv: this.ivrs,
                mode: CryptoEs.mode.CBC,
                padding: CryptoEs.pad.Pkcs7
            }
        );
        return encrypted.toString();
    },

    dj(value: string, secretKey: string): string[] {
        const decrypted = CryptoEs.AES.decrypt(
            value,
            secretKey,
            {
                iv: this.ivrs,
                mode: CryptoEs.mode.CBC,
                padding: CryptoEs.pad.Pkcs7
            }
        );
        return JSON.parse(decrypted.toString(CryptoEs.enc.Utf8));
    },

    ds(value: string, secretKey: string): string {
        const decrypted = CryptoEs.AES.decrypt(
            value,
            secretKey,
            {
                iv: this.ivrs,
                mode: CryptoEs.mode.CBC,
                padding: CryptoEs.pad.Pkcs7
            }
        );
        return decrypted.toString(CryptoEs.enc.Utf8);
    }

}


export default EncryptDecryptService;