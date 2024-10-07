import axios from 'axios';
import { getCSRFToken } from './django';

const Client = Object.freeze({
  APP: 'app',
  BROWSER: 'browser'
});

const CLIENT = Client.BROWSER;
const BASE_URL = `_allauth/${CLIENT}/v1`;
const ACCEPT_JSON = {
  Accept: 'application/json'
};

export const AuthProcess = Object.freeze({
  LOGIN: 'login',
  CONNECT: 'connect'
});

export const Flows = Object.freeze({
  VERIFY_EMAIL: 'verify_email',
  LOGIN: 'login',
  LOGIN_BY_CODE: 'login_by_code',
  SIGNUP: 'signup',
  PROVIDER_REDIRECT: 'provider_redirect',
  PROVIDER_SIGNUP: 'provider_signup',
  MFA_AUTHENTICATE: 'mfa_authenticate',
  REAUTHENTICATE: 'reauthenticate',
  MFA_REAUTHENTICATE: 'mfa_reauthenticate',
  MFA_WEBAUTHN_SIGNUP: 'mfa_signup_webauthn'
});

export const URLs = Object.freeze({
  CONFIG: BASE_URL + '/config',
  CHANGE_PASSWORD: BASE_URL + '/account/password/change',
  EMAIL: BASE_URL + '/account/email',
  PROVIDERS: BASE_URL + '/account/providers',
  AUTHENTICATORS: BASE_URL + '/account/authenticators',
  RECOVERY_CODES: BASE_URL + '/account/authenticators/recovery-codes',
  TOTP_AUTHENTICATOR: BASE_URL + '/account/authenticators/totp',
  LOGIN: BASE_URL + '/auth/login',
  REQUEST_LOGIN_CODE: BASE_URL + '/auth/code/request',
  CONFIRM_LOGIN_CODE: BASE_URL + '/auth/code/confirm',
  SESSION: BASE_URL + '/auth/session',
  REAUTHENTICATE: BASE_URL + '/auth/reauthenticate',
  REQUEST_PASSWORD_RESET: BASE_URL + '/auth/password/request',
  RESET_PASSWORD: BASE_URL + '/auth/password/reset',
  SIGNUP: BASE_URL + '/auth/signup',
  VERIFY_EMAIL: BASE_URL + '/auth/email/verify',
  MFA_AUTHENTICATE: BASE_URL + '/auth/2fa/authenticate',
  MFA_REAUTHENTICATE: BASE_URL + '/auth/2fa/reauthenticate',
  PROVIDER_SIGNUP: BASE_URL + '/auth/provider/signup',
  REDIRECT_TO_PROVIDER: BASE_URL + '/auth/provider/redirect',
  PROVIDER_TOKEN: BASE_URL + '/auth/provider/token',
  SESSIONS: BASE_URL + '/auth/sessions',
  REAUTHENTICATE_WEBAUTHN: BASE_URL + '/auth/webauthn/reauthenticate',
  AUTHENTICATE_WEBAUTHN: BASE_URL + '/auth/webauthn/authenticate',
  LOGIN_WEBAUTHN: BASE_URL + '/auth/webauthn/login',
  SIGNUP_WEBAUTHN: BASE_URL + '/auth/webauthn/signup',
  WEBAUTHN_AUTHENTICATOR: BASE_URL + '/account/authenticators/webauthn'
});

export const AuthenticatorType = Object.freeze({
  TOTP: 'totp',
  RECOVERY_CODES: 'recovery_codes',
  WEBAUTHN: 'webauthn'
});

const tokenStorage = window.sessionStorage;

