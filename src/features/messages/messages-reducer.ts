import { v1 } from 'uuid';

import devChat from '@/assets/images/chat.png';
import badman from '@/assets/images/localUsers/bad-man.jpg';
import heisenberg from '@/assets/images/localUsers/heisenberg.jpg';
import meladze from '@/assets/images/localUsers/meladze.jpg';
import shelby from '@/assets/images/localUsers/shelby.jpg';
import { userLoggedOut } from '@/features/auth/auth-reducer.ts';
import { getCurrentData } from '@/common/utils/getCurrentData.ts';

// _____ types

export type MessagesActionsType = ReturnType<typeof setDevChatMessages> | ReturnType<typeof addMessageAC>;

type HandlingActions = MessagesActionsType | ReturnType<typeof userLoggedOut>;

export type MessageType = {
  id: string;
  message: string;
  userId: string;
  userName: string;
  photo: string | null;
  time: string;
  date: string;
};

export type AddMessageData = {
  message: string;
  toUser: string;
} & Pick<MessageType, 'userId' | 'userName' | 'photo'>;

export type WebSocketMessage = Omit<AddMessageData, 'toUser'>;

export type MessagesDataType = {
  [key: string]: MessageType[];
};

export type DialogType = {
  id: string;
  name: string;
  photo: string | null;
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
      photo: devChat,
    },
    {
      id: 'local_meladze',
      name: 'В. Меладзе',
      photo: meladze,
    },
    {
      id: 'local_the-badman',
      name: 'The Badman',
      photo: badman,
    },
    {
      id: 'local_heisenberg',
      name: 'Heisenberg',
      photo: heisenberg,
    },
    {
      id: 'local_user-987454',
      name: 'user 987454',
      photo: null,
    },
    {
      id: 'local_t-shelby',
      name: 'T. Shelby',
      photo: shelby,
    },
  ],
  messagesData: {
    dev_chat: [],
    local_meladze: [
      {
        id: v1(),
        message: 'Но я тысячу раз обрывал провода',
        userId: 'local_meladze',
        userName: 'В. Меладзе',
        photo: meladze,
        time: '20:53',
        date: '15 Jun 2023',
      },
      {
        id: v1(),
        message: 'Сам себе кричал: «Ухожу навсегда»',
        userId: 'local_meladze',
        userName: 'В. Меладзе',
        photo: meladze,
        time: '20:53',
        date: '15 Jun 2023',
      },
      {
        id: v1(),
        message: 'Непонятно, как доживал до утра',
        userId: 'local_meladze',
        userName: 'В. Меладзе',
        photo: meladze,
        time: '20:54',
        date: '15 Jun 2023',
      },
      {
        id: v1(),
        message: 'Салют...',
        userId: 'local_meladze',
        userName: 'В. Меладзе',
        photo: meladze,
        time: '20:54',
        date: '15 Jun 2023',
      },
    ],
    'local_the-badman': [
      {
        id: v1(),
        message: 'ХАРВИ ДЭНТ',
        userId: 'local_the-badman',
        userName: 'The Badman',
        photo: meladze,
        time: '20:53',
        date: '11 May 2023',
      },
      {
        id: v1(),
        message: 'Что?',
        userId: 'authUser',
        userName: 'authUser',
        photo: null,
        time: '20:53',
        date: '11 May 2023',
      },
      {
        id: v1(),
        message: 'Можем ли мы доверять ему?',
        userId: 'local_the-badman',
        userName: 'The Badman',
        photo: meladze,
        time: '20:54',
        date: '11 May 2023',
      },
    ],
    local_heisenberg: [
      {
        id: v1(),
        message: 'Say my name',
        userId: 'local_heisenberg',
        userName: 'Heisenberg',
        photo: heisenberg,
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
    case 'SET-DEV-CHAT-MESSAGES': {
      return {
        ...state,
        messagesData: {
          ...state.messagesData,
          dev_chat: [...state.messagesData.dev_chat, ...action.payload.messages],
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
  const { time, date } = getCurrentData();

  return {
    type: 'ADD-MESSAGE',
    payload: {
      ...args,
      time,
      date,
    },
  } as const;
};

export const setDevChatMessages = (messages: WebSocketMessage[]) => {
  const { time, date } = getCurrentData();
  const handledTime = messages.length === 1 ? time : '';

  const handledMessages = messages.map(el => ({
    ...el,
    userId: el.userId.toString(),
    id: v1(),
    time: handledTime,
    date,
  }));

  return {
    type: 'SET-DEV-CHAT-MESSAGES',
    payload: {
      messages: handledMessages,
    },
  } as const;
};
