const User = require('./user.model.js');

exports.create = (req, res) => {
    const user = new User({
        userid: req.body.userid,
        userpassword: req.body.userpassword,
        name: req.body.name,
        number: req.body.number,
        email: req.body.email,
        address: req.body.address,
    });

    user.save()
        .then(data => {
            res.send(data);
        })
        .catch(err=>{
            res.status(500).send({message: err.message});
        })
};

exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

exports.findOne = (req, res) => {
    User.findOne({userid: req.params.userid})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with userid " + req.params.userid
                });
            }
            res.send(user);
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error retrieving user with userid " + req.params.userid
            });
        });
}

exports.update = (req, res) => {
    User.findOneAndUpdate({userid: req.params.userid}, {
        userid: req.body.userid,
        userpassword: req.body.userpassword,
        name: req.body.name,
        number: req.body.number,
        email: req.body.email,
        address: req.body.address
    }, {new: true})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with userid " + req.params.userid
                });
            }
            res.send(user);
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error updating user with userid " + req.params.userid
            });
        });
}

exports.delete = (req, res) => {
    User.findOneAndDelete({userid: req.params.userid})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with userid " + req.params.userid
                });
            }
            res.send({message: "User deleted successfully!"});
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error deleting user with userid " + req.params.userid
            });
        });
}