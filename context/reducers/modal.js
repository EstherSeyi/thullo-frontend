const modalReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case "REGISTER_COMPONENT":
      return {
        ...state,
        modalComponent: payload.modalComponent,
        isModalOpen: payload.isModalOpen,
      };
    case "UNREGISTER_COMPONENT":
      return {
        ...state,
        modalComponent: null,
        isModalOpen: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default modalReducer;
