import { uploadToAWS } from "../../shared/shared.util";
import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";
import client from "../../client";

// 튜터 생성 리졸버
const createTutorResolver: Resolver = async (
  _,
  {
    name,
    description, // 'discription' 오타 수정
    sidoName,
    gusiName,
    dongEubMyunName,
    riName,
    roadName,
    buildingNumber,
    zipcode,
    activeArea,
    address,
    addrRoad,
    areaLatitude,
    areaLongitude,
    tutorSportsEvent,
    file,
    tutorInfo,
    tutorTag,
    group,
  },
  { loggedInUser, client }
) => {
  let imagePath;
  if (file !== undefined && file.length > 0) {
    imagePath = await uploadToAWS(file, loggedInUser!.id, "Tutor");
  }

  // tutorInfo 타입 지정
  let tutorActiveInfo;
  if (tutorInfo !== undefined && tutorInfo.length > 0) {
    tutorActiveInfo = tutorInfo.map((item: { description: string; awardDate: string }) => ({
      where: {
        description_awardDate: {
          description: item.description,
          awardDate: item.awardDate,
        },
      },
      create: {
        description: item.description,
        awardDate: item.awardDate,
      },
    }));
  }

  // tutorTag 타입 지정
  let tutorTagArr;
  if (tutorTag !== undefined && tutorTag.length > 0) {
    tutorTagArr = tutorTag.map((item: { name: string; imagePath: string }) => ({
      where: { name: item.name },
      create: {
        name: item.name,
        imagePath: item.imagePath,
      },
    }));
  }

  // tutorSportsEvent 타입 지정
  let tutorSportsEventArr;
  if (tutorSportsEvent !== undefined && tutorSportsEvent.length > 0) {
    tutorSportsEventArr = tutorSportsEvent.map((item: { id: string; name: string }) => ({
      where: { id: item.id },
      create: {
        id: item.id,
        name: item.name,
      },
    }));
  }

  // group 타입 지정
  let groupArr;
  if (group !== undefined && group.length > 0) {
    groupArr = group.map((item: { id: string }) => ({
      id: item.id,
    }));
  }

  const createCheck = await client.tutor.create({
    data: {
      name,
      description, // 오타 수정
      sidoName,
      gusiName,
      dongEubMyunName,
      riName,
      roadName,
      buildingNumber,
      zipcode,
      activeArea: dongEubMyunName,
      address,
      addrRoad,
      areaLatitude,
      areaLongitude,
      ...(tutorSportsEventArr && tutorSportsEventArr.length > 0 && {
        tutorSportsEvent: {
          connectOrCreate: tutorSportsEventArr,
        },
      }),
      user: {
        connect: {
          id: loggedInUser!.id, // Non-null assertion 사용
        },
      },
      ...(imagePath && {
        imagePath: {
          connectOrCreate: imagePath,
        },
      }),
      ...(tutorActiveInfo && {
        tutorInfo: {
          connectOrCreate: tutorActiveInfo,
        },
      }),
      ...(tutorTagArr && {
        tutorTag: {
          connectOrCreate: tutorTagArr,
        },
      }),
      ...(groupArr && {
        group: {
          connect: groupArr,
        },
      }),
    },
  });

  if (!createCheck) {
    return { ok: false, error: "튜터를 생성하지 못했습니다." };
  } else {
    return {
      ok: true,
    };
  }
};

// 전체 Resolvers 정의
const resolvers: Resolvers = {
  Mutation: {
    createTutor: protectedResolver(createTutorResolver), // protectedResolver 적용
  },
};

export default resolvers;
