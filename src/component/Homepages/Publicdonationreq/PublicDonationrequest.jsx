import React, { useEffect, useState } from 'react';
import Useaxios from '../../../Hooks/Useaxios';

const PublicDonationrequest = () => {
    const axios =Useaxios();
    const [requestData,setRequestData] =useState([])

    useEffect(()=>{

    const RequestData =async() =>{
        const response = await axios.get('/blood-request')
        console.log("alldarta",response.data);
        setRequestData(response.data)
    }
    RequestData();
    },[axios])

    return (
        <div>
            <div>
                <h1 className='text-6xl text-center'>All Donation Request {requestData.length}</h1>
            </div>

            {/* // Donation card section  */}

            <div>

            </div>
        </div>
    );
};

export default PublicDonationrequest;