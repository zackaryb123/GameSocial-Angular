export interface PreAuthMatchesParameters {
  PPFT?: string;
  urlPost?: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface TokensExchangeProperties {
  userToken: string;
  deviceToken?: string;
  titleToken?: string;
}

export interface TokensExchangeOptions {
  XSTSRelyingParty?: string;
  optionalDisplayClaims?: string[];
  raw?: boolean;
}

export interface AuthenticateOptions {
  XSTSRelyingParty?: string;
}

export interface PreAuthResponse {
  cookie: string;
  matches: {
    PPFT: string;
    urlPost: string;
  };
}

export interface LogUserResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
  user_id: string;
}

export interface ExchangeResponse {
  IssueInstant: string;
  NotAfter: string;
  Token: string;
  DisplayClaims: object;
}

export type ExchangeRpsTicketResponse = ExchangeResponse & {
  DisplayClaims: { xui: [{ uhs: string }] };
};

export interface AuthenticateResponse {
  userXUID: string | null;
  userHash: string;
  XSTSToken: string;
  expiresOn: string;
}

