import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import Stack from "@mui/material/Stack";
import PrayerCards from "./PrayerCards";
import Fajr from "../assets/media/Magrb prayer.jpg";
import Dahr from "../assets/media/prayer.jpg";
import Asr from "../assets/media/prayer2.jpg";
import Magrb from "../assets/media/Magrb prayer 2.jpg";
import Asha from "../assets/media/Asha.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

export default function MainContent() {
  const [date, setDate] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState("Cairo");
  const [timing, setTiming] = useState({
    Fajr: "04:17",
    Dhuhr: "04:17",
    Asr: "04:17",
    Sunset: "04:19",
    Isha: "04:17",
  });
  const [reminingTime, setReminingTime] = useState();
  const [nextPrayerIndex, setNextPrayerIndex] = useState("");
  const countDwonTimer = () => {
    const momentNow = moment();
    let prayerIndex = 1;
    if (
      momentNow.isAfter(moment(timing["Fajr"], "HH:mm")) &&
      momentNow.isBefore(moment(timing["Dhuhr"], "HH:mm"))
    ) {
      prayerIndex = Object.keys(timing).indexOf("Dhuhr");
      console.log("next pryer is dhur");
    } else if (
      momentNow.isAfter(moment(timing["Dhuhr"], "HH:mm")) &&
      momentNow.isBefore(moment(timing["Asr"], "HH:mm"))
    ) {
      prayerIndex = Object.keys(timing).indexOf("Asr");

      console.log("next pryer is asr");
    } else if (
      momentNow.isAfter(moment(timing["Asr"], "HH:mm")) &&
      momentNow.isBefore(moment(timing["Sunset"], "HH:mm"))
    ) {
      prayerIndex = Object.keys(timing).indexOf("Sunset");
      console.log("next pryer is Sunset");
    } else if (
      momentNow.isAfter(moment(timing["Sunset"], "HH:mm")) &&
      momentNow.isBefore(moment(timing["Isha"], "HH:mm"))
    ) {
      prayerIndex = Object.keys(timing).indexOf("Isha");

      console.log("next pryer is isha");
    } else {
      prayerIndex = Object.keys(timing).indexOf("Fajr");
    }
    setNextPrayerIndex(prayerIndex);
    let remining = moment(Object.values(timing)[nextPrayerIndex], "HH:mm").diff(
      momentNow
    );
    let durationTime = moment.duration(remining);
    // console.log(
    //   durationTime.hours(),
    //   durationTime.minutes(),
    //   durationTime.seconds()
    // );
    setReminingTime(
      `${durationTime.hours()} : ${durationTime.minutes()} : ${durationTime.seconds()}`
    );
    // setReminingTime(durationTime.minutes )
    // console.log(moment(timing[Object.values(timing)[nextPrayerIndex]], "HH:mm"))
  };
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const getTiming = async () => {
    
    const response = await axios.get(
      `https://api.aladhan.com/v1/calendarByCity/2024/1?city=${selectedCity}&country=Egypt&method=2`
    );
    const times = response.data.data;
    const currentDate = new Date(Date());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const formattedDate = `${day.toString().padStart(2, "0")}-${month
      .toString()
      .padStart(2, "0")}-${year}`;
    setDate(formattedDate);
    times.map((time) => {
      if (time.date.gregorian.date == formattedDate) {

        setTiming(time.timings);
      }
    });
  };
  useEffect(
    () => {
      const rtime = setInterval(() => {
        countDwonTimer();
      }, 1000);
      return () => {
        clearInterval(rtime);
      };
    },
  [timing],[selectedCity]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(timer);
    };
  }, []);
  useEffect(() => {
    getTiming();
    countDwonTimer();

  }, [timing],[selectedCity]);

  return (
    <div>
      <Grid
        container
        style={{
          background: "#deefe7",
          color: "#f0a90a",
          paddingLeft: "15px",
          textAlign: "center",
        }}
      >
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div>
            <h3 style={{ margin: " 17px 0 5px", fontSize: "18px" }}>
              {" "}
              {selectedCity}
            </h3>
            <h5 style={{ margin: " 5px 0 10px", color: "#9c9991" }}>
              {" "}
              {currentTime.toLocaleTimeString()}{" "}
            </h5>
            <h5 style={{ margin: " 5px 0 10px", color: "#9c9991" }}>
              {" "}
              {date}{" "}
            </h5>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <div>
            <h3 style={{ margin: " 17px 0 10px" }}>
              Time remining until{" "}
              <span style={{color:"#27d20a", fontSize:"20px"}}>{Object.keys(timing)[nextPrayerIndex]}</span> prayer
            </h3>
            <h5 style={{ margin: " 10px 0 17px", color: "#9c9991",fontSize:"25px" }}>
              {reminingTime}
            </h5>
          </div>
        </Grid>
      </Grid>
      <Divider />
      <Stack
        direction={"row"}
        justifyContent={"center"}
        marginTop={"20px"}
        gap={"15px"}
        useFlexGap
        flexWrap="wrap"
      >
        <PrayerCards image={Fajr} prayer="Fajr" time={timing.Fajr} />
        <PrayerCards image={Dahr} prayer="Dhuhr" time={timing.Dhuhr} />
        <PrayerCards image={Asr} prayer="Asr" time={timing.Asr} />
        <PrayerCards image={Magrb} prayer="Sunset" time={timing.Sunset} />
        <PrayerCards image={Asha} prayer="Isha" time={timing.Isha} />
      </Stack>
      <Divider style={{ marginTop: "20px" }} />
      <Box sx={{ minWidth: 120 }} style={{ width: "30%", margin: "20px auto" }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">city</InputLabel>
          <Select
            style={{ color: "#f0a90a" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedCity}
            label="select city"
            onChange={handleCityChange}
          >
            <MenuItem value="Cairo">Cairo</MenuItem>
            <MenuItem value="Alexandria">Alexandria</MenuItem>
            <MenuItem value="Aswan">Aswan</MenuItem>
            <MenuItem value="Suez">Suez</MenuItem>
            <MenuItem value="South Sinai">South Sinai	</MenuItem>
            <MenuItem value="Damietta">Damietta</MenuItem>
            <MenuItem value="Luxor">Luxor</MenuItem>
            <MenuItem value="Red Sea">Red Sea	</MenuItem>
            <MenuItem value="North Sinai">North Sinai	</MenuItem>
            <MenuItem value="New Valley">New Valley	</MenuItem>
            <MenuItem value="Port Said">Port Said	</MenuItem>
            <MenuItem value="Sohag">Sohag	</MenuItem>
          </Select>
        </FormControl>
      </Box>{" "}
    </div>
  );
}
