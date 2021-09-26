export const queryKeyGenerator = (extension) => {
  return {
    users: "all_users",
    user_boards: `boards_${extension}`,
    board_count: "board_count",
    public_board_count: "board_count",
    board_lists: `lists_${extension}`,
    card_list: `card-list_${extension}`,
  };
};
