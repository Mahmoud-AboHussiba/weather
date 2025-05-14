import { Card, Typography } from "@material-tailwind/react";
import { Circle, Cloud } from "iconoir-react";


export default function WeatherCard() {
  return (
    <Card className="max-w-md overflow-hidden font-IBM bg-blue-500 border-none shadow-lg shadow-black/50 text-slate-100">
      <Card.Header className="mx-3 mt-3 flex items-stretch flex-row-reverse justify-start">
        <Typography
          type="h1"
          className="font-IBM font-normal text-right py-2 pr-8"
        >
          الرياض
        </Typography>
        <Typography
          type="span"
          className="font-IBM font-normal  text-right flex items-end pr-2"
        >
          مايو ٢٨ ٢٠٣٠
        </Typography>{" "}
        {/* How to make this takes the full height of the Card.Header? */}
      </Card.Header>
      <hr className="border-slate-400 mx-5"></hr>

      <Card.Body className="flex items-stretch flex-row-reverse ">
        {/* Description */}
        <div className="grow pr-8">
          <div className="flex items-center flex-row-reverse jsustify-space-between">
            <Typography type="h1" className="font-IBM font-light ">
              40
            </Typography>
            <Circle className="mr-6 h-full w-1/6"></Circle>
          </div>
          <div>
            <Typography className="mt-1 text-slate-300 text-right">
              سماء صافيه
            </Typography>
            <Typography className="mt-1 text-slate-300 text-right">
              الصغرى:40 | الكبرى:40
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
  );
}
