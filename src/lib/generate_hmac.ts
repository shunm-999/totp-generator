import {createHmac} from 'node:crypto'
import {HashAlgorithm} from "./hash_algorithm";
import {hexStringToBytes} from "./util/hex_to_bytes";

export default class GenerateHmacUseCase {
    static getInstance(): GenerateHmacUseCase {
        return new GenerateHmacUseCase();
    }

    invoke(
        secretHexString: string,
        counter: Uint8Array,
        algorithm: HashAlgorithm
    ): string {
        return createHmac(
            algorithm.name,
            hexStringToBytes(secretHexString)
        )
            .update(counter)
            .digest('hex')
    }
}