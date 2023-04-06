import './App.css';
import Canvas from './components/Canvas';
import SidebarLeft from './components/SidebarLeft';
import SidebarRight from './components/SidebarRight';

function App() {

  return (
      <div className="App">
        <SidebarLeft />
        <Canvas />
        <SidebarRight />
        
      </div>
  );
}

export default App;