async function request(method, path, data, headers = {}) {
  const options = {
    method,
    url: path,
    headers: {
      ...ACCEPT_JSON,
      ...headers
    },
    data
  };

  // Handle authentication by adding the session token to the Authorization header
  if (path !== URLs.CONFIG) {
    const sessionToken = tokenStorage.getItem('sessionToken');
    if (sessionToken) {
      options.headers['Authorization'] = `Token ${sessionToken}`;
    }
  }

  try {
    const response = await axios(options);
    const msg = response.data;

    // Handle invalid session tokens (status 410)
    if (msg.status === 410) {
      tokenStorage.removeItem('sessionToken');
    }

    // Store new session token if provided in response
    if (msg.meta?.session_token) {
      tokenStorage.setItem('sessionToken', msg.meta.session_token);
    }

    // Dispatch an event on authentication status change
    if ([401, 410].includes(msg.status) || (msg.status === 200 && msg.meta?.is_authenticated)) {
      const event = new CustomEvent('allauth.auth.change', { detail: msg });
      document.dispatchEvent(event);
    }

    return msg;
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}

// API methods updated to use the axios-based `request` function

export async function login(data) {
  return await request('POST', URLs.LOGIN, data);
}

export async function reauthenticate(data) {
  return await request('POST', URLs.REAUTHENTICATE, data);
}

export async function logout() {
  return await request('DELETE', URLs.SESSION);
}

export async function signUp(data) {
  return await request('POST', URLs.SIGNUP, data);
}

export async function signUpByPasskey(data) {
  return await request('POST', URLs.SIGNUP_WEBAUTHN, data);
}

export async function providerSignup(data) {
  return await request('POST', URLs.PROVIDER_SIGNUP, data);
}

export async function getProviderAccounts() {
  return await request('GET', URLs.PROVIDERS);
}

export async function disconnectProviderAccount(providerId, accountUid) {
  return await request('DELETE', URLs.PROVIDERS, { provider: providerId, account: accountUid });
}

export async function requestPasswordReset(email) {
  return await request('POST', URLs.REQUEST_PASSWORD_RESET, { email });
}

export async function requestLoginCode(email) {
  return await request('POST', URLs.REQUEST_LOGIN_CODE, { email });
}

export async function confirmLoginCode(code) {
  return await request('POST', URLs.CONFIRM_LOGIN_CODE, { code });
}

export async function getEmailVerification(key) {
  return await request('GET', URLs.VERIFY_EMAIL, undefined, { 'X-Email-Verification-Key': key });
}

export async function getEmailAddresses() {
  return await request('GET', URLs.EMAIL);
}

export async function getSessions() {
  return await request('GET', URLs.SESSIONS);
}

export async function endSessions(ids) {
  return await request('DELETE', URLs.SESSIONS, { sessions: ids });
}

export async function getAuthenticators() {
  return await request('GET', URLs.AUTHENTICATORS);
}

export async function getTOTPAuthenticator() {
  return await request('GET', URLs.TOTP_AUTHENTICATOR);
}

export async function mfaAuthenticate(code) {
  return await request('POST', URLs.MFA_AUTHENTICATE, { code });
}

export async function mfaReauthenticate(code) {
  return await request('POST', URLs.MFA_REAUTHENTICATE, { code });
}

export async function activateTOTPAuthenticator(code) {
  return await request('POST', URLs.TOTP_AUTHENTICATOR, { code });
}

export async function deactivateTOTPAuthenticator() {
  return await request('DELETE', URLs.TOTP_AUTHENTICATOR);
}

export async function getRecoveryCodes() {
  return await request('GET', URLs.RECOVERY_CODES);
}

export async function generateRecoveryCodes() {
  return await request('POST', URLs.RECOVERY_CODES);
}

export async function getConfig() {
  return await request('GET', URLs.CONFIG);
}

export async function addEmail(email) {
  return await request('POST', URLs.EMAIL, { email });
}

export async function deleteEmail(email) {
  return await request('DELETE', URLs.EMAIL, { email });
}

export async function markEmailAsPrimary(email) {
  return await request('PATCH', URLs.EMAIL, { email, primary: true });
}

export async function requestEmailVerification(email) {
  return await request('PUT', URLs.EMAIL, { email });
}

export async function verifyEmail(key) {
  return await request('POST', URLs.VERIFY_EMAIL, { key });
}

export async function getPasswordReset(key) {
  return await request('GET', URLs.RESET_PASSWORD, undefined, { 'X-Password-Reset-Key': key });
}

export async function resetPassword(data) {
  return await request('POST', URLs.RESET_PASSWORD, data);
}

export async function changePassword(data) {
  return await request('POST', URLs.CHANGE_PASSWORD, data);
}

export async function getAuth() {
  return await request('GET', URLs.SESSION);
}

export async function authenticateByToken(providerId, token, process = AuthProcess.LOGIN) {
  return await request('POST', URLs.PROVIDER_TOKEN, {
    provider: providerId,
    token,
    process
  });
}

export function redirectToProvider(providerId, callbackURL, process = AuthProcess.LOGIN) {
  postForm(URLs.REDIRECT_TO_PROVIDER, {
    provider: providerId,
    process,
    callback_url: callbackURL,
    csrfmiddlewaretoken: getCSRFToken()
  });
}

export async function getWebAuthnCreateOptions(passwordless) {
  let url = URLs.WEBAUTHN_AUTHENTICATOR;
  if (passwordless) {
    url += '?passwordless';
  }
  return await request('GET', url);
}

export async function getWebAuthnCreateOptionsAtSignup() {
  return await request('GET', URLs.SIGNUP_WEBAUTHN);
}

export async function addWebAuthnCredential(name
