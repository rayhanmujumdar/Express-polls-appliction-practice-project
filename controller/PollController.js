const Poll = require("../Model/Poll");
exports.createGetPollController = (req, res) => {
  res.render("create");
};
exports.createPostPollController = async (req, res) => {
  let { title, description, options } = req.body;
  options = options.map((op) => {
    return {
      name: op,
      vote: 0,
    };
  });
  const poll = new Poll({
    title,
    description,
    options,
  });
  try {
    await poll.save();
    res.redirect("/polls");
  } catch (e) {
    console.log(e);
  }
};

exports.allPollsController = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.render("polls", { polls });
  } catch (e) {
    console.log(e);
  }
};

exports.viewPollGetController = async (req, res) => {
  const id = req.params.id;
  try {
    const poll = await Poll.findById(id);
    const options = [...poll.options]
    const result = []
    options.forEach(option => {
      const parentage = (option.vote * 100) / poll.totalVote
      result.push({
        ...option._doc,
        parentage: parentage ? parentage : 0
      })
    })
    res.render("viewPoll", { poll , result});
  } catch (err) {
    console.log(err);
  }
};
exports.viewPollPostController = async (req, res) => {
  const selectPollId = req.body.option;
  const id = req.params.id;
  try {
    let poll = await Poll.findById(id);
    const index = poll.options.findIndex((o) => o.id === selectPollId);
    let options = [...poll.options];
    options[index].vote = options[index].vote + 1;
    let totalVote = poll.totalVote + 1
    await Poll.findByIdAndUpdate(id, {
      $set: {
        totalVote,
        options,
      },
    });
    res.redirect('/polls/' + id)
  } catch (err) {
    console.log(err);
  }
};
