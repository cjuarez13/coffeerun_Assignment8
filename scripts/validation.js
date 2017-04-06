(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    var Validation = {
        isCompanyEmail: function (email) {
            return /.+@bignerdranch\.com$/.test(email);
        },

        isDecaf: function (coffee, strength) {
            var wpatt = /decaf/.test(coffee);
            if (wpatt && strength > 20) {return false;}
            else {return true;}
        },

        isExistingEmail: function (email) {
            var $serverResponse = $.ajax({url:'http://localhost:3002/coffeeorders' + '/' + email, success: function () {}});
            //console.log($serverResponse);
            //JSON.stringify(serverResponse) due to the item return an array of Object
            //contentType: 'application\json'
            if ($serverResponse.responseText == '{}') {
                //return message = email + 'has a an order already!';
                return false;
            }
            else {//return message;
                return true;

            }
        }
    };






    App.Validation = Validation;
    window.App = App;

})(window);
