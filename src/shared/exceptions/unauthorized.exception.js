import APIException from './api-exception.js';

export default class UnauthorizedException extends APIException {
  constructor(message) {
    super(message, 401);
  }
}
