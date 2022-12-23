import React from "react";
import {InactiveComponent} from "../InactiveComponent/InactiveComponent";

export const ProgressBar = ({procent, trackRemaining = false, isPaused}) => {
    return (
        <InactiveComponent show={isPaused}>
            <div
                className={`border-solid border-red-500 border-2 rounded-md p-1 mb-3 h-8 flex row-end ${
                    trackRemaining ? "flex-row-reverse" : ""
                }`}
            >
                <div
                    style={{width: `${procent}%`}}
                    className="h-full bg-red-500 "
                ></div>
            </div>
        </InactiveComponent>
    );
};
