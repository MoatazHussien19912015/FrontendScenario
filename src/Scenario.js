import React, {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import { DebounceInput } from 'react-debounce-input';

const Scenario = () => {
    const [searchTerm, setSearchTerm] = useState('');
   
    const [songs, setSongs] = useState(['A', 'B', 'C', 'D', 'E']);
    const [downloaded, setDownloaded] = useState([]);
    const handleChange = (evt) => { 
            setSearchTerm(evt.target.value);
    };
    const handleShift = () => {console.log(prevDownloads.current);
        const arr = [...prevSongs.current]; 
        let top;
        if(prevDownloads.current.length){
            let d = [...prevDownloads.current];
            top = d.pop();
            setDownloaded([...d]);
            arr.shift();
            arr.push(top);
        } else {top =  arr.shift(); arr.push(top);}
        
       setSongs(songs=>[...arr]);
      
    };
    const prevSongs = useRef();
    useEffect(() => {
      prevSongs.current = songs;
    }, [songs]);
    const prevDownloads = useRef();
    useEffect(() => {
        prevDownloads.current = downloaded;
    }, [downloaded]);
   
    useEffect(() => {
        setInterval(() => {
            handleShift(); 
        }, 1000);
    }, []);
    useEffect(async () => {
       if(searchTerm)
       {const response = await axios.get(`http://itunes.apple.com/search?term=${searchTerm}`); 
       setDownloaded(response.data.results.filter((item, i)=>i<5).map(item=> {return item.collectionName}));}
    }, [searchTerm]);
    return (
        <div className="container">
            
            <div className="d-flex flex-column " style={{margin: '25%'}}>
            <DebounceInput name="x1" type="text" className="form-control" value={searchTerm} onChange={handleChange}
            minLength={1}
            debounceTimeout={1000} />
            {songs.map((song,i)=><button key={i} className="btn btn-success mt-3" >{song}</button>)}
            </div>
    
        </div>
    )
}

export default Scenario;
