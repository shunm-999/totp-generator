import {HashAlgorithm} from "./lib/hash_algorithm";
import {hexStringToBytes} from "./lib/util/hex_to_bytes";
import {base32Encode} from "./lib/util/base32";

export interface OtpAuthUriCreation {
    issuer: string,
    accountName: string,
    secret: string,
    algorithm?: HashAlgorithm,
    digits?: number,
    period?: number,
}

export default class OtpAuthUri {

    generate(
        {
            issuer,
            accountName,
            secret,
            algorithm,
            digits,
            period,
        }: OtpAuthUriCreation
    ): string {
        const encodedIssuer = encodeURIComponent(issuer);
        const encodedAccountName = encodeURIComponent(accountName);
        const encodedSecret = this.hexStringToBase32(secret);

        let hashAlgorithm: string
        switch (algorithm?.name) {
            case "sha1":
                hashAlgorithm = 'SHA1'
                break;
            case "sha256":
                hashAlgorithm = 'SHA256'
                break;
            case "sha512":
                hashAlgorithm = 'SHA512'
                break;
            default:
                hashAlgorithm = 'SHA1'
                break;
        }

        return this.buildUrl(
            'otpauth://totp',
            `/${encodedIssuer}:${encodedAccountName}`,
            {
                'secret': encodedSecret,
                'issuer': encodedIssuer,
                'algorithm': hashAlgorithm,
                'digits': (digits ?? 6).toString(),
                'period': (period ?? 30).toString(),
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

        let urlString = url.toString()

        Object.keys(params).forEach((key, index) => {
            if (index == 0) {
                urlString += "?" + key + "=" + params[key];
            } else {
                urlString += "&" + key + "=" + params[key];
            }
        });

        return urlString;
    }
}