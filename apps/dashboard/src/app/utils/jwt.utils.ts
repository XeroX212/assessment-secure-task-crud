import { JwtPayload } from '../models/jwt-payload';

export function decodeToken(token: string): JwtPayload | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1])) as JwtPayload;
    return payload;
  } catch {
    return null;
  }
}