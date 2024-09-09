import client from "../client";
import { protectedResolver } from "../users/users.utils";
import { Resolver, Resolvers } from "../types";
import { User } from "@prisma/client"; // Prisma의 User 타입 사용

// 로그인 여부를 확인하는 헬퍼 함수
const checkLoggedInUser = (loggedInUser: User | null) => {
  return !!loggedInUser;
};

// 단일 리졸버 함수 정의
const usersResolver: Resolver = ({ id }) => {
  return client.user.findMany({
    where: {
      group: {
        some: {
          id,
        },
      },
    },
  });
};

const userCountResolver: Resolver = ({ id }) => {
  return client.user.count({
    where: {
      group: {
        some: {
          id,
        },
      },
    },
  });
};

const facilityResolver: Resolver = ({ id }) => {
  return client.facility.findMany({
    where: {
      group: {
        some: {
          id,
        },
      },
    },
  });
};

const groupInfoResolver: Resolver = ({ id }) => {
  return client.groupInfo.findMany({
    where: {
      group: {
        some: {
          id,
        },
      },
    },
  });
};

const groupTagResolver: Resolver = ({ id }) => {
  return client.groupTag.findMany({
    where: {
      group: {
        some: {
          id,
        },
      },
    },
  });
};

const groupImageResolver: Resolver = ({ id }) => {
  return client.groupImage.findFirst({
    where: {
      group: {
        some: {
          id,
        },
      },
    },
  });
};

const groupPresidentResolver: Resolver = ({ id }) => {
  return client.groupPresident.findFirst({
    where: {
      group: {
        some: {
          id,
        },
      },
    },
    include: {
      user: true,
    },
  });
};

const isPresidentResolver: Resolver = async ({ id }, _, { loggedInUser }: { loggedInUser: User | null }) => {
  if (!checkLoggedInUser(loggedInUser)) {
    return false;
  }
  const president = await client.groupPresident.findFirst({
    where: {
      group: {
        some: {
          id,
        },
      },
      userId: loggedInUser.id,
    },
    select: {
      userId: true,
    },
  });
  return !!president;
};

const isJoinResolver: Resolver = async ({ id }, _, { loggedInUser }: { loggedInUser: User | null }) => {
  if (!checkLoggedInUser(loggedInUser)) {
    return false;
  }
  const user = await client.user.findFirst({
    where: {
      id: loggedInUser.id,
      group: {
        some: {
          id,
        },
      },
    },
    select: {
      id: true,
    },
  });
  return !!user;
};

const isJoiningResolver: Resolver = async ({ id }, _, { loggedInUser }: { loggedInUser: User | null }) => {
  if (!checkLoggedInUser(loggedInUser)) {
    return false;
  }
  const joinRequest = await client.groupJoinRequest.findUnique({
    where: {
      userId_groupId: {
        userId: loggedInUser.id,
        groupId: id,
      },
    },
    select: {
      id: true,
    },
  });
  return !!joinRequest;
};

// 리졸버들을 포함하는 전체 구조
const resolvers: Resolvers = {
  Group: {
    users: usersResolver,
    userCount: userCountResolver,
    facility: facilityResolver,
    groupInfo: groupInfoResolver,
    groupTag: groupTagResolver,
    groupImage: groupImageResolver,
    groupPresident: groupPresidentResolver,
    isPresident: protectedResolver(isPresidentResolver),
    isJoin: protectedResolver(isJoinResolver),
    isJoining: protectedResolver(isJoiningResolver),
  },
};

export default resolvers;
