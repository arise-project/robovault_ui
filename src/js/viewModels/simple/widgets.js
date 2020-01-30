define(['ojs/ojrouter'],
    function(Router) {

        function SimpleModuleModel() {
            this.buttonClick = function (event, data, bindingContext) {
              var widgetSwitch = document.getElementById((event.currentTarget.getAttribute('value')));
              //https://www.oracle.com/webfolder/technetwork/jet-320/jsdocs/oj.ojButtonset.html
              console.log($( ".oj-buttonset-width-auto" ).ojButtonset( { "checked": event.currentTarget.getAttribute('value') } ));
              $(widgetSwitch).click();
              widgetSwitch.setAttribute('checked', event.currentTarget.getAttribute('value'));
              //https://www.oracle.com/webfolder/technetwork/jet/jsdocs/oj.Router.html
              var router = Router.rootInstance;
              console.log(router);
              //router.go('simple/profile');
              return true;
            }.bind(this);
          }
      
      
        
      return new SimpleModuleModel();
    }
  );