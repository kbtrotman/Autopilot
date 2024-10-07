// Remove these functions since CSRF is no longer needed
// Switching to token-based.
function getCookie (name) {
  // ...
}

export function getCSRFToken () {
  return getCookie('csrftoken')
}
