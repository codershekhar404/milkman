import "./App.css";
import HistoryTable from "./components/HistoryTable";
import Table from "./components/Table";

function App() {
  return (
    <div className="flex-box">
      <Table />
      <HistoryTable />
    </div>
  );
}

export default App;
