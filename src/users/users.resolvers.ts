import { User, Group, Tutor, BlockUser } from "@prisma/client";
import client from "../client";
import { Context } from "../types";

export default {
  User: {
    isMe: ({ id }: User, _: any, { loggedInUser }: Context): boolean => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    photos: ({ id }: User) => {
      return client.user
        .findUnique({
          where: {
            id,
          },
        })
        .photos();
    },
    board: ({ id }: User) => {
      return client.user
        .findUnique({
          where: {
            id,
          },
        })
        .board();
    },
    notice: ({ id }: User) => {
      return client.user
        .findUnique({
          where: {
            id,
          },
        })
        .notice();
    },
    groupCount: ({ id }: User): Promise<number> => {
      return client.group.count({
        where: {
          users: {
            some: {
              id,
            },
          },
        },
      });
    },
    tutorCount: ({ id }: User): Promise<number> => {
      return client.tutor.count({
        where: {
          user: {
            some: {
              id,
            },
          },
        },
      });
    },
    blockedBy: ({ id }: User): Promise<BlockUser[]> => {
      return client.blockUser.findMany({
        where: {
          userId: id,
        },
        include: {
          user: true,
          blockedBy: true,
        },
      });
    },
  },
};
