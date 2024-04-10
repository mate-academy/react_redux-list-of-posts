/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState, AppThunk } from '../../app/store';
import { fetchCount } from './counterAPI';

export interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
};

// Наведена нижче функція називається thunk і дозволяє виконувати асинхронну логіку. Це
// можна відправити як звичайну дію: `dispatch(incrementAsync(10))`. Це
// викличе thunk з функцією `dispatch` як першим аргументом. асинхронний
//  потім можна виконати код і відправити інші дії. "Thunk" є
//  зазвичай використовується для виконання асинхронних запитів.
export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount: number) => {
    const value = await fetchCount(amount);

    // The value we return becomes the `fulfilled` action payload
    // Значення, яке ми повертаємо, стає корисним навантаженням дії "виконано".
    return value;
  },
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // Поле `reducers` дозволяє визначати редуктори та генерувати відповідні дії
  reducers: {
    increment: state => {
      // Redux Toolkit дозволяє нам писати "мутуючу" логіку в редукторах. Це
      // фактично не змінює стан, оскільки використовує бібліотеку Immer,
      // який виявляє зміни в "чорновому стані" та створює абсолютно новий
      // незмінний стан на основі цих змін
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    // Використовуйте тип PayloadAction, щоб оголосити вміст `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  // Поле `extraReducers` дозволяє зрізу обробляти дії, визначені в іншому місці,
  // включаючи дії, згенеровані createAsyncThunk або в інших фрагментах.
  extraReducers: builder => {
    builder
      .addCase(incrementAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, state => {
        state.status = 'failed';
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Наведена нижче функція називається селектором і дозволяє вибрати значення
// стану. Селектори також можна визначити вбудовано, де вони використовуються замість них
// у файлі фрагмента. Наприклад: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value;

// Ми також можемо писати thunks вручну, які можуть містити як синхронну, так і асинхронну логіку.
// Ось приклад умовної диспетчеризації дій на основі поточного стану.
export const incrementIfOdd = (amount: number): AppThunk => {
  return (dispatch, getState) => {
    const currentValue = selectCount(getState());

    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };
};

export default counterSlice.reducer;
