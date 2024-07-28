const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export function base32Encode(bytes: Uint8Array): string {
    const bitString = byteArrayToBitString(bytes);
    return base32EncodeBitString(bitString)
}

function numberToBitString(num: number): string {
    return num.toString(2).padStart(8, '0');
}

function byteArrayToBitString(bytes: Uint8Array) {
    return [...bytes].map((byte) => numberToBitString(byte)).join('')
}

function base32EncodeBitString(bitString: string): string {
    let base32String = '';
    for (let i = 0; i < bitString.length; i += 5) {
        const chunk = bitString.substring(i, i + 5);
        const paddedChunk = chunk.padEnd(5, '0');
        const index = parseInt(paddedChunk, 2);

        // 対応するBase32文字を取得
        base32String += base32Chars[index];
    }

    let paddingLength = 0;
    if (base32String.length % 8 !== 0) {
        paddingLength = 8 - (base32String.length % 8)
    }
    return base32String.padEnd(base32String.length + paddingLength, '=')
}