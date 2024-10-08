import axios from 'axios';
import { getCSRFToken } from './django';

const Client = Object.freeze({
  APP: 'app',
  BROWSER: 'browser'
});

const CLIENT = Client.BROWSER;
const BASE_URL = `http://backend:8000/_allauth/${CLIENT}/v1`;
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

async function request(method, path, data, headers = {}) {
  // Prepare request options
  const options = {
    method,
    url: path,
    headers: {
      ...ACCEPT_JSON,
      ...headers
    },
    data
  };

  // Include Authorization token if available
  const sessionToken = window.sessionStorage.getItem('sessionToken');
  if (sessionToken) {
    options.headers['Authorization'] = `Token ${sessionToken}`;
  } else {
    console.warn('No session token found in storage. This request might fail if authorization is required.');
  }

  // Include CSRF token if available
  const csrfToken = getCSRFToken();
  if (csrfToken) {
    options.headers['X-CSRFToken'] = csrfToken;
  } else {
    console.warn('CSRF token is missing. This request might fail if CSRF protection is enabled on the server.');
  }

  try {
    // Perform the request
    const response = await axios(options);
    const msg = response.data;

    // Handle invalid session tokens (status 410)
    if (msg.status === 410) {
      window.sessionStorage.removeItem('sessionToken');
    }

    // Store new session token if provided in response
    if (msg.meta?.session_token) {
      window.sessionStorage.setItem('sessionToken', msg.meta.session_token);
    }

    // Dispatch an event on authentication status change
    if ([401, 410].includes(msg.status) || (msg.status === 200 && msg.meta?.is_authenticated)) {
      const event = new CustomEvent('allauth.auth.change', { detail: msg });
      document.dispatchEvent(event);
    }

    return msg;
  } catch (error) {
    // Check if the error is an expected 401 response and handle it without throwing
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized access - 401:', error.response.data);
      return error.response.data;  // Return the response data for further handling
    }

    // Enhanced error handling for other statuses
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // Request was made, but no response received
      console.error('No response received:', error.request);
    } else {
      // Other errors
      console.error('Error:', error.message);
    }
    throw error;  // Re-throw other errors after logging them
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

export async function redirectToProvider(providerId, callbackURL, process = AuthProcess.LOGIN) {
  try {
    // Prepare form data for the request
    const formData = new URLSearchParams();
    formData.append('provider', providerId);
    formData.append('process', process);
    formData.append('callback_url', callbackURL);
    
    // Include CSRF token if needed
    const csrfToken = getCSRFToken();
    if (csrfToken) {
      formData.append('csrfmiddlewaretoken', csrfToken);
    } else {
      console.warn('CSRF token is missing. This request might fail if CSRF protection is enabled on the server.');
    }

    // Prepare request headers
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    // Check and add the Authorization header if the session token exists
    const sessionToken = window.sessionStorage.getItem('sessionToken');
    if (sessionToken) {
      headers['Authorization'] = `Token ${sessionToken}`;
    } else {
      console.warn('No session token found in storage. This request might fail if authorization is required.');
    }

    // Perform the request
    const response = await axios.post(URLs.REDIRECT_TO_PROVIDER, formData, { headers });

    // Check for redirect URL in the response data and navigate there
    if (response.data && response.data.redirect_url) {
      window.location.href = response.data.redirect_url;
    } else {
      console.error('No redirect URL found in the response.');
    }

  } catch (error) {
    // Handle different types of errors
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // Request was made, but no response received
      console.error('No response received:', error.request);
    } else {
      // Other errors, such as issues setting up the request
      console.error('Error:', error.message);
    }
  }
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

export async function addWebAuthnCredential (name, credential) {
  return await request('POST', URLs.WEBAUTHN_AUTHENTICATOR, {
    name,
    credential
  })
}

export async function signupWebAuthnCredential (name, credential) {
  return await request('PUT', URLs.SIGNUP_WEBAUTHN, {
    name,
    credential
  })
}

export async function deleteWebAuthnCredential (ids) {
  return await request('DELETE', URLs.WEBAUTHN_AUTHENTICATOR, { authenticators: ids })
}

export async function updateWebAuthnCredential (id, data) {
  return await request('PUT', URLs.WEBAUTHN_AUTHENTICATOR, { id, ...data })
}

export async function getWebAuthnRequestOptionsForReauthentication () {
  return await request('GET', URLs.REAUTHENTICATE_WEBAUTHN)
}

export async function reauthenticateUsingWebAuthn (credential) {
  return await request('POST', URLs.REAUTHENTICATE_WEBAUTHN, { credential })
}

export async function authenticateUsingWebAuthn (credential) {
  return await request('POST', URLs.AUTHENTICATE_WEBAUTHN, { credential })
}

export async function loginUsingWebAuthn (credential) {
  return await request('POST', URLs.LOGIN_WEBAUTHN, { credential })
}

export async function getWebAuthnRequestOptionsForLogin () {
  return await request('GET', URLs.LOGIN_WEBAUTHN)
}

export async function getWebAuthnRequestOptionsForAuthentication () {
  return await request('GET', URLs.AUTHENTICATE_WEBAUTHN)
}
