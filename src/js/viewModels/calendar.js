define(['ojs/ojrouter','knockout', 'ojs/ojbootstrap', 'ojs/ojmodel', 'ojs/ojknockouttemplateutils',
    'ojs/ojarraydataprovider', 'ojs/ojknockout', 'ojs/ojpictochart', 'ojs/ojlegend'],
  function (Router, ko, Bootstrap, Model, KnockoutTemplateUtils, ArrayDataProvider) {
    var ViewModel = function () {

      var legendItems = [];
      var temp = ["10-20°F", "20-30°F", "30-40°F", "40-50°F", "50-60°F", "60-70°F", "70-80°F"];
      var colors = ["#267db3", "#47bdef", "#6ddbdb", "#a2bf39", "#fad55c", "#ffb54d", "#ed6647", "#ed6647"];

      var collection = new Model.Collection(null, {
        url: 'calendar.json'
      });

      //var data = JSON.parse('calendar.json')
            
      var getPictoItems = function (month) {
        var offset = (new Date(Date.parse(month + " 1, 2020"))).getDay();
        var padItems = []
        for (var i = 0; i < offset; i++) {
          padItems.push({ "date": 0, "value": null })
        }
        //return padItems.concat(data[month]);
        return padItems.concat(collection[month]);
      }

      for (var i = 0; i < temp.length; i++) {
        legendItems.push({ text: temp[i], color: colors[i] });
      };

      this.janDataProvider  = new ArrayDataProvider(getPictoItems('january'), {keyAttributes: 'date'});
      this.legendDataProvider = new ArrayDataProvider(legendItems, {keyAttributes: 'text'});

      this.getTooltip = function(month, date, value){
        return (date === 0 ? "":month + " " + date.toString() + " (" +  value.toString() + ")°F");
      }
      this.getColor = function (value) {
        return (value === null ? 'rgba(0,0,0,0)' : colors[Math.floor(value/10) - 1]);
      }

    };
    return ViewModel;
  }
);