import { singClientRequest, UnexpectedError, UseCase } from "@service/commons/dist/src/shared";
import { err, ok, Result } from "neverthrow";
import { SignResponseDto } from "./signResponseDto";
import { SignRequestDto } from "./signRequestDto";
import { SignBadErrorRequest } from "./signErrors";

type Response = Result<SignResponseDto, SignBadErrorRequest | UnexpectedError>;
class Sign implements UseCase<SignRequestDto, Response> {
    async execute(params: SignRequestDto, service?: any): Promise<Response> {
        try {
            const { secretKey, query, body } = params;
            if(!secretKey) {
                return err(new SignBadErrorRequest("secretKey not valid."));
            }
            const payload = {
                ...query,
                ...body
            }
            const timestamp = Math.floor(Date.now() / 1000);
            const signature = singClientRequest(secretKey, payload, timestamp);
            return ok({ signature, timestamp });
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}

export default Sign;