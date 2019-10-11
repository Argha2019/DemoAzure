import { encryptByAES, decryptByAES } from '../components/pages/Encryption.jsx';
import CryptoJS from 'crypto-js';

describe('Encryption', () => {

    it('testing more secure AES', () => {
        let cipher = encryptByAES("plaintext");
        let plainText = decryptByAES(cipher);
        expect(plainText).toBe("plaintext");
    });
});