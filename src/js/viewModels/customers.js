define(['ojs/ojrouter','knockout', 'ojs/ojbootstrap', 'ojs/ojmodel', 'ojs/ojknockouttemplateutils', 'ojs/ojcollectiondatagriddatasource',
    'ojs/ojconverter-datetime', 'ojs/ojconverter-number', 'ojs/ojknockout', 'ojs/ojdatagrid'],
  function (Router, ko, Bootstrap, Model, KnockoutTemplateUtils,
    collectionModule, DateTimeConverter, NumberConverter) {
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

      var parentRouter = Router.rootInstance;
      this.router = parentRouter.getChildRouter('chapter') || parentRouter.createChildRouter('chapter')
      .configure({
         'preface': {
            label: 'All',
            value: chapters['preface'],
            canExit: true
         },
         'chapter1': {
            label: 'Chapter 1',
            value: chapters['chapter1'],
            canExit: true
         },
         'chapter2': {
            label: 'Chapter 2',
            value: chapters['chapter2'],
            canExit: true
         },
         'chapter3': {
            label: 'Chapter 3',
            value: chapters['chapter3'],
            canExit: true
         }
      });

      var childRouter = this.router;
      this.selectHandler = function(event) {
        if ('menu' === event.target.id && event.detail.originalEvent) {
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