const { ConversationV1 } = require("watson-developer-cloud");
const { username, password, version, workspace_id } = require("./config");

const conversation = new ConversationV1({
  username,
  password,
  version
});

module.exports = {
  setDialogFromUser(request, response) {
    const { message, context } = request.body;
    const params = {
      workspace_id,
      alternate_intents: true,
      context,
      input: { text: message }
    };
    conversation.message(params, (err, result) => {
      if (err) {
        throw err;
      }
      response.json(result);
    });
  }
};
