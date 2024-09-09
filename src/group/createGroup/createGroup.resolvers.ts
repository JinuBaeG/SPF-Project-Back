import { uploadToAWS } from "../../shared/shared.util";
import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 그룹 정보를 담은 타입 정의
type GroupInfo = {
  description: string;
  awardDate: string;
};

type GroupTag = {
  name: string;
  imagePath?: string;
};

const createGroupResolver: Resolver = async (
  _,
  {
    name,
    description,
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
    sportsEvent,
    file,
    maxMember,
    groupInfo,
    groupTag,
  },
  { loggedInUser, client }
) => {
  
  // 로그인이 되어 있는지 체크
  if (!loggedInUser) {
    return { ok: false, error: "로그인이 필요합니다." };
  }

  try {
    // 이미지 업로드 처리
    let imagePath: string[] | undefined;
    if (file && file.length > 0) {
      imagePath = await uploadToAWS(file, loggedInUser.id, "Group");
    }

    // 그룹 정보 처리
    let groupActiveInfo;
    if (groupInfo && groupInfo.length > 0) {
      groupActiveInfo = groupInfo.map((item: GroupInfo) => ({
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

    // 그룹 태그 처리
    let groupTagArr;
    if (groupTag && groupTag.length > 0) {
      groupTagArr = groupTag.map((item: GroupTag) => ({
        where: { name: item.name },
        create: {
          name: item.name,
          imagePath: item.imagePath,
        },
      }));
    }

    // 그룹 생성
    const group = await client.group.create({
      data: {
        name,
        description,
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
        sportsEvent,
        maxMember: maxMember.toString(),
        users: {
          connect: {
            id: loggedInUser.id,
          },
        },
        groupPresident: {
          connectOrCreate: {
            where: { userId: loggedInUser.id },
            create: { userId: loggedInUser.id },
          },
        },
        ...(imagePath && imagePath.length > 0 && {
          groupImage: {
            connectOrCreate: imagePath[0],
          },
        }),
        ...(groupActiveInfo && groupActiveInfo.length > 0 && {
          groupInfo: {
            connectOrCreate: groupActiveInfo,
          },
        }),
        ...(groupTagArr && groupTagArr.length > 0 && {
          groupTag: {
            connectOrCreate: groupTagArr,
          },
        }),
      },
    });

    return {
      ok: true,
      group,
    };
  } catch (error) {
    console.error("그룹 생성 실패:", error);
    return {
      ok: false,
      error: "그룹 생성 중 오류가 발생했습니다.",
    };
  }
};

// 전체 리졸버
const resolvers: Resolvers = {
  Mutation: {
    createGroup: protectedResolver(createGroupResolver),
  },
};

export default resolvers;
