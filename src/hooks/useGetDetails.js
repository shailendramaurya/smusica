import { useEffect, useState } from "react";
import {GetDetails} from '../requests';

function imageQuality(url){
 return url.replace('150x150','500x500').replace('50x50','500x500')
}

function useGetDetails(id,type) {
    const [loading, setloading] = useState(true);
    const [data, setdata] = useState([]);

    useEffect(() => {
        
        async function getdata(){
            const d=await GetDetails(id,type);
            sessionStorage.setItem(id,JSON.stringify(d.data));
            console.log(d.data);
            setdata(d.data);
            setloading(false);
        }

        if(sessionStorage.getItem(id))
        {
            setloading(false);
            setdata(JSON.parse(sessionStorage.getItem(id)));
            
        }
        else
        {
            getdata();
        }

        return () => {
            
        }
    }, [])
    
    
    return {loading,data}
}

export default useGetDetails;
