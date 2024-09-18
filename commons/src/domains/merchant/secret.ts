import { Ok, ok } from "neverthrow";
import bcrypt from 'bcryptjs';

interface SecretProps {
    value: string;
    hashed?: boolean;
}
export class Secret {
    props: SecretProps;

    constructor(props: SecretProps) {
        this.props = props;
    }

    isAlreadyHashed(): boolean {
        return this.props.hashed ?? false;
    }

    async getHashedValue(): Promise<string> {
        if(this.isAlreadyHashed()){
            return Promise.resolve(this.props.value);
        }  
        return this.hashSecretKey(this.props.value);
    }

    static create(props: SecretProps): Ok<Secret, unknown> {
        return ok(new Secret(props));
    }

    private hashSecretKey(secretKey: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(secretKey, 10, (err, hash) => {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
            });
        });
    }
}