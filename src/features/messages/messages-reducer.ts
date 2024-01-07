import { v1 } from 'uuid';

import devChat from '@/assets/images/chat.png';
import badman from '@/assets/images/localUsers/bad-man.jpg';
import heisenberg from '@/assets/images/localUsers/heisenberg.jpg';
import meladze from '@/assets/images/localUsers/meladze.jpg';
import shelby from '@/assets/images/localUsers/shelby.jpg';
import { userLoggedOut } from '@/features/auth/auth-reducer.ts';

// _____ types

export type MessagesActionsType = ReturnType<typeof addMessageAC>;

type HandlingActions = MessagesActionsType | ReturnType<typeof userLoggedOut>;

export type MessageType = {
  id: string;
  message: string;
  userID: string;
  userName: string;
  avatar: string | null;
  time: string;
  date: string;
};

export type AddMessageData = {
  message: string;
  toUser: string;
} & Pick<MessageType, 'userID' | 'userName' | 'avatar'>;

export type MessagesDataType = {
  [key: string]: MessageType[];
};

export type DialogType = {
  id: string;
  name: string;
  avatar: string | null;
};

export type MessagesPageType = {
  dialogsData: DialogType[];
  messagesData: MessagesDataType;
};

// _____ reducer

const initState: MessagesPageType = {
  dialogsData: [
    {
      id: 'dev_chat',
      name: 'Dev Chat',
      avatar: devChat,
    },
    {
      id: 'local_meladze',
      name: 'В. Меладзе',
      avatar: meladze,
    },
    {
      id: 'local_the-badman',
      name: 'The Badman',
      avatar: badman,
    },
    {
      id: 'local_heisenberg',
      name: 'Heisenberg',
      avatar: heisenberg,
    },
    {
      id: 'local_user-987454',
      name: 'user 987454',
      avatar: null,
    },
    {
      id: 'local_t-shelby',
      name: 'T. Shelby',
      avatar: shelby,
    },
  ],
  messagesData: {
    dev_chat: [],
    local_meladze: [
      {
        id: v1(),
        message: 'Но я тысячу раз обрывал провода',
        userID: 'local_meladze',
        userName: 'В. Меладзе',
        avatar: meladze,
        time: '20:53',
        date: '15 Jun 2023',
      },
      {
        id: v1(),
        message: 'Сам себе кричал: «Ухожу навсегда»',
        userID: 'local_meladze',
        userName: 'В. Меладзе',
        avatar: meladze,
        time: '20:53',
        date: '15 Jun 2023',
      },
      {
        id: v1(),
        message: 'Непонятно, как доживал до утра',
        userID: 'local_meladze',
        userName: 'В. Меладзе',
        avatar: meladze,
        time: '20:54',
        date: '15 Jun 2023',
      },
      {
        id: v1(),
        message: 'Салют...',
        userID: 'local_meladze',
        userName: 'В. Меладзе',
        avatar: meladze,
        time: '20:54',
        date: '15 Jun 2023',
      },
    ],
    'local_the-badman': [
      {
        id: v1(),
        message: 'ХАРВИ ДЭНТ',
        userID: 'local_the-badman',
        userName: 'The Badman',
        avatar: meladze,
        time: '20:53',
        date: '11 May 2023',
      },
      {
        id: v1(),
        message: 'Что?',
        userID: 'authUser',
        userName: 'authUser',
        avatar: null,
        time: '20:53',
        date: '11 May 2023',
      },
      {
        id: v1(),
        message: 'Можем ли мы доверять ему?',
        userID: 'local_the-badman',
        userName: 'The Badman',
        avatar: meladze,
        time: '20:54',
        date: '11 May 2023',
      },
    ],
    local_heisenberg: [
      {
        id: v1(),
        message: 'Say my name',
        userID: 'local_heisenberg',
        userName: 'Heisenberg',
        avatar: heisenberg,
        time: '05:32',
        date: '17 Mar 2023',
      },
    ],
    'local_user-987454': [],
    'local_t-shelby': [],
  },
};

export const MessagesReducer = (
  state: MessagesPageType = initState,
  action: HandlingActions,
): MessagesPageType => {
  switch (action.type) {
    case 'ADD-MESSAGE': {
      const { toUser, ...rest } = action.payload;
      const newMessage: MessageType = {
        ...rest,
        id: v1(),
      };

      return {
        ...state,
        messagesData: {
          ...state.messagesData,
          [toUser]: [...state.messagesData[toUser], newMessage],
        },
      };
    }
    case 'USER-LOGGED-OUT':
      return initState;
    default:
      return state;
  }
};

// _____ actions

export const addMessageAC = (args: AddMessageData) => {
  const formatter = new Intl.DateTimeFormat('ru', {
    hour: 'numeric',
    minute: 'numeric',
  });
  const time = `${formatter.format(new Date())}`;

  const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const date = `${dateFormatter.format(new Date())}`;

  return {
    type: 'ADD-MESSAGE',
    payload: {
      ...args,
      time,
      date,
    },
  } as const;
};
