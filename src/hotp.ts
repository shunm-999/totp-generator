import GenerateHmacUseCase from "./lib/generate_hmac";
import DynamicTruncateUseCase from "./lib/dynamic_truncate";
import {HashAlgorithm} from "./lib/hash_algorithm";

export interface HtopOption {
    digits: number
    hashAlgorithm: HashAlgorithm
}

export default class Htop {

    constructor(
        private readonly generateHmacUseCase: GenerateHmacUseCase = GenerateHmacUseCase.getInstance(),
        private readonly dynamicTruncateUseCase: DynamicTruncateUseCase = DynamicTruncateUseCase.getInstance(),
    ) {
    }

    generate(
        secret: string,
        counter: number,
        option?: Partial<HtopOption>
    ): number {
        const digits = option?.digits ?? 6
        const counterBytes = this.numberToUint8Array(counter)
        const hmac = this.generateHmacUseCase.invoke(secret, counterBytes, option?.hashAlgorithm);
        return this.dynamicTruncateUseCase.invoke(hmac, digits);
    }

    private numberToUint8Array(number: number) {
        let bigIntNumber = BigInt(number);

        let binaryString = bigIntNumber.toString(2).padStart(64, '0');
        let upper64Bits = binaryString.slice(0, 64);

        let byteArray = new Uint8Array(8);
        for (let i = 0; i < 8; i++) {
            byteArray[i] = parseInt(upper64Bits.slice(i * 8, (i + 1) * 8), 2);
        }
        return byteArray;
    }
}