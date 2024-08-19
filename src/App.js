import Dashboard from './nivo/DashBoard';
import SizeListener from './ImageMap/SizeListener'
import ZoomPanComponent from './ImageMap/Pan';

function App() {
  return (
    <div>
      {/* <Dashboard></Dashboard> */}
      <SizeListener></SizeListener>
      <ZoomPanComponent/>
      
    </div>
  );
}

export default App;
