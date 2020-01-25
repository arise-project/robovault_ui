define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojfilepicker'],
    function(oj, ko, $) {

        function SimpleModuleModel() {
            this.currentModule = ko.observable("login");
            var self = this;
            this.modulePath = ko.pureComputed(
              function () {
                return ('simple/' + self.currentModule());
              }
            );
          }
      
      
        
      return new SimpleModuleModel();
    }
  );