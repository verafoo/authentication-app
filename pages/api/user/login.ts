import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "../../utils/connection";
import { ResponseFuncs } from "../../utils/types";
const bcrypt = require("bcrypt");
const saltRounds = 10;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //capture request method, we type it as a key of ResponseFunc to reduce typing later
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  //function for catch errors
  const catcher = (error: Error) => res.status(400).json({ error });

  // Potential Responses
  const handleCase: ResponseFuncs = {
    // RESPONSE POST REQUESTS
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect(); // connect to database
      const user = JSON.parse(req.body);
      const userHasBeenSigned = await User.findOne({ email: user.email });
      if (userHasBeenSigned?.email) {
        return res.status(304).send("The email has already been signed.");
      }
      bcrypt.genSalt(
        saltRounds,
        function (err: { message: string }, salt: string) {
          if (!err) {
            bcrypt
              .hash(user.password, salt)
              .then(async function (hash: string) {
                user.password = hash;
                res.status(200).json(await User.create(user).catch(catcher));
              });
          } else {
            res.status(304).send(err.message);
          }
        }
      );
    },
  };

  // Check if there is a response for the particular method, if so invoke it, if not response with an error
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
};

export default handler;
