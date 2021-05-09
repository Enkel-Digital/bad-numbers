/**
 * Only returns authentication header if user is authenticated.
 * Split out so if user is unauthenticated, this does not throw if currenUser is null
 * @function getAuthHeader
 * @param {function} [firebaseAuth] Firebase auth method
 * @returns {String} Authentication header or nothing.
 */
export async function getAuthHeader(firebaseAuth) {
  if (firebaseAuth().currentUser)
    return `Bearer ${await firebaseAuth().currentUser.getIdToken()}`;
}

export async function ffetch(url, options = {}, body = {}) {
  if (typeof options === "function") options = options();
  return fetch(
    url,

    // Default options included and can be overwritten by given options object
    {
      ...options,
      body: typeof body === "string" ? body : JSON.stringify(body),
    }
  );
}

