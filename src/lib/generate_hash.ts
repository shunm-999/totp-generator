import {createHmac} from 'node:crypto'

export interface HashAlgorithm {
    algorithm: 'sha1' | 'sha256'
}

export default class GenerateHashUseCase {
    static getInstance(): GenerateHashUseCase {
        return new GenerateHashUseCase();
    }

    invoke(
        secret: string,
        data: string,
        algorithm: HashAlgorithm = {
            algorithm: 'sha256',
        }
    ): string {
        return createHmac(
            algorithm.algorithm,
            secret
        )
            .update(Buffer.from(data, 'utf-8'))
            .digest('hex')
    }
}