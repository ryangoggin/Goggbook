import React from 'react';
import { useHistory } from 'react-router-dom';
import './NotFoundPage.css';

function NotFoundPage() {
    const history = useHistory();

    const returnHome = async (e) => {
        e.preventDefault();
        history.push("/");
    }

    return (
        <>
            <div className='not-found-container'>
                <img className='not-found-image' src="https://goggbook-aws-2.s3.amazonaws.com/facebook-404.svg" alt="not found" />
                <h3 className="page-not-found">Page Not Found</h3>
                <div className='when-this-happens-container'>
                    <p className='when-this-happens-text'>
                        When this happens, it's usually because you went to a
                        page that doesn't exist. Please click the button below
                        to go back to Goggbook.
                    </p>
                </div>
                <button className="return-button" onClick={returnHome}>
                    <p className="return-text">
                        Return to Goggbook
                    </p>
                </button>
            </div>
        </>
    );
}

export default NotFoundPage;
