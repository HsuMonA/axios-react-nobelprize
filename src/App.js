import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const baseURL = "https://api.nobelprize.org/2.1/nobelPrizes";

function App() {
  const [list, setList] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setList(response.data);
    });
  }, []);

  if (!list) return null;

  function renderNobelPrize(nobelPrize) {
    return (
      <div>
        <p>Year: {nobelPrize.awardYear}</p>
        <ul>{nobelPrize.laureates.map(renderLaureates)}</ul>
      </div>
    );
  }

  function renderLaureates(laureate) {
    if (laureate.knownName) {
      return <li>{laureate.knownName.en}</li>;
    } else {
      return <li>{laureate.orgName.en}</li>;
    }
  }

  return <div>{list.nobelPrizes.map(renderNobelPrize)}</div>;
}

export default App;
