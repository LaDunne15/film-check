class FormatService{

    secondsToHoursAndMinutes(seconds) {
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds % 3600) / 60);
        
        if (hours === 0) {
          return minutes + " хв";
        } else {
          return hours + " г " + minutes + " хв";
        }
    }

    formatNumber(number) {
        if (number < 1000) {
          return number.toString();
        } else if (number < 1000000) {
          return (number / 1000).toFixed(1) + " тис.";
        } else if (number < 1000000000) {
          return (number / 1000000).toFixed(1) + " млн";
        } else {
          return (number / 1000000000).toFixed(1) + " млрд";
        }
    }
      
}

const formatService = new FormatService();

export {formatService};