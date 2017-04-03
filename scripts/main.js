(function(window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    //var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
    //var SERVER_URL = 'http://coffeerun.herokuapp.com/api/coffeeorders';
    var SERVER_URL = 'http://localhost:3002/coffeeorders';
    //var SERVER_URL = 'http://loct:300/cofeeorders';


    var App = window.App;
    var Truck = App.Truck;
    //var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var Checklist = App.Checklist;

    var remoteDS = new RemoteDataStore(SERVER_URL);
    //var dataStore = new DataStore();
    var myTruck = new Truck('ncc-1701', remoteDS);
    window.myTruck = myTruck;

    var checkList  = new Checklist(CHECKLIST_SELECTOR);
    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function (data) {
        return myTruck.createOrder.call(myTruck, data)
          .then(function () {
              checkList.addRow.call(checkList, data);
          }
          //,
          // function () {
          //     alert('Server unreachable. Try again later.');
          // }
        );
    });


    formHandler.addInputHandler(Validation.isCompanyEmail);

    myTruck.printOrders(checkList.addRow.bind(checkList));

    //Validation.isUsed(remoteDS);
    formHandler.decafHandler(Validation.isDecaf);
    //Validation.isUsed(remoteDS);
    //formHandler.addInputHandler(Validation.isCompanyEmail, remoteDS);
    //remoteDS.get(data, Validation.isUsed);
  //  Validation.isUsed(remoteDS);


})(window);
