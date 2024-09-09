import { Resolvers, Resolver } from "../types";
import client from "../client";

const groupResolver: Resolver = ({ id }) => {
  return client.group.findMany({
    where: {
      tutor: {
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
      tutor: {
        some: {
          id,
        },
      },
    },
  });
};

const userResolver: Resolver = ({ id }) => {
  return client.user.findFirst({
    where: {
      tutor: {
        some: {
          id,
        },
      },
    },
  });
};

const tutorInfoResolver: Resolver = ({ id }) => {
  return client.tutorInfo.findMany({
    where: {
      tutor: {
        some: {
          id,
        },
      },
    },
  });
};

const tutorTagResolver: Resolver = ({ id }) => {
  return client.tutorTag.findMany({
    where: {
      tutor: {
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
      tutor: {
        some: {
          id,
        },
      },
    },
  });
};

// 튜터 문의 조회 리졸버
const tutorInquiryResolver :Resolver = ({ id }) => {
  return client.tutorInquiry.findMany({
    where: {
      tutorId: id, // tutorInquiry 대신 올바른 필드 사용
    },
    include: {
      user: true,
      tutor: true,
    },
  });
};

const tutorSportsEventResolver: Resolver = ({ id }) => {
  return client.tutorSportsEvent.findMany({
    where: {
      tutor: {
        id,
      },
    },
  });
};

const tutorImageResolver: Resolver = ({ id }) => {
  return client.tutorImage.findFirst({
    where: {
      tutor: {
        some: {
          id,
        },
      },
    },
  });
};

const isJoinResolver: Resolver = async ({ id }, _, { loggedInUser }) => {
  if (!loggedInUser) return false;
  const ok = await client.user.findFirst({
    where: {
      tutor: {
        some: {
          id,
        },
      },
      id: loggedInUser.id,
    },
    select: {
      id: true,
    },
  });
  return !!ok;
};

const tutorPresidentResolver: Resolver = ({ id }, _, { loggedInUser }) => {
  return client.tutorPresident.findFirst({
    where: {
      tutor: {
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

const isPresidentResolver: Resolver = async ({ id }, _, { loggedInUser }) => {
  if (!loggedInUser) return false;
  const ok = await client.tutorPresident.findFirst({
    where: {
      tutor: {
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
  return !!ok;
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Tutor: {
    group: groupResolver,
    userCount: userCountResolver,
    user: userResolver,
    tutorInfo: tutorInfoResolver,
    tutorTag: tutorTagResolver,
    facility: facilityResolver,
    tutorInquiry: tutorInquiryResolver,
    tutorSportsEvent: tutorSportsEventResolver,
    tutorImage: tutorImageResolver,
    isJoin: isJoinResolver,
    tutorPresident: tutorPresidentResolver,
    isPresident: isPresidentResolver,
  },
};

export default resolvers;
