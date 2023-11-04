import APIException from './api-exception.js';

export default class NotFoundException extends APIException {
  constructor(message) {
    super(message, 404);
  }
}
