interface ErrorType {
    hasError: boolean;
    message: string;
  }
interface ErrorMessageType {
    message: string;
}
interface RegistrationType {
    setRegitrationSuccess: (isRegistrationSuccess: boolean) => void;
    setErrorOccured: (error: ErrorType) => void;
}

export type {
    ErrorType,
    ErrorMessageType,
    RegistrationType,
};

