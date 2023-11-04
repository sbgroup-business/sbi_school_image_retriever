import jwt from 'jsonwebtoken';
import UnauthorizedException from '../exceptions/unauthorized.exception.js';

const authMiddleware = async (req, res, next) => {
  const { Authorization } = req.query;

  if (!Authorization) throw new UnauthorizedException('Unauthorized.');

  let isValid = false;

  try {
    isValid = jwt.verify(Authorization, process.env.JWT_SECRET);
  } catch (e) {
    throw new UnauthorizedException('Unauthorized.');
  }

  if (!isValid) throw new UnauthorizedException('Unauthorized.');

  return next();
};

export default authMiddleware;
