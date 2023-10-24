import { Link } from "react-router-dom";
import { PlayIcon } from "../Icon/Icon";

function OutstandingItem({ data, type }) {
  return (
    <div className="flex p-2 group play-list-hover justify-between rounded-md cursor-pointer">
      <div className="flex align-items-center">
        <div className="w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] rounded-md overflow-hidden mr-[10px] relative shrink-0">
          <div className="absolute left-0 right-0 bottom-0 top-0 bg-slate-900 opacity-50 hidden group-hover:block"></div>
          <img
            className="w-[100%] h-[100%] object-cover"
            src={data.thumbnail}
            alt=""
          />
          <span className="inset-center hidden group-hover:block">
            <PlayIcon />
          </span>
        </div>
        <div>
          <span
            className="text-xs mb-[3px]"
            style={{ color: "var(--text-secondary)" }}
          >
            {type}
          </span>
          <h6
            className="text-sm mb-0 line-clamp-1"
            style={{ color: "var(--player-text)" }}
          >
            {data.title ?? data.name}
          </h6>
          <Link
            className="text-xs line-clamp-1 mt-[2px]"
            style={{ color: "var(--text-secondary)" }}
          >
            {data.artistsNames ?? data.totalFollow}
          </Link>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
}

export default OutstandingItem;
