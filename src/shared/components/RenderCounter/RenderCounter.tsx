

// let renderCount = 0;
// renderCount++;
// <RenderCount renderCount={renderCount} />
const RenderCount = ({ renderCount }: { renderCount: number }) => (
    <>
        <span style={{
            fontWeight: "400",
            background: "white",
            color: "black",
            padding: "10px 15px",
            borderRadius: "4px",
            position: "fixed",
            top: "20px",
            right: '200px',
            zIndex: '9999999',
            border: "1px solid rgb(79, 98, 148)",
            boxShadow: "0 0 4px rgb(79, 98, 148)"
        }}>Render Count: {renderCount}</span>
    </>
);


export default RenderCount;