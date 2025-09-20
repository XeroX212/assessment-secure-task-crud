export interface JwtPayload {
  sub: number;
  role: 'Owner' | 'Admin' | 'Viewer';
  iat: number;
  exp: number;
}