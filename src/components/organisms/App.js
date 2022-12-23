import React from "react";
import {TimeBoxList} from "../../features/TimeBoxList/TimeBoxList";
import {EditableTimeBox} from "../../features/EditableTimeBox/EditableTimeBox";

export const App = () => {
    return (
        <div className="app">
            <TimeBoxList/>
            {/*<EditableTimeBox/>*/}
        </div>
    );
};
