import "./App.css";
import WeatherCard from "./components/WeatherCard";
import { Menu, Button } from "@material-tailwind/react";

function App() {
  return (
    <div
      dir="ltr"
      className="App 
        bg-cyan-500 h-screen flex flex-col items-center justify-center"
    >
      <div className="flex-1 w-96 flex flex-col items-center justify-center ">
        <WeatherCard />

        <div className="w-full py-5 flex flex-row items-start">
          <Menu>
            <Menu.Trigger
              as={Button}
              className="font-IBM font-light border-none bg-inherit"
            >
              إنجليزى
            </Menu.Trigger>
            <Menu.Content className="bg-inherit border-none">
              <Menu.Item className="font-IBM font-light bg-yellow-400 text-center">
                عربي
              </Menu.Item>
              <Menu.Item>Add Project</Menu.Item>
              <Menu.Item>My Profile</Menu.Item>
            </Menu.Content>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default App;
