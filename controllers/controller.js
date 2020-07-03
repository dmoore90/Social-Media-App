const User = require('../models/User');

const bcrypt = require('bcrypt');

exports.getIndex = (req, res) => {
	res.render('pages/index.ejs')
};

exports.getLogin = (req, res) => {
	res.render('pages/login.ejs', {msg: null});
};

exports.getLoggedIn = (req, res, next) => {
    if (req.session.user) {
        return res.render('pages/profile.ejs', {username: req.session.user.username})
    } else {
    	return res.render('pages/profile.ejs', {username: null});
    }
    res.render('pages/profile.ejs');
};

exports.postIndex = (req, res) => {
    const username = req.body.username;
    const passwd = req.body.passwd;
    const hashedPassword = bcrypt.hashSync(passwd, 10);
    User.create({
        username: username,
        passwd: hashedPassword
    })
    res.redirect('/login');
};

exports.postLogin = (req, res) => {
    const username = req.body.username;
    const passwd = req.body.passwd;
    User.findOne({ where: { username: username } })
	.then(user => {
		if (!user) {
			return res.render('pages/login', {msg: "invalid user"});
		}
		bcrypt
		.compare(passwd, user.passwd)
		.then(doMatch => {
			if (doMatch) {
				console.log("----");
				console.log(user.id);
				console.log("----")
				req.session.user = user;
				console.log("---");
				console.log(req.session.user.username);
				console.log("---")
				return res.redirect('/profile');
			}
			return res.render('pages/login', {msg: "invalid password"});
		})
		.catch(err => {
			console.log(err)
			return res.redirect('/login');
		})
	})
}

exports.postLogout = (req, res) => {
	req.session.destroy(err => {
		res.redirect('/');
	})
}
