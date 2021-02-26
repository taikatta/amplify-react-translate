import React, {useState} from 'react';
import Amplify from 'aws-amplify';
import Predictions, { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

function TranslateMyText() {
  const [response, setResponse] = useState("Input some text and click 'Translate'")
  const [textToTranslate, setTextToTranslate] = useState("");
  const [targetLang, setTargetLang] = useState('es');

    function translate() {
      Predictions.convert({
        translateText: {
          source: {
            text: textToTranslate,
          },
          targetLanguage: targetLang
        }
      }).then(result => setResponse(result.text))
        .catch(err => setResponse(err.message))
    }

    function setText(event) {
      setTextToTranslate(event.target.value);
    }

    function onChange(event) {
      setTargetLang(event.target.value);
    }

    return (
      <div className="Input">
        <div style={{ padding: 50 }}>
          <h3>Text Translation</h3>
          <input value={textToTranslate} onChange={setText}></input>
          <button onClick={translate}>Translate</button>

          <h3>Translated text</h3>
          <p>{response}</p>
            <select value={targetLang} onChange={onChange}>
              <option value='es'>Spanish</option>
              <option value='ar'>Arabic</option>
              <option value='hu'>Hungarian</option>
              <option value='zh'>Chinese</option>
              <option value='el'>Greek</option>
              <option value='pl'>Polish</option>
            </select>
        </div>
      </div>
    );
}

export default TranslateMyText;