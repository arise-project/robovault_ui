define([
  'ojs/ojrouter',
  'knockout',
  'ojs/ojbootstrap',
  'ojs/ojmodel',
  'ojs/ojknockouttemplateutils',
  'ojs/ojcollectiondatagriddatasource',
  'ojs/ojconverter-datetime',
  'ojs/ojconverter-number',
  'ojs/ojknockout',
  'ojs/ojdatagrid', 
  'ojs/ojmoduleanimations',
  'ojs/ojmodule-element-utils',
  'ojs/ojmodule-element',
  'ojs/ojmenu',
  'ojs/ojtoolbar',
  'ojs/ojbutton',
  'text'],
  function (Router, ko, Bootstrap, Model, KnockoutTemplateUtils,
    collectionModule, DateTimeConverter, NumberConverter, Knockout, DataGrid, ModuleAnimations, ModuleElementUtils) {
    var ViewModel = function () {
      this.KnockoutTemplateUtils = KnockoutTemplateUtils;
      var dateOptions = { formatType: 'date', dateFormat: 'medium' };
      this.dateConverter = new DateTimeConverter.IntlDateTimeConverter(dateOptions);

      var chapters = {
        'preface': 'Darn beamed hurriedly because banal more \
giraffe shuffled and well rid placidly where hence or and and hound lantern cutely \
instead inaudibly but demonstrable imitatively one regarding a where much fruitlessly \
more depending goodness less as dear shark directed this one.',
        'chapter1': 'Affectingly and yikes one that along \
versus growled unwitting vulnerably fish far pouting otter some as this hamster \
hatchet where amicably far deftly curtsied.',
        'chapter2': 'More up mistaken for a kissed therefore \
ahead thus on dear wow undertook flabbily less much far sourly impala resolutely and \
and as overheard dachshund this.',
        'chapter3': 'Reindeer up while the far darn falcon \
concurrent iguana this strived unicorn hedgehog depending more lemming was swam \
unlike prosperously regarding shameful when and extravagant that then cat contagious.'
     };

     // An observable to hold the animation type.
     this.anim = ko.observable('None');
  
     // Construct the label for the animation menu
     this.animLabel = ko.pureComputed(function() {
       return ('Module Animation: ' + this.anim());
     }.bind(this));
 
     this.moduleConfig = ko.observable({view: [], viewModel: null});;
     this.moduleAnimation = ko.observable();
 
     this.animSelectAction = function (event) {
       var value = event.target.value;
       var anim = value ? ModuleAnimations[value] : null;
       this.moduleAnimation(anim);
       this.anim(event.target.textContent);
     }.bind(this);
 
     
      var parentRouter = Router.rootInstance;
      this.router = parentRouter.getChildRouter('chapter') || parentRouter.createChildRouter('chapter')
      .configure({
         'profile': {
            label: 'All',
            value: chapters['preface'],
            canExit: true
         },
         'recipient': {
            label: 'Add recipient',
            value: chapters['chapter1'],
            canExit: true
         }
      });

      // A computed observable which listens to the router's state change and
     // creates a module config Promise.
     var moduleConfigPromise = ko.pureComputed(function () {
      var value = this.router.stateId();
      
      var name = this.router.moduleConfig.name();
      var viewPath = 'views/' + value + '.html';
      var modelPath = 'viewModels/' + value;
      return ModuleElementUtils.createConfig({ viewPath: viewPath,
            viewModelPath: modelPath, params: { parentRouter: Router.rootInstance } });
    }.bind(this));

    // When the given module config Promise is resolved, pass it to our own
    // this.moduleConfig observable.
    var updateConfig = function (currentConfigPromise) {
      currentConfigPromise.then(function (moduleConfig) {
        // Guard against multiple router state changes causing modules to load
        // out-of-order by comparing the returned config Promise against the
        // latest in the view model.
        if (currentConfigPromise === moduleConfigPromise.peek()) {
          this.moduleConfig(moduleConfig);
        }
      }.bind(this));
    }.bind(this);
    // Update our moduleConfig with the initial value from the module config Promise
    updateConfig(moduleConfigPromise.peek());
    // When moduleConfigPromise udpates (due to router state change), tell it to
    // update our module config.
    moduleConfigPromise.subscribe(updateConfig.bind(this));

    // Invoke go() with the new state path when goto menu changes
    this.menuItemAction = function(event) {
      this.router.go(event.target.value);
    };

      var childRouter = this.router;
      this.selectHandler = function(event) {
        if ('menu' === event.target.id && event.detail.originalEvent) {
          console.log(event.detail.key);
           // router takes care of changing the selection
           event.preventDefault();
           // Invoke go() with the selected item.
           childRouter.go(event.detail.key);
        }
     }

      var salaryOptions =
        {
          style: 'currency',
          currency: 'USD',
          currencyDisplay: 'symbol'
        };
      this.salaryConverter = new NumberConverter.IntlNumberConverter(
              salaryOptions);
  
      var collection = new Model.Collection(null, {
        url: 'customers.json'
      });
  
      this.dataSource = new collectionModule.CollectionDataGridDataSource(collection,
              { rowHeader: 'CUSTOMER_ID' }
          );
        console.log(1);
      this.getCellClassName = function (cellContext) {
        var key = cellContext.keys.column;
        if (key === 'SALARY') {
          return 'oj-helper-justify-content-right';
        } else if (key === 'FIRST_NAME' ||
                  key === 'LAST_NAME' ||
                  key === 'EMAIL' ||
                  key === 'HIRE_DATE') {
          return 'oj-sm-justify-content-flex-start';
        }
        return '';
      };
    };
    return ViewModel;
  }
);