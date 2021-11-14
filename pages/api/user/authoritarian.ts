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
      // res.json(await User.find({}).catch(catcher));
      const user = JSON.parse(req.body);
      const data = await User.find({ id: user.id });
      console.log(data, "data");
      if (data.length === 0)
        return res.status(200).send("no user match, please sign an account!");
      bcrypt.compare(
        user.password,
        data[0].password,
        function (err: object, result: boolean) {
          if (!err) return res.status(200).send(result);
          res.status(302).send(err);
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
