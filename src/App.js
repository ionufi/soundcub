import React from 'react';
import { Canvas } from 'react-three-fiber';
import './style.css';
import { OrbitControls } from '@react-three/drei';
import { useFrame } from 'react-three-fiber';
import { useRef, useState } from 'react';
import { BoxGeometry, MeshBasicMaterial, Mesh, MeshLambertMaterial } from 'three';
//import { THREE } from 'three';
import sound from './mp3/Muddy_Waters_-_Mannish_Boy_(Audio)_(128 kbps).mp3'

var intensity = 0.5;
var backgroundMusic = new Audio('https://live.rockfm.ro/rockfm.aacp');
var mp3Play = new Audio(sound);
var playing = false;
var dataArray9 = [];

function mp3PlayLocal() {
  if(playing == false) {
    mp3Play.play();
    playing = true;
    soundAnalyzer();
  } else {
    mp3Play.pause();
    mp3Play.currentTime = 0;
    playing = false;
    soundAnalyzer();
  }
}

// Analyzer is not working for this stream for the moment (we get cross origin)
function playRockFM() {
  backgroundMusic.play();
  if (backgroundMusic.currentTime <= 0){
    backgroundMusic.play();
  } else {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }
}

function soundAnalyzer(){
  const audioCtx = new AudioContext();
  const audioSourceNode = audioCtx.createMediaElementSource(mp3Play);

  //Create analyser node
  const analyserNode = audioCtx.createAnalyser();
  analyserNode.fftSize = 256; // We will have an array with frequencies. Always half of this value. We can set minim 16.
  const bufferLength = analyserNode.frequencyBinCount;
  const dataArray = new Float32Array(bufferLength);

  //Set up audio node network
  audioSourceNode.connect(analyserNode);
  analyserNode.connect(audioCtx.destination);

  function refreshFrecvency(){
    analyserNode.getFloatFrequencyData(dataArray);
    dataArray9 = [];
    var getFrecvency = '';

    // Get 9 frecvencies from 128 and add them to dataArray9
    // Need investigation: to get a smaller dataArray
    for (let i=0; i < 9; i++){
      if (playing) {
        // We get the frecvency with values as -35.23 so we need to correct them for the box scale (between 1 and 3)
        getFrecvency = dataArray[i + 10] / 10 / 4 + 3.5;
      } else {
        getFrecvency = 1;
      }
      dataArray9.push(getFrecvency);
    }
  }

  setInterval(refreshFrecvency, 1);
}

function fecvencyNr(dataArrayNumber) {
  intensity = dataArray9[dataArrayNumber];

  return intensity
}

function SoundBox() {
    var mesh =
    <mesh>
      <boxGeometry args={[3, 3, 3]}  attach="geometry" ></boxGeometry>
      <meshLambertMaterial attach="material" color="green" transparent={true} opacity="0.2"></meshLambertMaterial>
    </mesh>
  
    return mesh
}

// We need a funcion to generate the boxes without repeating...

// function InsideBoxes(x,y,z,frecvency) {
//   const [height, setHeight] = useState(1);

//   // Generate height value
//   useFrame(() => {
//     setHeight(fecvencyNr(frecvency) || 1);
//   });

//     var mesh = 
//     <mesh position={[x,y,z]}>
//       <boxGeometry args={[1, height, 1]}  attach="geometry" ></boxGeometry>
//       <meshLambertMaterial attach="material" color="green" opacity={0.5}></meshLambertMaterial>
//     </mesh>

//   return mesh
// }
//InsideBoxes(1,0,1,0);

function InsideBox1(){
  const [height, setHeight] = useState(1);

  // Generate height value
  useFrame(() => {
    setHeight(fecvencyNr(0) || 1);
  });

  var mesh = 
    <mesh position={[1,0,1]}>
      <boxGeometry args={[1, height, 1]}  attach="geometry" ></boxGeometry>
      <meshLambertMaterial attach="material" color="green" opacity={0.5}></meshLambertMaterial>
    </mesh>

  return mesh
}

function InsideBox2(){
  const [height, setHeight] = useState(1);

  // Generate height value
  useFrame(() => {
    setHeight(fecvencyNr(1) || 1);
  });
  var mesh = 
    <mesh position={[0,0,1]}>
      <boxGeometry args={[1, height, 1]}  attach="geometry" ></boxGeometry>
      <meshLambertMaterial attach="material" color="blue"  opacity={0.9}></meshLambertMaterial>
    </mesh>

  return mesh
}

function InsideBox3(){
  const [height, setHeight] = useState(1);

  // Generate height value
  useFrame(() => {
    setHeight(fecvencyNr(2) || 1);
  });

  var mesh = 
    <mesh position={[-1,0,1]}>
      <boxGeometry args={[1, height, 1]}  attach="geometry" ></boxGeometry>
      <meshLambertMaterial attach="material" color="green"  opacity={0.9}></meshLambertMaterial>
    </mesh>

  return mesh
}


