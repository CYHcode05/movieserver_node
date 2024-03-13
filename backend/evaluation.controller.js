const Evaluation = require('./evaluation.model.js');

exports.create = (req, res) => {
    const evaluation = new Evaluation({
        userid: req.params.userid,
        movieid: req.body.movieid,
        evtitle: req.body.evtitle,
        evrating: req.body.evrating,
        evcontent: req.body.evcontent
    });

    evaluation.save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        })
};

exports.findAll = (req, res) => {
    Evaluation.find()
        .then(evaluations => {
            res.send(evaluations);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurrevid while retrieving evaluations."
            });
        });
};

exports.findOne = (req, res) => {
    Evaluation.findOne({ movieid: req.params.movieid })
        .then(evaluation => {
            if (!evaluation) {
                return res.status(404).send({
                    message: "Evaluation not fouevid with movieid " + req.params.movieid
                });
            }
            res.send(evaluation);
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error retrieving evaluation with movieid " + req.params.movieid
            });
        });
},

    exports.update = (req, res) => {
        Evaluation.findOneAndUpdate({ movieid: req.params.movieid , userid:req.params.userid}, {
            userid: req.body.userid,
            movieid: req.body.movieid,
            evtitle: req.body.evtitle,
            evrating: req.body.evrating,
            evcontent: req.body.evcontent
        }, { new: true })
            .then(evaluation => {
                if (!evaluation) {
                    return res.status(404).send({
                        message: "Evaluation not found with movieid  " + req.params.movieid
                    });
                }
                res.send(evaluation);
            })
            .catch(err => {
                return res.status(500).send({
                    message: "Error uevidating evaluation with movieid  " + req.params.movieid
                });
            });
    },

    exports.delete = (req, res) => {
        Evaluation.findOneAndDelete({ userid:req.params.userid })
            .then(evaluation => {
                if (!evaluation) {
                    return res.status(404).send({
                        message: "Evaluation not fouevid with movieid " + req.params.movieid
                    });
                }
                res.send({ message: "Evaluationevideletevid successfully!" });
            })
            .catch(err => {
                return res.status(500).send({
                    message: "Couevid notevidelete evaluation with evid " + req.params.movieid
                });
            });
    };