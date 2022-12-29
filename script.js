var hr_limit = 100;

$("#hr-cont").on("click", () => {
    heartRateSensor.connect()
        .then(() => heartRateSensor.startNotificationsHeartRateMeasurement().then(heartRateMeasurement => {
            heartRateMeasurement.addEventListener("characteristicvaluechanged", event => {
                var heartRateMeasurement = heartRateSensor.parseHeartRate(event.target.value);
                var hr = heartRateMeasurement.heartRate;
                $("#hr-cont spam")
                    .css({ "font-size": "450px" })
                    .html(hr);
                if (hr < hr_limit) {
                    $("#hr-cont").css({ "background-color": "#5ccd5c" });
                    voice_feedback("Now it's fine.", 5);
                } else {
                    $("#hr-cont").css({ "background-color": "indianred" });
                    voice_feedback("Slow down!", 6);
                }
            });
            document.getElementById("app").requestFullscreen();
        }))
        .catch(error => {
            $("#hr-cont spam")
                .css({ "font-size": "40px" })
                .html(error.toString());
        });
});


var speech = new SpeechSynthesisUtterance();
var voices = speechSynthesis.getVoices();
function voice_feedback(text, index) {
    speech.voice = voices[index];
    speech.text = text;
    speechSynthesis.speak(speech);
}


