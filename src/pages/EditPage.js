import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/Button';

const clickToDelete = () => {
    
}

const clickToUpdate = () => {
    
}

const editPage = (prop) =>{
    return (
        <div>
            <div>
                <div>User Name</div>
                <div> {prop.userData.email}</div>
            </div>
            <div>
                <div>Name</div>
                <div> {prop.userData.fname} {prop.userData.lname}</div>
            </div>
            <div>
                <div>Phone</div>
                <div></div>
            </div>
            <div>
                <div>City</div>
                <div></div>
            </div>
            <div>
                <Button className="update-btn" color="gray" onClick={clickToUpdate}>
                    Update
                </Button>
                <Button className="delete-btn" color="gray" onClick={clickToDelete}>
                    Delete
                </Button>
            </div>
        </div>
    )
};

export default editPage;