$("#hr-cont").on("click", () => {
    heartRateSensor.connect()
    .then(() => heartRateSensor.startNotificationsHeartRateMeasurement().then(heartRateMeasurement => {
            heartRateMeasurement.addEventListener("characteristicvaluechanged", event => {
            var heartRateMeasurement = heartRateSensor.parseHeartRate(event.target.value);
            var hr = heartRateMeasurement.heartRate;
            $("hr-cont spam").html(hr);
            if( hr < 150 ){
                $("hr-cont").css({"background-color": "#5ccd5c"});
            }else{
                $("hr-cont").css({"background-color": "inianred"});
            }
        });
    }))
    .catch(error => {
        $("hr-cont spam").html = error;
    });
});








