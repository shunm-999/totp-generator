import {HashAlgorithm} from "./lib/hash_algorithm";
import {bufferToHexString} from "./lib/util/hex_to_bytes";

export class GenerateSecret {
    static async generate(algorithm: HashAlgorithm = {name: 'sha1'}): Promise<string> {
        let hashAlgorithm = 'SHA1'
        switch (algorithm.name) {
            case "sha1":
                hashAlgorithm = 'SHA-1'
                break;
            case "sha256":
                hashAlgorithm = 'SHA-256'
                break;
            case "sha512":
                hashAlgorithm = 'SHA-512'
                break;

        }
        let key = await crypto.subtle.generateKey({
                name: 'HMAC',
                hash: hashAlgorithm
            },
            true,
            ["verify"]
        );
        const exportedKey = await crypto.subtle.exportKey("raw", key)
        return bufferToHexString(exportedKey)
    }
}