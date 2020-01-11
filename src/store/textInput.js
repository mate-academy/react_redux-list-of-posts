export const setTextInput = newSetText => ({
  type: 'CHANGE_TEXT',
  textInput: newSetText
});

const textInputReducer = (textInput = '', action) => {
  switch(action.type) {
    case 'CHANGE_TEXT':
      return  action.textInput;

    default:
      return textInput;
  }
};

export default textInputReducer;
