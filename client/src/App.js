import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pic, setPic] = useState();
  const [sessionData, setSessionData] = useState("no session data");
  const [sessionSourceId, setSessionSourceId] = useState("no session"); //Used to check status.
  const [sessionStatus, setSessionStatus] = useState("No Status");
  const [sessionPresignedUrl, setSessionPresignedUrl] =
    useState("No session URL"); //Long amazon url
  const [heldFormData, setHeldFormData] = useState("");
  useEffect(() => {}, [sessionData, heldFormData]);

  //IMGIX EXAMPLES: STARTING SESSION
  const imgixHandleSubmitForSessionStarting = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("pic", pic);

    const test = await axios
      .post("http://localhost:5001/startImgixSession", formData)
      .then(console.log("starting imgix session"))
      .catch((error) => console.log(error.message));

    setSessionSourceId(test.data.allData.data.attributes.id); //Stores session Source id
    setSessionStatus(test.data.allData.data.attributes.status);
    setSessionPresignedUrl(test.data.allData.data.attributes.url);
    setHeldFormData(test.data.theBufferReturned.data);
  };
  const imgixHandleChangeForSessionStarting = (e) => {
    setPic(e.target.files[0]);
  };

  //IMGIX EXAMPLE: PUT REQUEST WITH PRESIGNED SESSION URL
  const sendFormDataPostRequest = async (e) => {
    e.preventDefault();
    const formDataPostRequest = new FormData();
    formDataPostRequest.append("pic", pic);
    formDataPostRequest.append("awsURL", sessionPresignedUrl);

    //Starting session
    const test = await axios
      .post("http://localhost:5001/postSession", formDataPostRequest)
      .then(console.log(""))
      .catch((error) => console.log(error.message));
  };

  //IMGIX EXAMPLE: CHECK SESSION STATUS
  const imgixHandleCheckStatus = async (e) => {
    e.preventDefault();
    const value = { grabbedSessionSourceID: sessionSourceId };

    //check session
    const sessionStatusForAxios = await axios
      .post("http://localhost:5001/checkImgixSessionStatus", value)
      .then(console.log("Check imgix session"))
      .catch((error) => console.log(error.message));

    setSessionStatus(
      "Checked: " + sessionStatusForAxios.data.data.attributes.status
    );
  };

  //IMGIX EXAMPLE: CLOSE SESSION
  const imgixHandleCloseSession = async (e) => {
    e.preventDefault();
    const valueData = { grabbedSessionSourceID: sessionSourceId };

    //close session
    const sessionStatusForAxios = await axios
      .post("http://localhost:5001/checkImgixCloseSession", valueData)
      .then(console.log("Client - CLOSE imgix session"))
      .catch((error) => console.log(error.message));

    setSessionStatus(
      "Checked: " + sessionStatusForAxios.data.data.attributes.status
    );
  };

  //See formData
  const seeFormData = () => {
    console.log(JSON.stringify(heldFormData));
  };

  return (
    <div className='app'>
      <form className='form' onSubmit={imgixHandleSubmitForSessionStarting}>
        <input type='file' onChange={imgixHandleChangeForSessionStarting} />
        <br />
        <button>Starting a session</button>
        <br />
        <button onClick={sendFormDataPostRequest}>
          Sending formData to Post Request
        </button>
      </form>
      <button onClick={imgixHandleCheckStatus}>Check session status</button>
      <br />
      <button onClick={imgixHandleCloseSession}>Close Session</button>
      <br />
      <button onClick={seeFormData}>See form data in Console log</button>
      <br />

      <h3>The sessionSourceId is: {sessionSourceId}</h3>
      <h3>The sessionStatus is: {sessionStatus}</h3>
      <h3>The sessionPresignedUrl is: {sessionPresignedUrl}</h3>
      {/* <h3>minetype is: {storedMimetype}</h3> */}
    </div>
  );
}

export default App;

/*
Steps to follow:
1) Start session
2) upload with Presigned URL
3) Close session
4) Check status.
*/
