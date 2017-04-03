(function(window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }
        this.$formElement = $(selector);
        if (this.$formElement === 0) {
            throw new Error('Could not find element with selector:' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function(fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function(event) {
            event.preventDefault();
            var data = {};
            //console.log(data);
            $(this).serializeArray().forEach(function(item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            //console.log(data);
            fn(data)
            .then (function () {
                this.reset();
                this.elements[0].focus();
            }.bind(this));
        });
    };


    FormHandler.prototype.addInputHandler = function(fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function(event) {
            var emailAddress = event.target.value;
            var message = '';

            // var cb = function (responseFromServer) {
            //     var message = '';
            //     if (responseFromServer === null){
            //         event.target.setCustomValidity('');
            //     }
            //     else{
            //         message = responseFromServer.emailAddress + ' has an order already!';
            //         event.target.setCustomValidity(message);
            //     }
            // };

            //remoteServer.get(emailAddress, cb);

            if (fn(emailAddress) ) {
                event.target.setCustomValidity('');
                //remoteServer.get(emailAddress, cb);

            } else {
                message = emailAddress + ' is not an authorized email address!';
                event.target.setCustomValidity(message);
                console.log(fn(emailAddress));
            }

            //remoteServer.get(emailAddress, cb);

            //
            // var cb = function (responseFromServer) {
            //     var message = '';
            //     if (responseFromServer === null){
            //         event.target.setCustomValidity('');
            //     }
            //     else{
            //         message = responseFromServer.emailAddress + ' has an order already!';
            //         event.target.setCustomValidity(message);
            //     }
            // };

            //remoteServer.get(emailAddress, cb);

        });
    };


    FormHandler.prototype.decafHandler = function(fn) {
        //var coffee = $('#coffeeOrder').val();
        //var rating = $('#strengthLevel').val();

        // this.$formElement.on('input', '[name="coffee"]', function(event) {
        //     var coffee = event.target.value;
        //     var message2 = '';
        //     var rating = $('#strengthLevel').val();
        //     console.log(rating);
        //
        //     if (fn(coffee, rating)) {
        //         event.target.setCustomValidity('');
        //     } else {
        //         message2 = 'Caffeine must be less than 20.';
        //         event.target.setCustomValidity(message2);
        //         console.log(fn(coffee, rating));
        //     }
        // }.bind(this));
        //
        // this.$formElement.on('input', '[name="strength"]', function(event) {
        //     var rating = event.target.value;
        //     var message3 = '';
        //     var coffee = $('#coffeeOrder').val();
        //
        //     console.log(coffee);
        //
        //     if (fn(coffee, rating)) {
        //         event.target.setCustomValidity('');
        //     } else {
        //         message3 = rating + ' value should not be over 20!';
        //         event.target.setCustomValidity(message3);
        //         //console.log(fn(coffee, rating));
        //     }
        // });



        var coffee = '';

        this.$formElement.on('input', '[name="coffee"]', function(event) {
            coffee = event.target;
            var message2 = '';
            var slider = $('#strengthLevel').val();

            console.log('coffee');

            if (fn(coffee, slider)) {
                event.target.setCustomValidity('');
            } else {
                message2 = coffee + ' is being selected';
                event.target.setCustomValidity(message2);
                console.log(fn(coffee, slider));
            }
        }.bind(this));

        //console.log(fn);

        this.$formElement.on('input', '[name="strength"]', function(event) {
            var rating = event.target.value;
            var message3 = '';
            var order = $('#coffeeOrder').val();
            //console.log('rating');
            //console.log(order);
            if (fn(order, rating)) {
                if (coffee) {
                    coffee.setCustomValidity('');
                }
                event.target.setCustomValidity('');
            } else {
                message3 = rating + ' value should not be over 20!';
                event.target.setCustomValidity(message3);
                console.log(fn(order, rating));
            }
        }.bind(this));

    };

    App.FormHandler = FormHandler;
    window.App = App;

})(window);
