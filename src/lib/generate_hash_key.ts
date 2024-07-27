import {HashAlgorithm} from "./hash_algorithm";
import {KeyObject} from "crypto";

export interface HashKey {
    key: KeyObject;
    algorithm: HashAlgorithm;
}

export default class GenerateHashKeyUseCase {
    static getInstance(): GenerateHashKeyUseCase {
        return new GenerateHashKeyUseCase();
    }

    async invoke(algorithm: HashAlgorithm = {name: 'sha1'}): Promise<HashKey> {
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
            false,
            ["verify"]
        );
        return {
            key: KeyObject.from(key),
            algorithm: algorithm
        }
    }
}