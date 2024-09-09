import { uploadToAWS } from "../../shared/shared.util";
import { Resolver, Resolvers } from "../../types";

// 필요한 타입 정의
type FacilitySport = {
  name: string;
};

type FacilityInfo = {
  description: string;
  awardDate: string;
};

type FacilityTag = {
  name: string;
  imagePath: string;
};

// createFacilityResolvers 함수 정의 (Resolver 타입 적용)
const createFacilityResolvers: Resolver = async (
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
    detailAddress,
    operTime,
    facilitySports,
    facilityImage,
    facilityInfo,
    facilityTag,
  },
  { client, loggedInUser }
) => {
  try {
    // 로그인이 되어 있는지 체크
    if (!loggedInUser) {
      return { ok: false, error: "로그인이 필요합니다." };
    }


    // AWS에 이미지 업로드 (이미지가 있을 경우에만)
    const facilityImages = facilityImage ? await uploadToAWS(facilityImage, "", "facility") : null;

    // facilitySports, facilityInfo, facilityTag 배열을 각각 처리
    const facilitySportArr = facilitySports?.map((item: FacilitySport) => ({
      where: { name: item.name },
      create: { name: item.name },
    }));

    const facilityInfoArr = facilityInfo?.map((item: FacilityInfo) => ({
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

    const facilityTagArr = facilityTag?.map((item: FacilityTag) => ({
      where: { name: item.name },
      create: {
        name: item.name,
        imagePath: item.imagePath,
      },
    }));

    // 데이터베이스에 시설 생성
    const result = await client.facility.create({
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
        detailAddress,
        operTime,
        ...(facilityImages && {
          facilityImage: {
            connectOrCreate: facilityImages,
          },
        }),
        ...(facilitySportArr && {
          facilitySports: {
            connectOrCreate: facilitySportArr,
          },
        }),
        ...(facilityInfoArr && {
          facilityInfo: {
            connectOrCreate: facilityInfoArr,
          },
        }),
        ...(facilityTagArr && {
          facilityTag: {
            connectOrCreate: facilityTagArr,
          },
        }),
      },
    });

    return { ok: true };
  } catch (error) {
    console.error("Facility creation failed:", error);
    return {
      ok: false,
      error: "Failed to create facility. Please check the provided information.",
    };
  }
};

// 전체 리졸버 (Resolvers 타입 적용)
const resolvers: Resolvers = {
  Mutation: {
    createFacility: createFacilityResolvers,
  },
};

export default resolvers;
