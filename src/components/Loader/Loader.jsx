import React from 'react';
import { PulseLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className='flex justify-center items-center h-50'>
        <PulseLoader color='#FF3938'></PulseLoader>
        </div>
    );
};

export default Loader;