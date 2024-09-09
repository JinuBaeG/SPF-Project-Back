import { uploadToAWS } from "../../shared/shared.util";
import { protectedResolver } from "../../users/users.utils";
import { Resolver, Resolvers } from "../../types";

// 그룹 정보 타입 정의
type GroupInfo = {
  id?: string;
  description: string;
  awardDate: string;
  isDelete?: boolean;
  isNew?: boolean;
};

type GroupTag = {
  id?: string;
  name: string;
  imagePath?: string;
};

const editGroupResolver: Resolver = async (
  _,
  {
    id,
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
    groupPresident,
  },
  { loggedInUser, client }
) => {
  // 로그인 확인
  if (!loggedInUser) {
    return {
      ok: false,
      error: "로그인이 필요합니다.",
    };
  }

  try {
    // 이미지 업로드 처리
    let imagePath;
    if (file && file.length > 0) {
      imagePath = await uploadToAWS(file, loggedInUser.id, "Group");
    }

    // 그룹 대표 업데이트
    await client.groupPresident.update({
      where: {
        id: groupPresident.id,
      },
      data: {
        user: {
          connect: {
            id: groupPresident.user.id,
          },
        },
      },
    });

    // 기존 그룹 태그 비활성화
    const tagResult = await client.groupTag.findMany({
      where: {
        group: {
          some: {
            id,
          },
        },
      },
    });

    const tagWhere = tagResult.map((item) => ({
      id: item.id,
    }));

    await client.group.update({
      where: {
        id,
      },
      data: {
        groupTag: {
          disconnect: tagWhere,
        },
      },
    });

    // 새로운 그룹 태그 업데이트
    let groupTagArr;
    if (groupTag && groupTag.length > 0) {
      groupTagArr = groupTag.map((item: GroupTag) => ({
        where: { id: item.id },
        create: {
          name: item.name,
          imagePath: item.imagePath,
        },
      }));
    }

    // 그룹 이력 업데이트 함수
    const setGroupInfo = async (groupInfo: GroupInfo[]) => {
      const promises: GroupInfo[] = []; // GroupInfo 타입을 명시적으로 설정

      groupInfo.map(async (item: GroupInfo) => {
        if (item.isDelete) {
          await client.group.update({
            where: {
              id,
            },
            data: {
              groupInfo: {
                disconnect: {
                  id: item.id,
                },
              },
            },
          });
        }

        if (item.isNew) {
          promises.push(item);
        }
      });

      return promises.map((item: GroupInfo) => ({
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
    };

    let groupActiveInfo = await setGroupInfo(groupInfo);

    // 그룹 정보 업데이트
    const updateCheck = await client.group.update({
      where: {
        id,
      },
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
        activeArea,
        address,
        addrRoad,
        areaLatitude,
        areaLongitude,
        sportsEvent,
        maxMember: maxMember.toString(),
        ...(imagePath && {
          groupImage: {
            connectOrCreate: imagePath,
          },
        }),
        ...(groupTagArr && {
          groupTag: {
            connectOrCreate: groupTagArr,
          },
        }),
        ...(groupActiveInfo && groupActiveInfo.length > 0 && {
          groupInfo: {
            connectOrCreate: groupActiveInfo,
          },
        }),
      },
    });

    if (!updateCheck) {
      return { ok: false, error: "그룹을 수정하지 못했습니다." };
    } else {
      return {
        ok: true,
      };
    }
  } catch (error) {
    console.error("그룹 수정 실패:", error);
    return {
      ok: false,
      error: "그룹 수정 중 오류가 발생했습니다.",
    };
  }
};

// 전체 리졸버
const resolvers: Resolvers = {
  Mutation: {
    editGroup: protectedResolver(editGroupResolver),
  },
};

export default resolvers;
