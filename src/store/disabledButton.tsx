import { AnyAction } from 'redux';

const DISABLE_BUTTON = 'DISABLED_BUTTON';
const ACTIVE_BUTTON = 'ACTIVE_BUTTON';


export const disabledButton = () => ({ type: DISABLE_BUTTON });
export const activeButton = () => ({ type: ACTIVE_BUTTON });


const reducer = (isButtonDisabled = false, action: AnyAction) => {
  switch (action.type) {
    case DISABLE_BUTTON:
      return true;

    case ACTIVE_BUTTON:
      return false;

    default:
      return isButtonDisabled;
  }
};

export default reducer;
