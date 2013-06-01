
exports.twitter = {
    consumerKey: 'QQowLw3OJDwn41bdKjw8Q',
    consumerSecret: 'MXInyqncxYU8twcEDVQhokdL5vvqoHvnEtHp2fz1Q'
};

switch(process.env.NODE_ENV) {

    case 'production':
        exports.db = process.env['CLOUDANT_URL'] + '/civichack/';
        exports.twitter.callbackUrl = 'http://civichack.herokuapp.com/auth/twitter/callback';
        break;

    case 'development':
        exports.db = process.env['CLOUDANT_URL'] + '/civichack/';
        exports.twitter.callbackUrl = 'http://localhost:3000/auth/twitter/callback';
        break;
    
}