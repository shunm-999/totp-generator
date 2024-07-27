import {createHmac} from 'node:crypto'
import {HashAlgorithm} from "./hash_algorithm";
import {hexStringToBytes} from "./util/hex_to_bytes";

export default class GenerateHmacUseCase {
    static getInstance(): GenerateHmacUseCase {
        return new GenerateHmacUseCase();
    }

    invoke(
        secret: string,
        counter: Uint8Array,
        algorithm: HashAlgorithm = {
            name: 'sha1',
        }
    ): string {
        return createHmac(
            algorithm.name,
            hexStringToBytes(secret)
        )
            .update(counter)
            .digest('hex')
    }
}