export interface UseCase<IRequest, IResponse> {
	execute(params?: IRequest, service?: any): Promise<IResponse> | IResponse;
}
