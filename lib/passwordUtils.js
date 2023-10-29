const crypto = require("crypto");
const promisify = require("util").promisify;
const randomBytesAsync = crypto.randomBytes;
const pbkdf2Sync = crypto.pbkdf2Sync;

function validPassword(password, hash, salt) {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}
function genPassword(password) {
  try {
    const salt = randomBytesAsync(32);
    // Prints random bytes of generated data
    const genHash = pbkdf2Sync(password, salt, 10000, 64, "sha512");

    return {
      salt: salt.toString("hex"),
      hash: genHash.toString("hex"),
    };
  } catch (err) {
    console.log(err);
    return;
  }
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
