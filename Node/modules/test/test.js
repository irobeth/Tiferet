/**
 * Created by bcash on 10/25/13.
 */

var Controller = function() {

};

Controller.prototype.test = function(req, res) {
    var ret = {
        "no" : "im teemo"
    };


//    throw new Error("ERROR");

    return ret;
};

module.exports = Controller;

