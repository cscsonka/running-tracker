$("#hr-cont").on("click", () => {
    heartRateSensor.connect()
        .then(() => heartRateSensor.startNotificationsHeartRateMeasurement().then(heartRateMeasurement => {
            $("#hr-cont").off("click");
            var hr_limit = 85;
            var hr_limit_reached = false;
            heartRateMeasurement.addEventListener("characteristicvaluechanged", event => {
                var hr = heartRateSensor.parseHeartRate(event.target.value).heartRate;
                $("#hr-cont spam").html(hr);
                if (hr < hr_limit) {
                    $("#hr-cont").css({ "background-color": "#5ccd5c" });
                    if (hr_limit_reached === true) voice_feedback("Now it's fine.", 5);
                    hr_limit_reached = false;
                } else {
                    $("#hr-cont").css({ "background-color": "indianred" });
                    if (hr_limit_reached === false) voice_feedback("Slow down!", 6);
                    hr_limit_reached = true;
                }
            });
        }))
        .catch(error => {
            $("#hr-cont spam")
                .css({ "font-size": "40px" })
                .html(error.toString());
        });
});


$("#cadence-cont").on("click", () => {
    document.getElementById("app").requestFullscreen();
});


function voice_feedback(text, index) {
    var speech = new SpeechSynthesisUtterance();
    speech.voice = speechSynthesis.getVoices()[index];
    speech.text = text;
    speechSynthesis.speak(speech);
}


var count = new Countstep();
window.addEventListener("devicemotion", function () {
    $("#cadence-cont spam").html(count[0]);
}, false);


