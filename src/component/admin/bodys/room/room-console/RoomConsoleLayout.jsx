import RoomSchedule from "../room-schedule/RoomSchedule";
import RoomDisplay from "./RoomDisplay";
import SearchTool from "./SearchTool";

const RoomConsole = () => {
    return (
        <div className="vstack gap-3 overflow-auto">
            <SearchTool />
            <RoomDisplay />
            {/* <RoomSchedule /> */}
        </div>
    )
};

export default RoomConsole;