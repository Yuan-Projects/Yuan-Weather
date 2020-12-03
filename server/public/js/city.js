window.onload = function () {
  document.getElementById('geolocButton').addEventListener('click', function(event) {
    var classList = this.classList;
    event.preventDefault();
    if (classList.contains('locating')) {
      return false;
    }

    var startPos;
    var geoOptions = {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000
    };

    var nudge = document.getElementById("nudge");

    var showNudgeBanner = function() {
      nudge.style.display = "block";
      setTimeout(hideNudgeBanner, 1500);
    };

    var hideNudgeBanner = function() {
      nudge.style.display = "none";
    };

    var geoSuccess = function(position) {
      hideNudgeBanner();
      classList.remove('locating');
      // Do magic with location
      startPos = position;
      fetch('/api/getcitybygeocode/' + encodeURIComponent(startPos.coords.latitude + ',' + startPos.coords.longitude)).then(data => {
        return data.json()
      }).then(result => {
        if (result.city) {
          window.location = '/city/' + encodeURIComponent(result.city);
        }
      })
    };
    var geoError = function(error) {
      showNudgeBanner();
      classList.remove('locating');
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    classList.add('locating');
  });
}