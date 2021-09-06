import React from 'react'
import ToCreateGroup from './ToCreateGroup/ToCreateGroup';
import GroupRequest from './GroupRequet/GroupRequest';
import JoinGroup from './JoinGroup/JoinGroup';

const AddGroup = () => {

    return (
        <section className="Groupsconfig">
            <JoinGroup />
            <ToCreateGroup />
            <GroupRequest />
        </section>
    )
}

export default AddGroup
