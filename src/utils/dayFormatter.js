export const findDifference = (timestamp) => {
    var now = Date.now()
    var diff = now - timestamp
    var diffDays = diff/(24 * 1000 *  3600)
    var result = 0
    if (diffDays >= 1 && diffDays < 7) {
      result = Math.round(diffDays) + " дн."
    } else if (diffDays >= 7) {
      result = Math.round(diffDays / 7) + " нед."
    } else if (diffDays < 1) {
      var hours = diffDays * 24
      if (hours < 1) {
        var minutes = hours * 60
        if (minutes < 1) {
          var seconds = minutes * 60
          result = (seconds == 0 ? 1 : Math.round(seconds)) + " сек."
        } else {
          result = Math.round(minutes) + " мин."
        }
      } else {
        result = Math.round(hours) + " час."
      }
    }
    return result
  }