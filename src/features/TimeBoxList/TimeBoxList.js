import React from "react";
import * as uuid from "uuid";
import {TimeBoxCreator} from "../TimeBoxCreator/TimeBoxCreator";
import {TimeBox} from "../TimeBox/TimeBox";

export class TimeBoxList extends React.Component {
    state = {
        timeboxes: [
            {id: uuid.v4(), title: "Uczę się list", totalTimeInMinutes: 25},
            {
                id: uuid.v4(),
                title: "Uczę się formularzy",
                totalTimeInMinutes: 15
            },
            {
                id: uuid.v4(),
                title: "Uczę się komponentów niekontrolowanych",
                totalTimeInMinutes: 5
            }
        ]
    };

    addTimebox = (newTimebox) => {
        this.setState((prevState) => {
            const expandTinderboxes = [...prevState.timeboxes, newTimebox];
            return {
                timeboxes: expandTinderboxes
            };
        });
    };

    removeTimebox = (indexToRemove) => {
        this.setState((prevState) => {
            const newTimeboxArray = prevState.timeboxes.filter((timebox) => {
                return timebox.id !== indexToRemove;
            });
            return {
                timeboxes: newTimeboxArray
            };
        });
    };

    editTimebox = (indexToEdit, contentToUpdate) => {
        this.setState((prevState) => {
            const expandTinderboxes = prevState.timeboxes.map((oneTimebox) => {
                return oneTimebox.id === indexToEdit
                    ? {
                        id: uuid.v4(),
                        ...contentToUpdate,
                        timestamp: Date.now()
                    }
                    : oneTimebox;
            });
            return {
                timeboxes: expandTinderboxes,
                isUpdate: true
            };
        });
    };

    handleCreate = (newTimeBox) => {
        this.addTimebox({...newTimeBox, id: uuid.v4()});
    };

    render() {
        const {timeboxes} = this.state;
        return (
            <div>
                <TimeBoxCreator
                    onSubmit={this.handleCreate}
                    buttonText="Dodaj TimeBox"
                />
                {timeboxes.map((timebox) => {
                    return (
                        <TimeBox
                            key={timebox.id}
                            timeboxDetails={timebox}
                            onDelete={this.removeTimebox}
                            onUpdate={this.editTimebox}
                        />
                    );
                })}
            </div>
        );
    }
}
