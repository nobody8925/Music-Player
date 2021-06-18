import React,{useState,useRef} from 'react';
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav';
import './styles/app.scss';
import data from './data';

function App() {
  const [songs,setSongs]=useState(data());
  const [currentSong,setCurrentSong]=useState(songs[0]);
  const [isPlaying,setIsPlaying]=useState(false);
  const audioRef=useRef(null);
  const [songInfo,setSongInfo]=useState({
    currentTime:0,
    duration:0,
  });
  const [libraryStatus,setLibraryStatus]=useState(false);
  const timeUpdateHandle=(e)=>{
    const current=e.target.currentTime;
    const duration=e.target.duration;
    const roundedCurrent=Math.round(current);
    const roundedDuration=Math.round(duration);
    const animation=Math.round((roundedCurrent/roundedDuration)*100)
    setSongInfo({...songInfo,currentTime:current,duration,animationPercentage:animation});
  };
  const endSongHandle=(nextSong)=>{
    const newSongs=songs.map((song)=>{
      if((song.id===nextSong.id))
      {
          return{
              ...song,
              active:true,
          };
      }
      else{
          return{
              ...song,
              active:false,
          }
      }
  });
  setSongs(newSongs);
  }
  const songEndHandler=async()=>{
    let currentIndex=songs.findIndex((song)=>song.id===currentSong.id);
    if(currentIndex===songs.length-1){
      await setCurrentSong(songs[0]);
      endSongHandle(songs[0]);
    }
    else{
      await setCurrentSong(songs[currentIndex+1]);
      endSongHandle(songs[currentIndex+1]);
    };
    if(isPlaying) audioRef.current.play();
  };
  return (
    <div className={`App ${libraryStatus?"library-active":""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
      <Song currentSong={currentSong}/>
      <Player 
      isPlaying={isPlaying} 
      setIsPlaying={setIsPlaying} 
      currentSong={currentSong}
      audioRef={audioRef}
      songInfo={songInfo}
      setSongInfo={setSongInfo}
      songs={songs}
      setCurrentSong={setCurrentSong}
      setSongs={setSongs}/>
      <Library 
      songs={songs} 
      setCurrentSong={setCurrentSong}
      audioRef={audioRef}
      currentSong={currentSong}
      isPlaying={isPlaying}
      setSongs={setSongs}
      libraryStatus={libraryStatus}/>
      <audio 
      onTimeUpdate={timeUpdateHandle} 
      onLoadedMetadata={timeUpdateHandle}
      ref={audioRef} 
      src={currentSong.audio}
      onEnded={songEndHandler}></audio>
    </div>
  );
};

export default App;