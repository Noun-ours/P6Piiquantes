const Sauce = require('../models/sauce');


exports.likeSauce = (req, res, next) => {
    console.log('affichage request .body');
    console.log(req.body);
    Sauce.findOne({ _id: req.params.id })
        .then((sauceLiked) => {

            switch (req.body.like) {
                case 1:
                    Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $inc: { likes: 1 },
                            $push: { usersLiked: req.body.userId }
                        }
                    )
                        .then(() => res.status(201).json({ message: 'sauce like +1' }))
                    break;
                case -1:
                    Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $inc: { dislikes: 1 },
                            $push: { usersDisliked: req.body.userId }
                        }
                    )
                        .then(() => res.status(201).json({ message: 'sauce disliké ' }))
                        .catch((error) => res.status(400).json({ error }));
                    break;
                case 0:
                    if (sauceLiked.usersLiked.includes(req.body.userId)/* && req.body.like === 0*/) {
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                $inc: { likes: -1 },
                                $pull: { usersLiked: req.body.userId },
                            }
                        )
                            .then(() => res.status(201).json({ message: 'sauce like retiré ' }))
                            .catch((error) => res.status(400).json({ error }));
                        return;
                    }
                    if (sauceLiked.usersDisliked.includes(req.body.userId)) {
                        Sauce.updateOne(
                            { _id: req.params.id },
                            {
                                $inc: { dislikes: -1 },
                                $pull: { usersDisliked: req.body.userId },
                            }
                        )
                            .then(() => res.status(201).json({ message: 'sauce dislike 0' }))
                            .catch((error) => res.status(400).json({ error }));
                    }
                    break;
            }
        })
        .catch((error) => res.status(404).json({ error }))
}
