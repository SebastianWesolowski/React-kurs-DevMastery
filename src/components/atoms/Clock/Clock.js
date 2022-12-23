import {prepareTimeText} from "../../../utils/prepareTime";
import React from "react";
import {InactiveComponent} from "../InactiveComponent/InactiveComponent";

export const Clock = ({time, isPaused}) => {
    const timeText = prepareTimeText(time);

    return (
        <InactiveComponent show={isPaused}>
            <h2 className="text-lg font-bold text-center text-red-500 m-2">
                Pozostało {timeText}
            </h2>

        </InactiveComponent>
    );
};
