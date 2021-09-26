import { useQuery } from "react-query";

import AddBoard from "../components/board-actions/add-board";
import BoardTemplate from "../components/board-template";

import { useModal } from "../context/modal";
import { useUser } from "../hooks/auth-hook";
import request from "../helpers/request";
import { queryKeyGenerator } from "../helpers/query-key-generator";

export default function Home() {
  const { open } = useModal();

  const { user } = useUser();
  const { data: count } = useQuery(queryKeyGenerator().board_count, () =>
    request.get(
      `/boards/count?_where[1][members.username_contains]=${user?.username}`
    )
  );
  const { data: publicCount } = useQuery(
    queryKeyGenerator().public_board_count,
    () => request.get("/boards/count?_where[0][is_private]=false")
  );

  return (
    <section className="w-11/12 max-w-[1024px] mx-auto mt-8 mb-5">
      <h1 className="text-lg">All Boards</h1>
      <button
        className="px-5 py-1.5 bg-blueish-250 rounded text-xs text-misc-white ml-auto block"
        onClick={() => open(<AddBoard />)}
      >
        Add
      </button>
      <BoardTemplate
        count={count?.data}
        dataQueryKey={`boards_${user?.id}`}
        queryUrl={`/boards?_where[1][members.username_contains]=${user?.username}&_limit=8`}
        text="Your Boards"
      />
      <BoardTemplate
        count={publicCount?.data}
        dataQueryKey={`public-boards_${user?.id}`}
        queryUrl={`/boards?_where[0][is_private]=false&_limit=8`}
        text="Public Boards"
      />
    </section>
  );
}
