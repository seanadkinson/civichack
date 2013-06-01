
switch(process.env.NODE_ENV) {

    case 'production':
        exports.db = process.env['CLOUDANT_URL'] + '/civichack/';
        break;

    case 'development':
        exports.db = process.env['CLOUDANT_URL'] + '/civichack/';
        break;
    
}