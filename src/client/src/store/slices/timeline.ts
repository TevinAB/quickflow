import type {
  TimelineData,
  TimelineItemSubmitData,
  HttpRequestMetaData,
  ApiError,
  RequestError,
} from './../../types/index';
import { RootState } from '..';
import { getRequestErrorData } from '../../utils';
import { addTimelineItem } from '../../services/timelines';
import {
  createSlice,
  createAsyncThunk,
  AsyncThunkPayloadCreator,
} from '@reduxjs/toolkit';
import { newTimelineState } from '../../utils/document';

const addTimelineItemPayloadCreator: AsyncThunkPayloadCreator<
  TimelineData,
  {
    itemData: TimelineItemSubmitData;
    meta: HttpRequestMetaData;
    token: string;
  },
  {
    state: RootState;
    rejectValue: ApiError;
  }
> = async (args, { getState, rejectWithValue }) => {
  try {
    const { itemData, meta, token } = args;
    const currentTimelineId = getState().timeline._id;

    const response = await addTimelineItem(
      currentTimelineId,
      itemData,
      meta,
      token
    );

    return response.data.timeline;
  } catch (error) {
    const { message } = getRequestErrorData(error as RequestError);

    return rejectWithValue({ message });
  }
};

export const addTimelineItemThunk = createAsyncThunk<
  TimelineData,
  {
    itemData: TimelineItemSubmitData;
    meta: HttpRequestMetaData;
    token: string;
  },
  { state: RootState; rejectValue: ApiError }
>('timeline/addTimelineItem', addTimelineItemPayloadCreator);

const timelineSlice = createSlice({
  name: 'timeline',
  initialState: newTimelineState(),
  reducers: {
    setTimeline(_, action: { payload: { timeline: TimelineData } }) {
      return { ...action.payload.timeline };
    },
    clearTimelineState() {
      return newTimelineState();
    },
  },
  extraReducers: (builder) => {
    //only handling success as a rejection will be handled where used
    builder.addCase(addTimelineItemThunk.fulfilled, (_, action) => {
      return { ...action.payload };
    });
  },
});

export const timelineReducer = timelineSlice.reducer;
export const { setTimeline, clearTimelineState } = timelineSlice.actions;
