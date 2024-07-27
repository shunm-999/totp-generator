import {HashAlgorithm} from "./lib/hash_algorithm";
import {KeyObject} from "crypto";

export class HashKey {
    constructor(
        readonly key: KeyObject,
        readonly algorithm: HashAlgorithm,
    ) {
    }
}

export class GenerateHashKey {
    static async invoke(algorithm: HashAlgorithm = {name: 'sha1'}): Promise<HashKey> {
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
        return {
            key: KeyObject.from(key),
            algorithm: algorithm
        }
    }
}