const config = require('../../sub/auth.json');

module.exports.config = {
    strategy: require('passport-facebook').Strategy,
    color: '#235EE3',
    fontColor: '#FFFFFF',
    vendor: 'facebook',
    displayName: 'withFacebook'
}

module.exports.strategyConfig = {
    clientID: config.facebook.clientID, // 보안을 위해서입니다.
        clientSecret: config.facebook.clientSecret, // 이 방법을 사용하는 것을
        callbackURL: config.facebook.callbackURL, // 적극 권장합니다.
        profileFields: ['id' ,'name' , 'gender', 'age_range', 'displayName'],
        passReqToCallback: true
}

module.exports.strategy = (process, MainDB, Ajae) => {
    return (req, accessToken, refreshToken, profile, done) => {
        const $p = {};

        $p.authType = "facebook";
        $p.id = profile.id;
        $p.name = profile.displayName;
        $p.title = profile.displayName;
        $p.image = "https://graph.facebook.com/"+profile.id+"/picture";

        process(req, accessToken, MainDB, $p, done);
    }
}