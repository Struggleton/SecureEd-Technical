export class ServiceError extends Error {
	public type: ServiceErrorType;
	public statusCode: number;

	constructor(type: ServiceErrorType, message: string) {
		super(message);
		this.type = type;
		switch (type) {
			case ServiceErrorType.BAD_REQUEST:
				this.statusCode = 400;
				break;
			case ServiceErrorType.NOT_FOUND:
				this.statusCode = 404;
				break;
			case ServiceErrorType.INTERNAL:
				this.statusCode = 500;
				break;
		}
	}
}

export enum ServiceErrorType {
	BAD_REQUEST = "bad_request",
	NOT_FOUND = "not_found",
	INTERNAL = "internal",
}
