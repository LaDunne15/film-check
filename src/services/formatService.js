class FormatService{

    secondsToHoursAndMinutes(seconds) {
      if(!seconds) return null;

        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds % 3600) / 60);
        
        if (hours === 0) {
          return minutes + "m";
        } else {
          return hours + "h " + minutes + "m";
        }
    }

    formatNumber(number) {
        if (number < 1000) {
          return number.toString();
        } else if (number < 1000000) {
          return (number / 1000).toFixed(1) + "K";
        } else if (number < 1000000000) {
          return (number / 1000000).toFixed(1) + "M";
        } else {
          return (number / 1000000000).toFixed(1) + "B";
        }
    }

    formatDate(inputDate) {
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];
    
      const parts = inputDate.split("-");
      if (parts.length === 3) {
        const year = parts[0];
        const month = months[parseInt(parts[1]) - 1];
        const day = parts[2];
        return `${day} ${month} ${year}`;
      } else {
        return "Неправильний формат дати";
      }
    }
    
      
}

const formatService = new FormatService();

export {formatService};