type IError = Error & { statusCode: number };

export default (message: string, statusCode: number): IError => ({
  message,
  statusCode,
  name: 'LINT CHATO EM TRYBE',
});
