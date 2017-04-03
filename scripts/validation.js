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

        //obtain function get function
        isUsed: function (remoteServer){
            var cb = function (responseFromServer) {
                var message = '';
                var e = $('#emailInput');
                if (responseFromServer === null){
                    e.get(0).setCustomValidity('');
                }
                else{
                    message = responseFromServer.emailAddress + ' has an order already!';
                    e.get(0).setCustomValidity(message);
                }
            };

            // var email = $('#emailId');
            // email.on('input', function(event){
            //     remoteServer.get(event.target.value, cb);

            $('#emailInput').on('input', function(event) {
                var email = event.target.value;
                remoteServer.get(email, cb);
            });

        }
    };




            // var present = remoteServer.get(email, cb);
            // if(present === null) {
            //     return email.setCustomValidity('No answer...');
            // }
            // else {return email.setCustomValidity(email + ' already used!');}









            //callback method will get called
            //db.get(validEmail, callback);










    //
    //
    //
    //
    //       if( ) {
    //
    //
    //         return false;
    //       }
    //       else {return true};
    //
    //
    //
    //     }
    //
    // /*
    // Silver Challenge: Validating Against the Remote Server
    // Your validation code currently does a simple domain check.
    // Update your validation code so that it also checks whether an email address
    // has already been used for an order that exists on the server.
    //
    // Prevent the form from being submitted if
    //   - that address has been used and provide an appropriate validation warning.
    //   You may want to open a second browser window for CoffeeRun and enter different coffee orders in the two windows.
    //
    //   Pay attention to how often a request is sent to the server when doing this validation check.
    //   (You can see these in the DevTools network panel.)
    //   Can you find a good way to minimize the number of requests?
    //   */
    //
    //
    //   isExistingEmail: function(db) {
    //               var cb = function(serverResponse) {
    //                   var email = $('#emailInput');
    //
    //                   if (serverResponse == null) {
    //                       console.log('no response');
    //                       email.get(0).setCustomValidity('');
    //                   }
    //                   else {
    //                       email.get(0).setCustomValidity(email.val()+ ' Already has an order Pending'); }
    //               };
    //
    //               $('#emailInput').on('input', function(event) {
    //                   var email = event.target.value;
    //                   db.get(email, cb);
    //               });
    //
    //           }


    App.Validation = Validation;
    window.App = App;

})(window);
