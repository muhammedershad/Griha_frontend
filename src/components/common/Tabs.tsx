import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarCheck,
    faClock,
    faCalendarTimes,
    faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
    activeItem: string | null;
    setActiveItem: (item: string | null) => void;
}

const Tabs = ({ activeItem, setActiveItem }: Props) => {
    // const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (itemName: string) => {
        setActiveItem(itemName === activeItem ? null : itemName);
    };

    const getItemStyle = (itemName: string) => {
        return activeItem === itemName
            ? "bg-white text-gray-800 dark:bg-gray-800 dark:text-white"
            : "hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group";
    };

    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li className="me-2">
                    <a
                        className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg ${getItemStyle(
                            "Scheduled"
                        )}`}
                        onClick={() => handleItemClick("Scheduled")}
                    >
                        <FontAwesomeIcon
                            className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                            icon={faCalendarCheck}
                            aria-hidden="true"
                        />
                        Scheduled
                    </a>
                </li>
                <li className="me-2">
                    <a
                        className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg ${getItemStyle(
                            "TimeSlot"
                        )}`}
                        onClick={() => handleItemClick("TimeSlot")}
                    >
                        <FontAwesomeIcon
                            className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                            icon={faClock}
                            aria-hidden="true"
                        />
                        Time Slot
                    </a>
                </li>
                <li className="me-2">
                    <a
                        className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg ${getItemStyle(
                            "MeetingCancelled"
                        )}`}
                        onClick={() => handleItemClick("MeetingCancelled")}
                    >
                        <FontAwesomeIcon
                            className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                            icon={faCalendarTimes}
                            aria-hidden="true"
                        />
                        Meeting Cancelled
                    </a>
                </li>
                <li className="me-2">
                    <a
                        href="#"
                        className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg ${getItemStyle(
                            "Completed"
                        )}`}
                        onClick={() => handleItemClick("Completed")}
                    >
                        <FontAwesomeIcon
                            className="w-4 h-4 me-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                            icon={faCheckCircle}
                            aria-hidden="true"
                        />
                        Completed
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Tabs;
