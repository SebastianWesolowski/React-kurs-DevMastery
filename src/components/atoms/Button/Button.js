import React from "react";

export const Button = ({disabled = false, children, ...props}) => {
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
