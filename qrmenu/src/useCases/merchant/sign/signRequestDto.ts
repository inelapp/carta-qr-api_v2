import { GenericObject } from "moleculer";

export interface SignRequestDto {
    secretKey: string;
    query?: GenericObject;
    body?: GenericObject;
}