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


var ps;
var my_step = new Step();
var now = new Date().getTime();
window.addEventListener("devicemotion", function () {
    if (ps !== my_step.step.count) {
        var cadence_text = $("#cadence-cont spam");
        cadence_text.html(my_step.step.count + " - " + ((my_step.step.timestamp - now) / 1000).toFixed(1) + "<br>" + cadence_text.html());
        ps = my_step.step.count;
    }
}, false);


