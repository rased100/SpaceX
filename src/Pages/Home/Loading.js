import React from 'react';

const Loading = () => {
    return (
        <div>
            <div className="spinner-grow text-danger m-3" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-warning m-3" role="status">
                <span className="sr-only">Loading...</span>
            </div>
            <div className="spinner-grow text-success m-3" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Loading;