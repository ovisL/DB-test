import {useState} from "react";

function App() {
  const [name,setName] = useState("");
  const [content,setContent] = useState("");

  function submitFormToNotion() {
    console.log("we are in!"+name+content);
    fetch("https://localhost:4000/submitFormToNotion", {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        content: content
      })
    }).then(response => response.json())
    .then(data => {
      console.log('Sucess',data);
    }).catch((error) => {
      console.log('Error: ',error)
    });
  }
  return (
    <div className="App">
      <p>Name</p>
      <input type="text" id='name' onChange={(e) => setName(e.target.value)}/>
      <p>Content</p>
      <input type="text" id='content' onChange={(e) => setContent(e.target.value)} />
      <button onClick={submitFormToNotion}>Submit to notion</button>
    </div>
  );
}

export default App;
