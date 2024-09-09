import client from "../../client";
import { uploadToLocals } from "../../shared/shared.util";
import { Resolver, Resolvers } from "../../types";

// resolver 함수 정의
const editContestResolver: Resolver = async (
  _: any,
  {
    id,
    contestId,
    contestName,
    contestStartDate,
    contestEndDate,
    contestRecruitStart,
    contestRecruitEnd,
    contestPlace,
    buildingNumber,
    dongEubMyunName,
    gusiName,
    riName,
    roadName,
    sidoName,
    zipcode,
    areaLatitude,
    areaLongitude,
    contestPlaceAddress,
    contestStadium,
    contestHost,
    contestSponsorShip,
    contestSports,
    contestSportsDetail,
    contestDescription,
    contestTerms,
    contestAwardDetails,
    contestEntryFee,
    contestBanner,
    contestRecruitNumber,
  }: {
    id: string;
    contestId: string;
    contestName?: string;
    contestStartDate?: string;
    contestEndDate?: string;
    contestRecruitStart?: string;
    contestRecruitEnd?: string;
    contestPlace?: string;
    buildingNumber?: string;
    dongEubMyunName?: string;
    gusiName?: string;
    riName?: string;
    roadName?: string;
    sidoName?: string;
    zipcode?: string;
    areaLatitude?: string;
    areaLongitude?: string;
    contestPlaceAddress?: string;
    contestStadium?: string;
    contestHost?: string;
    contestSponsorShip?: string;
    contestSports?: string;
    contestSportsDetail?: string;
    contestDescription?: string;
    contestTerms?: string;
    contestAwardDetails?: string;
    contestEntryFee?: string;
    contestBanner?: any;
    contestRecruitNumber?: number;
  }
) => {
  try {
    let imagePath: string[] = [];
    // contestBanner가 있을 경우 처리
    if (contestBanner) {
      imagePath = await uploadToLocals(contestBanner, "Contest");
    }

    // contest 업데이트
    const updatedContest = await client.contest.update({
      where: {
        id,
        contestId,
      },
      data: {
        contestName,
        contestStartDate,
        contestEndDate,
        contestRecruitStart,
        contestRecruitEnd,
        contestPlace,
        buildingNumber,
        dongEubMyunName,
        gusiName,
        riName,
        roadName,
        sidoName,
        zipcode,
        areaLatitude,
        areaLongitude,
        contestPlaceAddress,
        contestStadium,
        contestHost,
        contestSponsorShip,
        contestSports,
        contestSportsDetail,
        contestDescription,
        contestTerms,
        contestAwardDetails,
        contestEntryFee,
        contestRecruitNumber,
        ...(imagePath.length > 0 && {
          contestBanner: imagePath[0],
        }),
      },
    });

    if (updatedContest) {
      return {
        ok: true,
      };
    }
  } catch (error) {
    return {
      ok: false,
      error: "대회 수정 중 오류가 발생했습니다.",
    };
  }
};

// resolvers 객체 정의
const resolvers: Resolvers = {
  Mutation: {
    editContest: editContestResolver,
  },
};

export default resolvers;
