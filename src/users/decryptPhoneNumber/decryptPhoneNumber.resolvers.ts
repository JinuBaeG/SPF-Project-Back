import { deCryptFunction } from "../users.utils";
import { Resolvers } from "../../types";

const decryptPhoneNumberResolvers: Resolvers = {
  Mutation: {
    decryptPhoneNumber: async (
      _,
      { phoneNumber }: { phoneNumber: string }
    ) => {
      const returnValue = deCryptFunction(phoneNumber);

      return {
        ok: true,
        phoneNumber: returnValue,
      };
    },
  },
};

export default decryptPhoneNumberResolvers;
