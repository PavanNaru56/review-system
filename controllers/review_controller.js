const User = require("../models/user");
const Review = require("../models/review");

module.exports.submitReview = async (req,res) => {
    console.log(req.user.username);
    console.log(req.params.id);
    console.log(req.body.feedback);
    try{
        const feedback = req.body.feedback;
        const recipient = await User.findById(req.params.id);
        const reviewer = await User.findById(req.user.id);


        const review = await Review.create({
            'review' : feedback,
            'recipient' : recipient,
            'reviewer' : reviewer
        });

        




        return res.redirect('back');



    }
    catch(err){
        console.log('error', err);



    }

}

// module.exports.doneReview = async (req,res) => {
//     try{

//         const review_id = req.params.id;

//         await Review.findByIdAndDelete(review_id);

//         return res.redirect(`/employee-dashboard/${req.user.id}`);

//     }catch(err){
//         console.log(err);
//         return res.redirect(`/employee-dashboard/${req.user.id}`);
//     }
// }