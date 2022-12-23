import {Button} from "../../atoms/Button/Button";
import {InactiveComponent} from "../../atoms/InactiveComponent/InactiveComponent";

export const TimeBoxEditor = (props) => {
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
