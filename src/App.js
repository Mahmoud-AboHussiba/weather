import "./App.css";
import { Menu, Button, Card, Typography } from "@material-tailwind/react";
import { Circle, Cloud } from "iconoir-react";
import { useEffect, useState } from "react";

import axios from "axios";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

function App() {
  const [t, i18n] = useTranslation();
  const [temp, setTemp] = useState({
    temperature: null,
    description: null,
    iconPath: null,
    min: null,
    max: null,
  });

  const [date, setDate] = useState("");
  const [language, setlanguage] = useState("ar");

  let cancleAxios = null;
  console.log(i18n.language);

  useEffect(() => {
    moment.locale(language);
    setDate(moment().format("dddd") + " " + moment().format("LL"));
  }, [language]);

  useEffect(() => {
    i18n.changeLanguage("ar");

    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=24.7136&lon=46.6753&appid=c0cc93f437c4711351ed54397912472d",
        {
          cancelToken: new axios.CancelToken((c) => {
            cancleAxios = c;
          }),
        }
      )
      .then(function (response) {
        console.log(response.data);
        let iconURL =
          "https://openweathermap.org/img/wn/" +
          response.data.weather[0].icon +
          "@2x.png";
        console.log(iconURL);
        // handle success
        setTemp({
          temperature: Math.round(response.data.main.temp - 272.15),
          description: response.data.weather[0].description,
          iconPath: iconURL,
          min: Math.round(response.data.main.temp_min - 272.15),
          max: Math.round(response.data.main.temp_max - 272.15),
        });
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
      });

    return () => {
      // console.log('cancling')
      cancleAxios();
    };
  }, []);

  return (
    <div
      dir={language === "ar" ? "ltr" : "rtl"}
      className="App 
        bg-cyan-500 h-screen flex flex-col items-center justify-center"
    >
      <div className="flex-1 w-96 flex flex-col items-center justify-center ">
        <Card className="max-w-md overflow-hidden px-4 font-IBM bg-blue-500 border-none shadow-lg shadow-black/50 text-slate-100">
          <Card.Header
            className={`mx-3 mt-3 flex items-stretch flex-row-reverse justify-start`}
          >
            <Typography
              type="h1"
              className={`font-IBM font-normal text-right py-2 px-4`}
            >
              {t("Riyadh")}
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
            <div className={`grow px-4`}>
              <div
                className={`flex items-center  jsustify-space-between flex-row-reverse`}
              >
                <Typography type="h1" className="font-IBM font-light ">
                  {temp.temperature}
                </Typography>
                <img src={temp.iconPath} alt="..." />
              </div>
              <div>
                <Typography
                  className={`mt-1 text-slate-300  ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t(temp.description)}
                </Typography>
                <Typography
                  className={`mt-1 text-slate-300  ${
                    language === "ar" ? "text-right" : "text-left"
                  }`}
                >
                  {t("min")}:{temp.min} | {t("max")}:{temp.max}
                </Typography>
              </div>
            </div>
            {/* End Description */}

            {/* Big Icon */}
            <div className="grow flex items-center justify-center">
              <Cloud className="w-full h-full"></Cloud>
            </div>
            {/* End Big Icon */}
          </Card.Body>
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
                className={`font-IBM font-ligh flex  ${
                  i18n.language === "ar" ? "justify-end" : ""
                }`}
                onClick={() => {
                  i18n.changeLanguage("ar");
                  setlanguage("ar");
                }}
              >
                عربي
              </Menu.Item>
              <Menu.Item
                className={`font-IBM font-ligh flex  ${
                  i18n.language === "ar" ? "justify-end" : ""
                }`}
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
