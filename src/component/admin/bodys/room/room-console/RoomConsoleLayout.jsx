import RoomDisplay from "./RoomDisplay";
import SearchTool from "./SearchTool";

const RoomConsole = () => {
    return (
        <div className="vstack gap-3 overflow-auto">
            <SearchTool />
            <RoomDisplay />
        </div>
    )
};

export default RoomConsole;