import { describe, expect, it, beforeEach } from 'vitest';

import { addMessageAC, MessagesReducer, MessagesPageType } from './messages-reducer.ts';

let initialState: MessagesPageType;

beforeEach(() => {
  initialState = {
    dialogsData: [
      {
        id: 'local_meladze',
        name: 'В. Меладзе',
        photo: null,
      },
      {
        id: 'local_the-badman',
        name: 'The Badman',
        photo: null,
      },
    ],
    messagesData: {
      local_meladze: [],
      'local_the-badman': [],
    },
  };
});

describe('Messages Reducer', function () {
  it('should add a new message to the messages data', () => {
    const message = 'message text';
    const authUser = 'auth_user';
    const toUser = 'local_meladze';
    const userName = 'В. Меладзе';
    const photo = null;

    const action = addMessageAC({ message, userId: authUser, userName, toUser, photo });
    const newState = MessagesReducer(initialState, action);

    expect(newState.messagesData[toUser]).toHaveLength(1);
    expect(newState.messagesData[toUser][0].id).toBe(toUser);
    expect(newState.messagesData[toUser][0].userName).toBe(authUser);
    expect(newState.messagesData[toUser][0].photo).toBe(photo);
    expect(newState.dialogsData).toEqual(initialState.dialogsData);
  });
});
