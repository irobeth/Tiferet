/**
 * Created by bcash on 10/25/13.
 */
var Environment = {

};

Environment.TARGET_PRODUCTION = 1;
Environment.TARGET_DEVELOPMENT = 2;
Environment.TARGET_TESTING = 3;
Environment.TARGET_STASIS = 4;


Environment.ModulePath = "./";

Environment.Target = Environment.TARGET_DEVELOPMENT;

module.exports = Environment;