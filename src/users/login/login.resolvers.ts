import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }, { client }) => {
      try {
        const checkUsername = await client.user.findFirst({
          where: { username },
        });
        if (!checkUsername) {
          return {
            ok: false,
            error: "User not found.",
          };
        }
        const checkPw = await bcrypt.compare(password, checkUsername.password);
        if (!checkPw) {
          return {
            ok: false,
            error: "Incorrect Password.",
          };
        }
        const token = await jwt.sign(
          { id: checkUsername.id },
          process.env.SECRET_KEY
        );
        return {
          ok: true,
          token,
        };
      } catch (e) {
        return console.log(e);
      }
    },
  },
};

export default resolvers;
