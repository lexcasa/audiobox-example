import { useState, useEffect } from 'react';
import Mirt from 'react-mirt';
import 'react-mirt/dist/css/react-mirt.css';
import './App.css';

/* 
  CORS BUCKET IN S3 MUST BE LIKE THIS
  [
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "HEAD"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 3000
    }
]

*/

export function AudioBoxTrim(props){
  const {url} = props
  const [audioFile, setAudioFile] = useState({type: 'audio'})
  const [loadFile, setLoadFile] = useState(false)
  useEffect(() => {
    fetch(url)
    .then(response => {
      return response.blob()
    })
    .then(blob => {
      const audiFile = new File([blob], 'dynamic_audio.mp3', {type: 'audio'})
      setAudioFile(audiFile);
      setTimeout( () => {
        setLoadFile(true)
      })
    })
    .catch(e => {
      console.log(e);
      return e;
    });
  }, []);
  return (
    <>
      {loadFile && (<Mirt 
        file={audioFile}
      />)}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <AudioBoxTrim url={'https://muze-mvp-dev-audio-assets.s3.us-east-2.amazonaws.com/files/audio-d9e64956-fe1b-435f-bd1e-fe352a4c22ae.mp3'} />
    </div>
  );
}

export default App;
