import {HashAlgorithm} from "./lib/hash_algorithm";
import {hexStringToBytes} from "./lib/util/hex_to_bytes";
import {base32Encode} from "./lib/util/base32";

export default class OtpAuthUri {

    generate(
        issuer: string,
        accountName: string,
        secret: string,
        algorithm: HashAlgorithm = {name: 'sha1'},
        digits: number = 6,
        period: number = 30,
    ): string {
        const encodedIssuer = encodeURIComponent(issuer);
        const encodedAccountName = encodeURIComponent(accountName);
        const encodedSecret = this.hexStringToBase32(secret);

        let hashAlgorithm = 'SHA1'
        switch (algorithm.name) {
            case "sha1":
                hashAlgorithm = 'SHA1'
                break;
            case "sha256":
                hashAlgorithm = 'SHA256'
                break;
            case "sha512":
                hashAlgorithm = 'SHA512'
                break;
        }

        return this.buildUrl(
            'otpauth://totp',
            `/${encodedIssuer}:${encodedAccountName}`,
            {
                'secret': encodedSecret,
                'issuer': encodedIssuer,
                'algorithm': hashAlgorithm,
                'digits': digits.toString(),
                'period': period.toString(),
            }
        )
    }

    private hexStringToBase32(hexString: string) {
        const byteArray = hexStringToBytes(hexString);
        return base32Encode(byteArray);
    }

    private buildUrl(baseUrl: string, path: string, params: Record<string, string>): string {
        const url = new URL(baseUrl);
        url.pathname = path;

        Object.keys(params).forEach(key => {
            url.searchParams.append(key, params[key]);
        });

        return url.toString();
    }
}