function InsideBox4(){
  const [height, setHeight] = useState(1);

  // Generate height value
  useFrame(() => {
    setHeight(fecvencyNr(3) || 1);
  });

  var mesh = 
    <mesh position={[-1,0,0]}>
      <boxGeometry args={[1, height, 1]}  attach="geometry" ></boxGeometry>
      <meshLambertMaterial attach="material" color="blue"  opacity={0.9}></meshLambertMaterial>
    </mesh>

  return mesh
}

function InsideBox5(){
  const [height, setHeight] = useState(1);

  // Generate height value
  useFrame(() => {
    setHeight(fecvencyNr(4) || 1);
  });

  var mesh = 
  <mesh position={[1,0,0]}>
    <boxGeometry args={[1, height, 1]}  attach="geometry" ></boxGeometry>
    <meshLambertMaterial attach="material" color="blue"  opacity={0.9}></meshLambertMaterial>
  </mesh>

  return mesh
}

function InsideBox6(){
  const [height, setHeight] = useState(1);

  // Generate height value
  useFrame(() => {
    setHeight(fecvencyNr(5) || 1);
  });

  var mesh = 
  <mesh position={[0,0,0]}>
    <boxGeometry args={[1, height, 1]}  attach="geometry" ></boxGeometry>
    <meshLambertMaterial attach="material" color="black"  opacity={0.9}></meshLambertMaterial>
  </mesh>

  return mesh
}

function InsideBox7(){
  const [height, setHeight] = useState(1);

  // Generate height value
  useFrame(() => {
    setHeight(fecvencyNr(6) || 1);
  });

  var mesh = 
  <mesh position={[1,0,-1]}>
    <boxGeometry args={[1, height, 1]}  attach="geometry" ></boxGeometry>
    <meshLambertMaterial attach="material" color="green"  opacity={0.9}></meshLambertMaterial>
  </mesh>

  return mesh
}

function InsideBox8(){
  const [height, setHeight] = useState(1);

  // Generate height value
  useFrame(() => {
    setHeight(fecvencyNr(7) || 1);
  });

  var mesh = 
    <mesh position={[-1,0,-1]}>
      <boxGeometry args={[1, height, 1]}  attach="geometry" ></boxGeometry>
      <meshLambertMaterial attach="material" color="green"  opacity={0.9}></meshLambertMaterial>
    </mesh>

  return mesh
}

function InsideBox9(){
  const [height, setHeight] = useState(1);

  // Generate height value
  useFrame(() => {
    setHeight(fecvencyNr(8) || 1);
  });

  var mesh = 
    <mesh position={[0,0,-1]}>
      <boxGeometry args={[1, height, 1]}  attach="geometry" ></boxGeometry>
      <meshLambertMaterial attach="material" color="blue"  opacity={0.9}></meshLambertMaterial>
    </mesh>

  return mesh
}


// Playground and tests in second canvas: Box2 and Box3
function Box2() {
  var mesh =     
    <mesh>
      <boxGeometry args={[0.5, 3, 0.5]} position={[3,1,1]} ></boxGeometry>
      <meshLambertMaterial attach="material" color="green" transparent='true' opacity='0.6'></meshLambertMaterial>
    </mesh>
    
  return mesh
}

function Box3() {
  const [height, setHeight] = useState(1);
  const meshRef = useRef();

  // Generate height value
  useFrame(() => {
    setHeight(fecvencyNr(0)  || 1);
  });

  const geometry = new BoxGeometry(1, height, 1);
  const material = new MeshLambertMaterial({ transparent: true, color: 'blue', opacity: 0.4});

  return <mesh geometry={geometry} material={material} ref={meshRef} />;
}

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <header>
        <h2>
          <p>
            <strong>Sound Cube</strong>
          </p>
        </h2>
      </header>
      <br></br>
      <div>
        <button onClick={mp3PlayLocal}>Local mp3</button>
        <button onClick={playRockFM}>Rock FM :)</button>
      </div>
      <br></br>
      <br></br>
      <Canvas>
        <SoundBox />
        <InsideBox1 />
        <InsideBox2 />
        <InsideBox3 />
        <InsideBox4 />
        <InsideBox5 />
        <InsideBox6 />
        <InsideBox7 />
        <InsideBox8 />
        <InsideBox9 ></InsideBox9>
        <OrbitControls target={[0,0,0]}/>
        <ambientLight intensity={0.5}></ambientLight>
        <spotLight intensity={2} position={[50,80,20]} angle={0.3}></spotLight>
      </Canvas>
      <br></br> 
      <Canvas widht={[200]}>
        <OrbitControls target={[0,0,0]}/>
        <Box2 />
        <Box3 />
        <ambientLight intensity={0.5}></ambientLight>
        <spotLight intensity={1} position={[50,80,20]} angle={0.3}></spotLight>
        <perspectiveCamera ></perspectiveCamera>
      </Canvas>
      <br></br>
    </div>
  );
}

export default App;
