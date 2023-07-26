// _____ types

export type UsersActionsType =
   | ReturnType<typeof setFollowingInProgress>
   | ReturnType<typeof setTotalUsersCount>
   | ReturnType<typeof setCurrentPage>
   | ReturnType<typeof setUsers>
   | ReturnType<typeof unfollow>
   | ReturnType<typeof follow>

export type UserPhotosType = {
   small: string | null,
   large: string | null
}

export type UserType = {
   name: string,
   id: number,
   uniqueUrlName: string | null,
   photos: UserPhotosType,
   status: string,
   followed: boolean
}

export type UsersPageType = {
   users: UserType[],
   pageSize: number,
   totalUsersCount: number,
   currentPage: number,
   followingInProgress: number[]
}

// _____ reducer

const initialState: UsersPageType = {
   users: [],
   pageSize: 10,
   totalUsersCount: 0,
   currentPage: 1,
   followingInProgress: []
}

export const UsersReducer = (state: UsersPageType = initialState, action: UsersActionsType): UsersPageType => {
   switch (action.type) {
      case 'FOLLOW':
         return {
            ...state,
            users: state.users.map(user => user.id === action.payload.userID ? {...user, followed: true} : user)
         };
      case 'UNFOLLOW':
         return {
            ...state,
            users: state.users.map(user => user.id === action.payload.userID ? {...user, followed: false} : user)
         }
      case 'SET-USERS':
         return {
            ...state,
            users: action.payload.newUsers
         }
      case 'SET-TOTAL-USERS-COUNT':
         return {
            ...state,
            totalUsersCount: action.payload.newTotalCount
         }
      case 'SET-CURRENT-PAGE':
         return {
            ...state,
            currentPage: action.payload.currentPage
         }
      case 'SET-FOLLOWING-IN-PROGRESS': {
         return {
            ...state,
            followingInProgress: action.payload.inProgress
               ? [...state.followingInProgress, action.payload.userID]
               : state.followingInProgress.filter(el => el !== action.payload.userID)
         }
      }
      default:
         return state;
   }
}

// _____ actions

export const follow = (userID: number) => ({
   type: 'FOLLOW',
   payload: {
      userID
   }
} as const);

export const unfollow = (userID: number) => ({
   type: 'UNFOLLOW',
   payload: {
      userID
   }
} as const);

export const setUsers = (newUsers: UserType[]) => ({
   type: 'SET-USERS',
   payload: {
      newUsers
   }
} as const);

export const setCurrentPage = (currentPage: number) => ({
   type: 'SET-CURRENT-PAGE',
   payload: {
      currentPage
   }
} as const);

export const setTotalUsersCount = (newTotalCount: number) => ({
   type: 'SET-TOTAL-USERS-COUNT',
   payload: {
      newTotalCount
   }
} as const);

export const setFollowingInProgress = (userID: number, inProgress: boolean) => ({
   type: 'SET-FOLLOWING-IN-PROGRESS',
   payload: {
      userID,
      inProgress
   }
} as const);