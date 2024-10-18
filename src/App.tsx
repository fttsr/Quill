import MainEditor from "./components/MainEditor";
import './App.css';
import Titlebar from "./components/Titlebar";

export default function App() {
  return (
    <div>
      <Titlebar />
      <MainEditor />
    </div>
  );
}