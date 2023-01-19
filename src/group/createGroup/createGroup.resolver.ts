import client from "../../client";
import { uploadToS3 } from "../../shared/shared.util";
import { protectedResolver } from "../../users/users.utils";

const createGroupResolvers = async (
  _,
  {
    file,
    name,
    discription,
    activeArea,
    address,
    addrRoad,
    addAddr,
    zipcode,
    areaLatitude,
    areaLongitude,
    sportEvent,
    maxMember,
    groupInfo,
    groupTag,
  },
  { loggedInUser }
) => {
  const imagePath = await uploadToS3(file, loggedInUser.id, "group");
  const president = client.groupPresident.create({
    data: {
      user: {
        connect: {
          id: loggedInUser.id,
        },
      },
    },
  });
};

export default {
  Mutation: {
    createGroup: protectedResolver(createGroupResolvers),
  },
};
