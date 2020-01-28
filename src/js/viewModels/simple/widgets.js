define(['ojs/ojrouter'],
    function(Router) {

        function SimpleModuleModel() {
            this.buttonClick = function (event, data, bindingContext) {
              var widgetSwitch = document.getElementById((event.currentTarget.getAttribute('value')));
              console.log(widgetSwitch);
              widgetSwitch.setAttribute('checked', 'checked');
              //https://www.oracle.com/webfolder/technetwork/jet/jsdocs/oj.Router.html
              var router = Router.rootInstance;
              console.log(router);
              router.go('simple/profile');
              return true;
            }.bind(this);
          }
      
      
        
      return new SimpleModuleModel();
    }
  );