const Poll = require("../Model/Poll");
exports.createGetPollController = (req, res) => {
  res.render("create");
};
exports.createPostPollController = async(req, res) => {
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
  try{
    await poll.save()
    res.redirect('/polls')
  }catch (e){
    console.log(e)
  }
};

exports.allPollsController = (req,res) => {
    
}