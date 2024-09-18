import { GenericObject } from "moleculer";

export interface ValidateSignRequestDto {
    publicKey: string;
    signature: string;
    body: GenericObject;
    timestamp: number;
}