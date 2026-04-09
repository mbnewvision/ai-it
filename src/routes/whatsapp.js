import express from "express";
import { analyzeMessage } from "../services/aiService.js";
import { sendEmailTicket } from "../services/mailService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const message = req.body.Body;
    const from = req.body.From;

    const ai = await analyzeMessage(message);

    if (ai.creer_ticket) {
      await sendEmailTicket(ai, from);
    }

    res.set("Content-Type", "text/xml");
    res.send(`<Response><Message>${ai.solution}</Message></Response>`);

  } catch (error) {
    res.send(`<Response><Message>Erreur serveur</Message></Response>`);
  }
});

export default router;
