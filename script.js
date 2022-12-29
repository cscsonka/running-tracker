var hr_limit = 100;

$("#hr-cont").on("click", () => {
    heartRateSensor.connect()
        .then(() => heartRateSensor.startNotificationsHeartRateMeasurement().then(heartRateMeasurement => {
            document.getElementById("app").requestFullscreen();
            heartRateMeasurement.addEventListener("characteristicvaluechanged", event => {
                var heartRateMeasurement = heartRateSensor.parseHeartRate(event.target.value);
                var hr = heartRateMeasurement.heartRate;
                $("#hr-cont spam").html(hr);
                if (hr < hr_limit) {
                    $("#hr-cont").css({ "background-color": "#5ccd5c" });
                } else {
                    $("#hr-cont").css({ "background-color": "inianred" });
                }
            });
        }))
        .catch(error => {
            console.log(error);
            $("#hr-cont spam").html(error);
        });
});


