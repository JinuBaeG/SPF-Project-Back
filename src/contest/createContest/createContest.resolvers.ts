import client from "../../client";
import { uploadToLocals } from "../../shared/shared.util";
import { Resolver, Resolvers } from "../../types";

// Resolver 함수 분리
const createContestResolver: Resolver = async (
  _,
  {
    contestName,
    contestStartDate,
    contestEndDate,
    contestRecruitStart,
    contestRecruitEnd,
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
    activeArea,
  },
  { loggedInUser }
) => {
  const date = Date.now();
  const contestId = "CT" + date;

  let imagePath: string[] = [];
  if (contestBanner !== null && contestBanner !== undefined) {
    imagePath = await uploadToLocals(contestBanner, "Contest");
  }

  await client.contest.create({
    data: {
      contestId,
      contestName,
      contestStartDate,
      contestEndDate,
      contestRecruitStart,
      contestRecruitEnd,
      contestPlace: activeArea,
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
      ...(contestBanner !== null &&
        contestBanner !== undefined && {
          contestBanner: imagePath[0],
        }),
    },
  });

  return {
    ok: true,
  };
};

// Resolvers 객체
const resolvers: Resolvers = {
  Mutation: {
    createContest: createContestResolver,
  },
};

export default resolvers;
