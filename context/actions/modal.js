export const registerComponent = (component) => ({
  payload: {
    modalComponent: component,
    isModalOpen: true,
  },
  type: "REGISTER_COMPONENT",
});

export const unregisterComponent = () => ({
  type: "UNREGISTER_COMPONENT",
  payload: {
    modalComponent: null,
    isModalOpen: false,
  },
});
