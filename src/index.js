import React from 'react';
import ReactDOM from 'react-dom/client';
import {prepareTimeText} from './utils/prepareTime.js';
import * as uuid from "uuid";


const InactiveComponent = ({show = false, children}) => {
    return (
        <div className={`${show ? "blur-sm grayscale" : ""}`}>{children}</div>
    );
};
const Clock = ({time, isPaused}) => {
    const timeText = prepareTimeText(time);

    return (
        <InactiveComponent show={isPaused}>
            <h2 className="text-lg font-bold text-center text-red-500 m-2">
                Pozostało {timeText}
            </h2>

        </InactiveComponent>
    );
};
const ProgressBar = ({procent, trackRemaining = false, isPaused}) => {
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
const Button = ({disabled = false, children, ...props}) => {
    return (
        <button
            {...props}
            disabled={disabled}
            className={`rounded-full py-2 mx-1 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 ${
                disabled
                    ? "bg-gray-600"
                    : "bg-blue-600  hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600"
            } text-white`}
        >
            {children}
        </button>
    );
};
const TimeBoxEditor = (props) => {
    const {
        title,
        totalTimeInMinutes,
        onTitleChange,
        onTotalTimeChange,
        onConfirm,
        isEditable
    } = props;
    return (
        <InactiveComponent show={!isEditable}>
            <div className="text-right border-solid border-gray-800 border-2 rounded-md p-3 mb-3 bg-green-100">
                <label>
                    Co robisz?
                    <input
                        value={title}
                        className="border-solid border-gray-800 border-2"
                        onChange={onTitleChange}
                        type="text"
                    />
                </label>
                <br/>
                <label>
                    Ile minut?{" "}
                    <input
                        className="border-solid border-gray-800 border-2"
                        value={totalTimeInMinutes}
                        onChange={onTotalTimeChange}
                        type="number"
                    />
                </label>
                <br/>
                <Button
                    onClick={() => {
                        onConfirm();
                    }}
                >
                    Zatwierdź zmiany
                </Button>
            </div>
        </InactiveComponent>
    );
};

class TimeBoxCreator extends React.Component {
    constructor(props) {
        super(props);
        this.formRef = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            title: this.formRef.current.querySelector("input[name='title']")
                .value,
            totalTimeInMinutes: parseInt(
                this.formRef.current.querySelector(
                    "input[name='totalTimeInMinutes']"
                ).value,
                10
            )
        };
        this.props.onSubmit(formData);
        this.formRef.current.querySelector("input[name='title']").value = "";
        this.formRef.current.querySelector(
            "input[name='totalTimeInMinutes']"
        ).value = "";
    };

    render() {
        return (
            <form
                onSubmit={(event) => {
                    this.handleSubmit(event);
                }}
                className="text-right border-solid border-gray-800 border-2 rounded-md p-3 mb-3 bg-red-100"
                ref={this.formRef}
            >
                <label>
                    Co robisz?
                    <input
                        className="border-solid border-gray-800 border-2"
                        type="text"
                        name="title"
                    />
                </label>
                <br/>
                <label>
                    Ile minut?{" "}
                    <input
                        className="border-solid border-gray-800 border-2"
                        type="number"
                        name="totalTimeInMinutes"
                    />
                </label>
                <br/>
                <Button>{this.props.buttonText}</Button>
            </form>
        );

        // this.formRef.current.querySelector("input[name='title']").value = 'b'
        // this.formRef.current.querySelector("input[name='totalTimeInMinutes']").value = '1'
    }
}

class CurrentTimeBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRunning: false,
            isPaused: false,
            pausedCount: 0,
            elapsedTimeInSeconds: 0
        };

        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.togglePause = this.togglePause.bind(this);
    }

    startTimer() {
        this.intervalId = window.setInterval(() => {
            this.setState((prevState) => ({
                elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 0.1
            }));
        }, 100);
    }

    stopTimer() {
        clearInterval(this.intervalId);
    }

    handleStart = () => {
        this.setState({
            isRunning: true
        });
        this.startTimer();
    };

    handleStop = () => {
        this.setState({
            isRunning: false,
            isPaused: false,
            pausedCount: 0,
            elapsedTimeInSeconds: 0
        });
        this.stopTimer();
    };

    togglePause() {
        this.setState((prevState) => {
            const isPaused = !prevState.isPaused;
            if (isPaused) {
                this.stopTimer();
            } else {
                this.startTimer();
            }
            return {
                isPaused,
                pausedCount: isPaused
                    ? prevState.pausedCount + 1
                    : prevState.pausedCount
            };
        });
    }

    render() {
        const {title, totalTimeInMinutes, isEditable, onEdit} = this.props;
        const {
            pausedCount,
            isRunning,
            isPaused,
            elapsedTimeInSeconds
        } = this.state;
        const totalTimInSeconds = totalTimeInMinutes * 60;
        const timeLeftInSeconds = totalTimInSeconds - elapsedTimeInSeconds;
        const minuteLeft = Math.floor(timeLeftInSeconds / 60);
        const secondsLeft = Math.floor(timeLeftInSeconds % 60);
        const progressInPercent = Math.floor(
            (elapsedTimeInSeconds / totalTimInSeconds) * 100
        );
        return (
            <InactiveComponent show={isEditable}>
                <div className="border-solid border-gray-800 border-2 rounded-md p-3 mb-3 bg-yellow-100">
                    <h2 className="text-2xl font-bold text-center">{title}</h2>
                    <Clock
                        time={`00:${minuteLeft}:${secondsLeft}.0`}
                        isPaused={isPaused}
                    />
                    <ProgressBar procent={progressInPercent} isPaused={isPaused}/>
                    <Button disabled={isEditable} onClick={onEdit}>
                        Edytuj
                    </Button>
                    <Button disabled={isRunning} onClick={this.handleStart}>
                        Start
                    </Button>
                    <Button disabled={!isRunning} onClick={this.handleStop}>
                        Stop
                    </Button>
                    <Button disabled={!isRunning} onClick={this.togglePause}>
                        {isPaused ? "Wznów" : "Pauzuj"}
                    </Button>
                    Liczba przerw: {pausedCount}
                </div>
            </InactiveComponent>
        );
    }
}

class EditableTimeBox extends React.Component {
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

class TimeBox extends React.Component {
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

class TimeboxList extends React.Component {
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

const App = () => {
    return (
        <div className="app">
            <TimeboxList/>
            <EditableTimeBox/>
        </div>
    );
};

// const time = "10:30:00.023"

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
const app = <App/>;
root.render(app);
