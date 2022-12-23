import React from "react";
import {Button} from "../../components/atoms/Button/Button";
import {TimeBoxCreator} from "../TimeBoxCreator/TimeBoxCreator";

export class TimeBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeboxDetails: props.timeboxDetails,
            onDelete: props.onDelete,
            isEditable: false
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(timeboxDetails) {

        this.props.onUpdate(this.props.timeboxDetails.id, timeboxDetails);
        this.setState({
            isEditable: false
        });
    }

    handleEdit() {
        this.setState({isEditable: true});
    }

    render() {
        const {timeboxDetails, onDelete, isEditable} = this.state;
        const {id, title, totalTimeInMinutes} = this.state.timeboxDetails;

        if (isEditable) {
            return (
                <TimeBoxCreator
                    contentDetails={timeboxDetails}
                    onSubmit={this.handleUpdate}
                    buttonText="Zapisz"
                />
            );
        }
        return (
            <>
                <h3 className={"border-2 border-gray-800 my-2 rounded-md p-1 bg-blue-100"}>
                    {title} - {totalTimeInMinutes} min.
                </h3>
                <Button
                    onClick={() => {
                        onDelete(id);
                    }}
                >
                    Usuń
                </Button>
                <Button
                    onClick={() => {
                        this.handleEdit();
                    }}
                >
                    Zmień
                </Button>
            </>
        );
    }
}
