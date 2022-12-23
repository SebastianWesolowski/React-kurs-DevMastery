export const InactiveComponent = ({show = false, children}) => {
    return (
        <div className={`${show ? "blur-sm grayscale" : ""}`}>{children}</div>
    );
};
