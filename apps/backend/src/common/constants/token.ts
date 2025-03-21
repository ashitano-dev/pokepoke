import { TimeSpan } from "../utils";

export const FRIEND_INVITE_TOKEN_EXPIRES_SPAN = 5 as const;

export const friendInviteTokenExpiresSpan = new TimeSpan(FRIEND_INVITE_TOKEN_EXPIRES_SPAN, "d");
