var speech = new SpeechSynthesisUtterance();
var voices = speechSynthesis.getVoices();
function voice_feedback(text, index) {
    speech.voice = voices[index];
    speech.text = text;
    speechSynthesis.speak(speech);
}

$("#hr-cont").on("click", () => {
    heartRateSensor.connect()
        .then(() => heartRateSensor.startNotificationsHeartRateMeasurement().then(heartRateMeasurement => {
            var hr_limit = 85;
            var hr_limit_reached = false;
            document.getElementById("app").requestFullscreen();
            heartRateMeasurement.addEventListener("characteristicvaluechanged", event => {
                var heartRateMeasurement = heartRateSensor.parseHeartRate(event.target.value);
                var hr = heartRateMeasurement.heartRate;
                $("#hr-cont spam")
                    .css({ "font-size": "400px" })
                    .html(hr);
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


