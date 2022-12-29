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
    document.body.requestFullscreen();
});


function voice_feedback(text, index) {
    var speech = new SpeechSynthesisUtterance();
    speech.voice = speechSynthesis.getVoices()[index];
    speech.text = text;
    speechSynthesis.speak(speech);
}


var previous_ts;
var my_step = new Step();
window.addEventListener("devicemotion", function () {
    var current_ts = my_step.step.timestamp;
    if (previous_ts !== current_ts) {
        var cadence = Math.round(60000 / (current_ts - previous_ts));
        $("#cadence-cont spam").html(cadence);
        previous_ts = current_ts;
    }
}, false);


