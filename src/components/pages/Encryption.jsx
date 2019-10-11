import CryptoJS from 'crypto-js';

/**
 * @author utssaha(Utshab Saha)
 * 
 * This file is responsible or our own encryption and decryption. We can implement any number of 
 * algorithm and use it in other classes
 */
const secretKey = 'theNightWalkers';
const salt = "3FF2EC019C627B945225DEBAD71A01B6985FE84C95A70EB132882F88C0A59A55";
const iv = "12345678901234567890123456789012";

/**
 * This function uses AES algorithm for generating the key
 * @returns String
 */
const generateKey = () => {
    return CryptoJS.PBKDF2(secretKey, CryptoJS.enc.Hex.parse(salt), {
        keySize: 128/32,
        iterations: 10
    });
};

/**
 * This function uses AES algorithm for encryption
 * @param data 
 * @type String
 * @returns String
 */
const encryptByAES = (data) => {
    let key = generateKey();
    return CryptoJS.AES.encrypt(data, key, {
        iv: CryptoJS.enc.Hex.parse(iv)
    }).ciphertext.toString(CryptoJS.enc.Base64);
};

/**
 * This function uses AES algorithm for decryption
 * @param data
 * @type String
 * @returns String
 */
const decryptByAES = (data) => {
    let key = generateKey();
    let cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: CryptoJS.enc.Base64.parse(data)
    });
    return CryptoJS.AES.decrypt(cipherParams, key, {
        iv: CryptoJS.enc.Hex.parse(iv)
    }).toString(CryptoJS.enc.Utf8);
};

export { encryptByAES, decryptByAES };
