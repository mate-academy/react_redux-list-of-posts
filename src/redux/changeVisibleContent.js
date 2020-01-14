const ACTION_TYPE_CHANGE_CONTENT = 'CHANGE_CONTENT';

export const changeContent = () => ({
  type: ACTION_TYPE_CHANGE_CONTENT,
});

const changeVisibleContent = (visibleContent = false, action) => {
  switch (action.type) {
    case ACTION_TYPE_CHANGE_CONTENT:
      return true;

    default:
      return visibleContent;
  }
};

export default changeVisibleContent;
