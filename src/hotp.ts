import GenerateHmacUseCase from "./lib/generate_hmac";
import DynamicTruncateUseCase from "./lib/dynamic_truncate";
import {HashAlgorithm} from "./lib/hash_algorithm";

export interface HotpOption {
    digits: number
    algorithm: HashAlgorithm
}

export class Hotp {

    constructor(
        private readonly generateHmacUseCase: GenerateHmacUseCase = GenerateHmacUseCase.getInstance(),
        private readonly dynamicTruncateUseCase: DynamicTruncateUseCase = DynamicTruncateUseCase.getInstance(),
    ) {
    }

    generate(
        secretHexString: string,
        counter: number,
        {
            digits,
            algorithm,
        }: Partial<HotpOption> = {
            digits: 6,
            algorithm: {name: 'sha1'}
        }
    ): number {
        const counterBytes = this.numberToUint8Array(counter)
        const hmac = this.generateHmacUseCase.invoke(secretHexString, counterBytes, algorithm ?? {name: 'sha1'});
        return this.dynamicTruncateUseCase.invoke(hmac, digits ?? 6);
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