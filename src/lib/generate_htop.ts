import assert from "node:assert";

export default class GenerateHtopUseCase {
    static getInstance(): GenerateHtopUseCase {
        return new GenerateHtopUseCase();
    }

    invoke(hashString: string, digits: number): number {
        const binaryCode = this.generateDynamicBinaryCode(hashString);
        return this.truncate(binaryCode, digits);
    }

    private generateDynamicBinaryCode(hashString: string): number {
        const hash = this.hexToBytes(hashString)

        assert(hash.length >= 20, "hash length must be 20 or more");

        const offset = hash[19] & 0xf;

        return (hash[offset] & 0x7f) << 24
            | (hash[offset + 1] & 0xff) << 16
            | (hash[offset + 2] & 0xff) << 8
            | (hash[offset + 3] & 0xff);
    }

    private truncate(binaryCode: number, digit: number): number {
        assert(digit >= 6, "digit must be 6 or more");
        assert(digit <= 8, "digit must be 8 or less");

        return binaryCode % (10 ** digit);
    }

    private hexToBytes(hexString: string): number[] {
        // Adding one byte to get the right conversion
        // Values starting with "0" can be converted
        const hexStringAddedByte = "10" + hexString

        let bytes: number[] = [];
        for (let i = 0; i < hexStringAddedByte.length; i += 2) {
            bytes.push(parseInt(hexStringAddedByte.substring(i, i + 2), 16));
        }
        return bytes;
    }

    private getInt(hexString: string): number {
        return parseInt(hexString)
    }
}