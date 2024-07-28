import {HashAlgorithm} from "./hash_algorithm";
import {bufferToHexString} from "./util/hex_to_bytes";

export class SecretGenerator {
    generate(algorithm: HashAlgorithm = {name: 'sha1'}): string {
        let keyLength: number
        switch (algorithm.name) {
            case "sha1":
                keyLength = 20;
                break;
            case "sha256":
                keyLength = 32;
                break;
            case "sha512":
                keyLength = 64;
                break;
        }
        const key = new Uint8Array(keyLength);
        crypto.getRandomValues(key);
        return bufferToHexString(key)
    }
}