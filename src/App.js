import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faTumblr } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useEffect, useState } from 'react';
function App() {
  const [data, setData] = useState([]);
  const [color, setcolor] = useState("#080");
  const getRgb = () => Math.floor(Math.random() * 256);

  const rgbtoHex = (r, g, b) => "#" + [r, g, b].map((x) => {
    const hex = x.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }).join("");

  const handleGenerate = () => {
    const color = {
      r: getRgb(),
      g: getRgb(),
      b: getRgb()
    };
    setcolor(rgbtoHex(color.r, color.g, color.b));
  }

  const getData = () => {
    handleGenerate();
    fetch("https://api.api-ninjas.com/v1/quotes?category=inspirational", {
      mathod: "GET",
      headers: {
        "X-Api-Key": "4H+eZyt4euhDTRJtREjrbQ==25E1k46kO6ceMaM2",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then((response) => { setData(response[0]) })
      .catch((err) => { console.log(err) })
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    <div style={{ backgroundColor: color }}>
      <div className="container d-flex align-items-center justify-content-center" style={{ height: "100vh" }} >
        <div id='quote-box' className='border rounded-4 card' >
          <div className='p-5' >
            <q id='text fw-semibold' className='fs-2' style={{ color: color }}>{data.quote ? data.quote : "No Data Found"}</q>
            <p id="author" style={{ marginLeft: "80%", color: color }}>- {data.author ? data.author : "No Data Found"}</p>
          </div>
          <div className='mb-4 d-flex justify-content-between px-4 '>
            <div>
              <a target="_blank" rel="noreferrer" href='https://twitter.com/intent/tweet' className='btn me-3 text-white' style={{ backgroundColor: color }}><FontAwesomeIcon icon={faTwitter} /></a>
              <a target="_blank" rel="noreferrer" href='https://twitter.com/intent/tweet' className='btn text-white font-monospace' style={{ backgroundColor: color }}><FontAwesomeIcon icon={faTumblr} /></a>
            </div>
            <button className='btn text-white' id="new-quote" onClick={() => { getData(); }} style={{ backgroundColor: color }}>New Quote</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
