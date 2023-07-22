import {MessagesActionsType} from "@/features/messages/messages-reducer.ts";
import {ProfileActionsType} from "@/features/profile/profile-reducer.ts";
import {ServiceActionsType} from "@/features/service/service-reducer.ts";
import {UsersActionsType} from "@/features/users/users-reducer.ts";
import {AuthActionsType} from "@/features/auth/auth-reducer.ts";

export type ActionsTypes =
   | MessagesActionsType
   | ServiceActionsType
   | ProfileActionsType
   | UsersActionsType
   | AuthActionsType