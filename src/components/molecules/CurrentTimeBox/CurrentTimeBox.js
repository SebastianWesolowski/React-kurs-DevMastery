import React from "react";
import {Button} from "../../atoms/Button/Button";
import {InactiveComponent} from "../../atoms/InactiveComponent/InactiveComponent";
import {Clock} from "../../atoms/Clock/Clock";
import {ProgressBar} from "../../atoms/ProgressBar/ProgressBar";

export class CurrentTimeBox extends React.Component {
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
