import assert from "node:assert";
import {hexStringToBytes} from "./util/hex_to_bytes";

export default class DynamicTruncateUseCase {
    static getInstance(): DynamicTruncateUseCase {
        return new DynamicTruncateUseCase();
    }

    invoke(hmac: string, digits: number): number {
        const binaryCode = this.generateDynamicBinaryCode(hmac);
        return this.truncate(binaryCode, digits);
    }

    private generateDynamicBinaryCode(hmac: string): number {
        const hexToBytes = hexStringToBytes(hmac)

        assert(hexToBytes.length >= 20, "hash length must be 20 or more");

        const offset = hexToBytes[19] & 0xf;

        return (hexToBytes[offset] & 0x7f) << 24
            | (hexToBytes[offset + 1] & 0xff) << 16
            | (hexToBytes[offset + 2] & 0xff) << 8
            | (hexToBytes[offset + 3] & 0xff);
    }

    private truncate(binaryCode: number, digit: number): number {
        assert(digit >= 6, "digit must be 6 or more");
        assert(digit <= 8, "digit must be 8 or less");

        return binaryCode % (10 ** digit);
    }
}