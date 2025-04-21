import { memo } from "react";

const StagesListComponent = ({ list, addTodo }: { list: any, addTodo: any }) => {
    console.log("child render");
    return (
        <>
            <h2>My StagesListComponent</h2>
            {list.map((todo: any, index: number) => {
                return <p key={index}>{todo}</p>;
            })}
            <button onClick={addTodo}>Add Todo</button>
        </>
    );
};

export default memo(StagesListComponent);

