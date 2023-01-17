$(".loader").html('<svg viewBox="25 25 50 50"><circle cx="50" cy="50" r="20"/></svg>');
$("#loader-init").delay(2000).fadeOut(300, () => $("#app").fadeIn(300));
$.event.special.tap.tapholdThreshold = 3000;

$("#app").on("taphold", startRecording);
$("#hrs").on("click", startHRMonitoring);


/*
navigator.geolocation.watchPosition(
    position => {
        var speed = position.coords.speed;
        var pace = speed ? (1000 / speed / 60).toFixed(2) : "-";
        $("#vlc").html(pace);
    },
    error => {
        console.log(error);
        $("#vlc").html("\\(°_o)/");
    },
    {
        enableHighAccuracy: true,
        timeout: 10000
    }
);
*/


var wakeLock;
function startRecording(){
    document.body.webkitRequestFullscreen();
    navigator.wakeLock.request("screen");
    //startWatch();

}

window.addEventListener("blur", () => wakeLock && wakeLock.release());


function startWatch(){
    var milsecToTime = s => {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var sec = s % 60;
        s = (s - sec) / 60;
        var min = s % 60;
        var hr = (s - min) / 60;
        return `${hr}:${("00" + min).slice(-2)}:${("00" + sec).slice(-2)}`;
    }
    var startTime = new Date();
    setInterval(() => $("#wch").html(milsecToTime(new Date() - startTime)), 1000);
}




function startHRMonitoring(){
    heartRateSensor.connect()
    .then(() => heartRateSensor.startNotificationsHeartRateMeasurement().then(heartRateMeasurement => {
        $("#hrs").off("click");
        $("span").css({ "color": "black" });
        var hr_limit = 150;
        var hr_limit_reached = false;
        heartRateMeasurement.addEventListener("characteristicvaluechanged", event => {
            var hr = heartRateSensor.parseHeartRate(event.target.value).heartRate;
            $("#hrs").html(hr);
            if (hr < hr_limit) {
                $("#app").css({ "background-color": "#5ccd5c" });
                if (hr_limit_reached === true) voice_feedback("Now it's fine.", 5);
                hr_limit_reached = false;
            } else {
                $("#app").css({ "background-color": "indianred" });
                if (hr_limit_reached === false) voice_feedback("Slow down!", 6);
                hr_limit_reached = true;
            }
        });
    }));
}


function voice_feedback(text, voice_index) {
    var speech = new SpeechSynthesisUtterance();
    speech.voice = speechSynthesis.getVoices()[voice_index];
    speech.text = text;
    speechSynthesis.speak(speech);
}


