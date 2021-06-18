import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay,faAngleLeft,faAngleRight,faPause} from '@fortawesome/free-solid-svg-icons';


const Player=({isPlaying,setIsPlaying,currentSong,audioRef,songInfo,setSongInfo,songs,setCurrentSong,setSongs})=>{
    const activeLibraryHandler=(nextPrev)=>{
        const newSongs=songs.map((song)=>{
            if((song.id===nextPrev.id))
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
    };
    const playSongHandle=()=>{
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(false);
        }
        else{
            audioRef.current.play();
            setIsPlaying(true);
        }
    }
    const getTime=(time)=>{
        return(
            Math.floor(time/60)+":"+("0"+Math.floor(time%60)).slice(-2)
        );
    };
    const dragHandle=(e)=>{
        audioRef.current.currentTime=e.target.value;
        setSongInfo({...songInfo,currentTime:e.target.value})
    };
    const skipTrackHandle=async(direction)=>{
        let currentIndex=songs.findIndex((song)=>song.id===currentSong.id);
        if(direction==='skip-back'){
            if(currentIndex===0){
                await setCurrentSong(songs[songs.length-1]);
                activeLibraryHandler(songs[songs.length-1]);
            }
            else{
                await setCurrentSong(songs[currentIndex-1]);
                activeLibraryHandler(songs[currentIndex-1]);
            };
            if(isPlaying) audioRef.current.play();
        }
        if(direction==='skip-forward'){
            if(currentIndex===songs.length-1){
                await setCurrentSong(songs[0]);
                activeLibraryHandler(songs[0]);
            }
            else{
                await setCurrentSong(songs[currentIndex+1]);
                activeLibraryHandler(songs[currentIndex+1]);
            }
            if(isPlaying) audioRef.current.play();
        };
    };
    const trackAnim={
        transform:`translateX(${songInfo.animationPercentage}%)`
    }
    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div 
                style={{background:`linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})`}} 
                className="track">
                    <input 
                    min={0} 
                    max={songInfo.duration || 0} 
                    value={songInfo.currentTime} 
                    onChange={dragHandle}
                    type="range" />
                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo.duration?getTime(songInfo.duration):"0:00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon 
                onClick={()=>skipTrackHandle('skip-back')} 
                className="skip-back" 
                size='2x' 
                icon={faAngleLeft}/>
                <FontAwesomeIcon 
                onClick={playSongHandle} 
                className="play" 
                size='2x' 
                icon={isPlaying?faPause:faPlay}/>
                <FontAwesomeIcon 
                onClick={()=>skipTrackHandle('skip-forward')} 
                className="skip-forward" 
                size='2x' 
                icon={faAngleRight}/>
            </div>
        </div>
    );
};

export default Player;