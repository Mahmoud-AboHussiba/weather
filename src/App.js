import "./App.css";
import {
  Menu,
  Button,
  Card,
  Typography,
  ButtonGroup,
  Spinner,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

// Redux Imports
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "./features/weather/weatherSlice";

// External Imports
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

function App() {
  const [t, i18n] = useTranslation();

  const [loc, setLoc] = useState({ lat: "24.7136", lon: "46.6753" });
  const [city, setCity] = useState("Riyadh");

  const [date, setDate] = useState("");
  const [language, setlanguage] = useState("ar");

  const weather = useSelector((state) => state.weather.value);
  const isLoading = useSelector((state) => state.weather.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    moment.locale(language);
    setDate(moment().format("dddd") + " " + moment().format("LL"));
  }, [language]);

  useEffect(() => {
    i18n.changeLanguage(language);
    dispatch(fetchWeather(loc));
  }, [loc]);

  return (
    <div
      dir={language === "ar" ? "ltr" : "rtl"}
      className="App 
        bg-cyan-500 h-screen flex flex-col items-center justify-center"
    >
      <div className="flex-1 w-96 flex flex-col items-center justify-center ">
        <ButtonGroup className="py-5">
          <Button
            className="font-IBM font-light border-none bg-cyan-600 rounded-none"
            onClick={() => {
              setLoc({ lat: "30.0444", lon: "31.2357" });
              setCity("Cairo");
            }}
          >
            {t("Cairo")}
          </Button>
          <Button
            className="font-IBM font-light border-none bg-cyan-600 rounded-none"
            onClick={() => {
              setLoc({ lat: "24.7136", lon: "46.6753" });
              setCity("Riyadh");
            }}
          >
            {t("Riyadh")}
          </Button>
        </ButtonGroup>
        <Card className="max-w-md overflow-hidden px-4 font-IBM bg-blue-500 border-none shadow-lg shadow-black/50 text-slate-100">
          <Card.Header
            className={`mx-3 mt-3 flex items-stretch flex-row-reverse justify-start`}
          >
            <Typography
              type="h1"
              className={`font-IBM font-normal text-right py-2 px-4`}
            >
              {t(city)}
            </Typography>
            <Typography
              type="span"
              className={`font-IBM font-normal  text-right flex items-end `}
            >
              {date}
            </Typography>{" "}
            {/* How to make this takes the full height of the Card.Header? */}
          </Card.Header>
          <hr className="border-slate-400 mx-5"></hr>

          <Card.Body className={`flex items-stretch  flex-row-reverse `}>
            {/* Description */}
            {isLoading ? <Spinner /> : ""}
            <Typography
              type="h1"
              className="basis-1/2 font-IBM font-light flex items-center justify-center "
            >
              {weather.temperature}
            </Typography>
            {/* End Description */}

            {/* Big Icon */}
            <div className="basis-1/2 flex items-center justify-center">
              <img src={weather.iconPath} alt="..." />
            </div>
            {/* End Big Icon */}
          </Card.Body>
          <hr className="border-slate-400 mx-5"></hr>

          <Card.Footer className=" px-4 flex items-center justify-between">
            <Typography className={`mt-1 text-slate-300`}>
              {t(weather.description)}
            </Typography>
            <Typography className={`mt-1 text-slate-300`}>
              {t("min")}:{weather.min} | {t("max")}:{weather.max}
            </Typography>
          </Card.Footer>
        </Card>

        <div className="w-full py-5 flex flex-row items-start">
          <Menu>
            <Menu.Trigger
              as={Button}
              className="font-IBM font-light border-none bg-cyan-600"
            >
              {t("Select Language")}
            </Menu.Trigger>
            <Menu.Content className="bg-inherit border-none">
              <Menu.Item
                className={`font-IBM font-ligh flex justify-center`}
                onClick={() => {
                  i18n.changeLanguage("ar");
                  setlanguage("ar");
                }}
              >
                عربي
              </Menu.Item>
              <Menu.Item
                className={`font-IBM font-ligh flex justify-center`}
                onClick={() => {
                  i18n.changeLanguage("en");
                  setlanguage("en");
                }}
              >
                English
              </Menu.Item>
            </Menu.Content>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default App;
