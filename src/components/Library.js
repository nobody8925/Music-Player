import React from 'react';
import LibrarySong from './LibrarySong';

const Library=({songs,setCurrentSong,audioRef,currentSong,isPlaying,setSongs,libraryStatus})=>{
    return(
        <div className={`library ${libraryStatus?"active-library":""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song=>(
                    <LibrarySong 
                    songs={songs} 
                    setCurrentSong={setCurrentSong} 
                    song={song}
                    id={song.id}
                    audioRef={audioRef}
                    isPlaying={isPlaying}
                    setSongs={setSongs}
                    currentSong={currentSong}
                    key={song.id}/>
                ))}
            </div>
        </div>
    );
};

export default Library;