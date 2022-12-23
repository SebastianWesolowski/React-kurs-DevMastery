import React from "react";
import {Button} from "../../components/atoms/Button/Button";

export class TimeBoxCreator extends React.Component {
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
