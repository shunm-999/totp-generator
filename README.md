# totp-generator

## How to Use

This library is used to generate HOTP and TOTP one-time passwords (OTP). 
It also provides functionality to generate OTP authentication URIs.

**Import the required modules**
First, import the necessary modules.

```typescript
import {type HashAlgorithm, Hotp, OtpAuthUri, SecretGenerator, Totp} from "@shunm-999/totp-generator";
```

**Generate a secret key**

Generate a secret key to be used with HMAC. By default, the SHA-1 algorithm is used.

```typescript
const hashAlgorithm: HashAlgorithm = {
    name: "sha1"
};

const secret = new SecretGenerator().generate(hashAlgorithm)
```

**Generate a HOTP**

Use the generated secret key to generate a HOTP. A counter value is also required.

```typescript
const hotp = new Hotp().generate(
    "<secret key>", // your secret key
    1 // counter
);
console.log("HOTP:", hotp);

```

**Generate a TOTP**

Use the generated secret key to generate a TOTP.

```typescript
const totp = new Totp().generate(
    "<secret key>", // your secret key
);
console.log("TOTP:", totp);
```

**Generate an OTPAuth URI**

Generate an OTP authentication URI, which can be used to configure applications like Google Authenticator.

```typescript
const otpAuthUri = new OtpAuthUri().generate({
    issuer: 'TEST WEB SERVICE',
    accountName: 'username@gmail.com',
    secret: "<secret key>", // your secret key
});
console.log("OTPAuth URI:", otpAuthUri);
```

**Full Example Code**

```typescript
import {type HashAlgorithm, Hotp, OtpAuthUri, SecretGenerator, Totp} from "@shunm-999/totp-generator";

const hashAlgorithm: HashAlgorithm = {
    name: "sha1"
};

const secret = new SecretGenerator().generate(hashAlgorithm)

console.log("secret", secret);

const totp = new Totp().generate(secret);
console.log("TOTP:", totp);

const hotp = new Hotp().generate(secret, 1);
console.log("HOTP:", hotp);

const otpAuthUri = new OtpAuthUri().generate({
    issuer: 'TEST WEB SERVICE',
    accountName: 'user.email@gmail.com',
    secret: secret
});
console.log("OTPAuth URI:", otpAuthUri);
```