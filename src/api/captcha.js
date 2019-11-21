const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recaptcha = Schema(
        {
            "success": true|false,
            "challenge_ts": timestamp,  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
            "hostname": string,         // the hostname of the site where the reCAPTCHA was solved
           
          } 
);

const recaptcha = mongoose.model("recaptcha", recaptcha);

module.exports = recaptcha;


