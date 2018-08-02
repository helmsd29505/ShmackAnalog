    import clock from "clock";
    import document from "document";
    import { preferences } from "user-settings";
    import * as util from "../common/utils";
    import { battery } from "power";
    import { HeartRateSensor } from "heart-rate";
    import { today } from "user-activity";
    import * as util from "../common/utils";
    
// weather Start

    import { vibration } from 'haptics';
    import { initMessaging } from './messaging';

    const weather = document.getElementById('weather');
    initMessaging();

// end weather
    // Update the clock every minute
    clock.granularity = "minutes";
    // Set up variables - get references to document elements
    let hrtValue = document.getElementById("heartrateValue");
    let stpValue = document.getElementById("stepsValue");
    
    // Battery Measurement
    function updateBat (){
      let bVal = (Math.floor(battery.chargeLevel) + "%");
      let battValue = document.getElementById("battValue");
      battValue.text = bVal
    }
    let dateText1 = document.getElementById("date1");
    let dateText2 = document.getElementById("date2");
    // Define days
    let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    // Create new HR Sensor handle
    let hrm = new HeartRateSensor();
    // When the value changes, update text
    hrm.onreading = function() {
    // Peek the current sensor values
    hrtValue.text = hrm.heartRate || 0;
    // Stop monitoring the sensor
    hrm.stop();
    }    
    // Update text every second
    setInterval(updateText, 1000);
    // Get a handle on the <text> element
    const myLabel = document.getElementById("myLabel");

    // Update the <text> element every tick with the current time
    clock.ontick = (evt) => {
    let today = evt.date;
    let hours = today.getHours();
    if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
    } else {
    // 24h format
    hours = util.zeroPad(hours);
    }
    let mins = util.zeroPad(today.getMinutes());
    myLabel.text = `${hours}:${mins}`;
    }
    let dateText = document.getElementById("date");
    // Update calories, altitude, steps and heartrate
    function updateText() {
    let now = new Date();
    dateText1.text = now.getDate() + " " + months[now.getMonth()];
    // Update Day of week
    dateText2.text = days[now.getDay()];
    // Update Steps taken
    stpValue.text = today.adjusted.steps || 0;
    // Update Heart Rate
    hrm.start();
    // Update Battery Level
    updateBat();
      //console.log("end update /app/index");
    }