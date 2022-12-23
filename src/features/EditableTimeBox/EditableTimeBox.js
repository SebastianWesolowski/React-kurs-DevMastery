import React from "react";
import {TimeBoxEditor} from "../../components/molecules/TimeBoxEditor/TimeBoxEditor";
import {CurrentTimeBox} from "../../components/molecules/CurrentTimeBox/CurrentTimeBox";
export class EditableTimeBox extends React.Component {
    state = {
        title: "Uczę się o komponentach kontrolowanych",
        totalTimeInMinutes: 25,
        isEditable: true
    };

    handleTitleChange = (event) => {
        this.setState({title: event.target.value});
    };

    handleTotalTimeChange = (event) => {
        this.setState({totalTimeInMinutes: event.target.value});
    };

    handleConfirm = () => {
        this.setState({isEditable: false});
    };

    handleEdit = () => {
        this.setState({isEditable: true});
    };

    render() {
        const {title, totalTimeInMinutes, isEditable} = this.state;
        return (
            <>
                <TimeBoxEditor
                    onTitleChange={this.handleTitleChange}
                    onTotalTimeChange={this.handleTotalTimeChange}
                    title={title}
                    isEditable={isEditable}
                    onConfirm={this.handleConfirm}
                    totalTimeInMinutes={totalTimeInMinutes}
                />
                <CurrentTimeBox
                    title={title}
                    totalTimeInMinutes={totalTimeInMinutes}
                    isEditable={isEditable}
                    onEdit={this.handleEdit}
                />
            </>
        );
    }
}
