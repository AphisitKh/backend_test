let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// homepage route
app.get('/', (req, res) => {
    return res.send({ error: false, message: 'home page'});
})

// connection mysql
let dbCon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'backend_web_dev'
});
dbCon.connect();

//GET Member
app.get('/members', (req, res) => {
    dbCon.query('SELECT * FROM member', (error, results, fields) => {
        if(error) throw error;

        if (results === undefined || results.length == 0){
            return res.status(404).send({message: "404 Not Found"});
        }else{
            return res.send({error: false, data: results, message: "Get All Member"});
        }
    })
})

//POST member
app.post('/members', (req,res) => {
    let member = {
        m_email: req.body.m_email,
        m_password: req.body.m_password,
        m_name: req.body.m_name,
    }

    if(!member.m_email || !member.m_password || !member.m_name){
        return res.status(400).send({ error: true, message: "Pls in put values"});
    }else{
        dbCon.query('INSERT INTO member(m_email, m_password, m_name) VALUES(?, ?, ?)', [member.m_email, member.m_password, member.m_name], (error, results, fields) => {
            if(error) throw error;
            return res.send({ error: false, data: results, message: "Post success"})
        })
    }
});

//GET Member By ID
app.get('/members/:m_id', (req, res) => {
    let m_id = req.params.m_id;
    if(!m_id){
        return res.status(400).send({error: true, message: "Pls in put Member ID"});
    }else{
        dbCon.query('SELECT * FROM member WHERE m_id = ?', m_id, (error, results, fields) => {
            if(error) throw error;

            if (results === undefined || results.length == 0){
                return res.status(404).send({message: "404 Not Found"});
            }else{
                return res.send({error: false, data: results, message: "Success Get Member By ID"});
            }
        })
    }
})

//PUT Member By ID
app.put('/members/:m_id', (req, res) => {
    let member = {
        m_id: req.params.m_id,
        m_email: req.body.m_email,
        m_password: req.body.m_password,
        m_name: req.body.m_name
    }

    if(!member.m_id || !member.m_email || !member.m_password || !member.m_name){
        return res.status(400).send({ error: true, message: "Pls in put values"});
    }else{
        dbCon.query('UPDATE member SET m_email = ?, m_password = ?, m_name = ? WHERE m_id = ?', [member.m_email, member.m_password, member.m_name, member.m_id], (error, results, fields) => {
            if(error) throw error;
            if(results.changedRows === 0){
                return res.status(404).send({message: "404 Not Found"});
            }else{
                return res.status(200).send({messgae: "200 OK"});
            }

        });
    }

})

//DEL Member By ID
app.delete('/members/:m_id', (req, res) => {
    let m_id = req.params.m_id;

    if(!m_id){
        return res.status(400).send({error: true, message: "Pls in put member id"});
    }else{
        dbCon.query('DELETE FROM member WHERE m_id = ?', [m_id], (error, results, fields) => {
            if(error) throw error;
            if(results.affectedRows === 0) {
                return res.status(404).send({message: "404 Not Found"});
            }else{
                return res.status(200).send({message: "200 OK"});
            }
        });
    }
});

//--------------------------------------------------------COURSE-------------------------------------------------------------------//

//GET Course
app.get('/courses', (req, res) => {
    dbCon.query('SELECT * FROM course', (error, results, fields) => {
        if(error) throw error;

        if (results === undefined || results.length == 0){
            return res.status(404).send({message: "404 Not Found"});
        }else{
            return res.send({error: false, data: results, message: "Get All Course"});
        }
    })
})

//POST course
app.post('/courses', (req,res) => {
    let course = {
        c_name: req.body.c_name,
        c_description: req.body.c_description,
        c_price: req.body.c_price,
    }

    if(!course.c_name || !course.c_description || !course.c_price){
        return res.status(400).send({ error: true, message: "Pls in put values"});
    }else{
        dbCon.query(`INSERT INTO course(c_name, c_description, c_price) VALUES(?, ?, ?)`, [course.c_name, course.c_description, course.c_price], (error, results, fields) => {
            if(error) throw error;
            return res.send({ error: false, data: results, message: "Post course success"})
        })
    }
});

//GET course By ID
app.get('/courses/:c_id', (req, res) => {
    let c_id = req.params.c_id;
    if(!c_id){
        return res.status(400).send({error: true, message: "Pls in put Course ID"});
    }else{
        dbCon.query('SELECT * FROM course WHERE c_id = ?', c_id, (error, results, fields) => {
            if(error) throw error;

            if (results === undefined || results.length == 0){
                return res.status(404).send({message: "404 Not Found"});
            }else{
                return res.send({error: false, data: results, message: "Success Get course By ID"});
            }
        })
    }
})

//PUT course By ID
app.put('/courses/:c_id', (req, res) => {
    let course = {
        c_id: req.params.c_id,
        c_name: req.body.c_name,
        c_description: req.body.c_description,
        c_price: req.body.c_price
    }

    if(!course.c_id || !course.c_name || !course.c_description || !course.c_price){
        return res.status(400).send({ error: true, message: "Pls in put values"});
    }else{
        dbCon.query('UPDATE course SET c_name = ?, c_description = ?, c_price = ? WHERE c_id = ?', [course.c_name, course.c_description, course.c_price, course.c_id], (error, results, fields) => {
            if(error) throw error;
            if(results.changedRows === 0){
                return res.status(404).send({message: "404 Not Found"});
            }else{
                return res.status(200).send({messgae: "200 OK"});
            }

        });
    }

})

//DEL course By ID
app.delete('/courses/:c_id', (req, res) => {
    let c_id = req.params.c_id;

    if(!c_id){
        return res.status(400).send({error: true, message: "Pls in put course id"});
    }else{
        dbCon.query('DELETE FROM course WHERE c_id = ?', [c_id], (error, results, fields) => {
            if(error) throw error;
            if(results.affectedRows === 0) {
                return res.status(404).send({message: "404 Not Found"});
            }else{
                return res.status(200).send({message: "200 OK"});
            }
        });
    }
});

//-------------------------------------------------------ENROLLS--------------------------------------------------------------------//

//GET enrolls
app.get('/enrolls', (req, res) => {
    dbCon.query('SELECT * FROM enroll', (error, results, fields) => {
        if(error) throw error;

        if (results === undefined || results.length == 0){
            return res.status(404).send({message: "404 Not Found"});
        }else{
            return res.send({error: false, data: results, message: "Get All enrolls"});
        }
    })
})

//POST enroll
app.post('/enrolls', (req,res) => {
    let enroll = {
        m_id: req.body.m_id,
        c_id: req.body.c_id,
        cer_start: req.body.cer_start,
        cer_expire: req.body.cer_expire
    }

    if(!enroll.m_id || !enroll.c_id || !enroll.cer_start || !enroll.cer_expire){
        return res.status(400).send({ error: true, message: "Pls in put values"});
    }else{
        dbCon.query('INSERT INTO enroll(m_id, c_id, cer_start, cer_expire) VALUES(?, ?, ?, ?)', [enroll.m_id, enroll.c_id, enroll.cer_start, enroll.cer_expire], (error, results, fields) => {
            if(error) throw error;
            return res.send({ error: false, data: results, message: "Post success"})
        })
    }
});

//GET enroll By ID
app.get('/enrolls/:cer_id', (req, res) => {
    let cer_id = req.params.cer_id;
    if(!cer_id){
        return res.status(400).send({error: true, message: "Pls in put enroll ID"});
    }else{
        dbCon.query('SELECT * FROM enroll WHERE cer_id = ?', cer_id, (error, results, fields) => {
            if(error) throw error;

            if (results === undefined || results.length == 0){
                return res.status(404).send({message: "404 Not Found"});
            }else{
                return res.send({error: false, data: results, message: "Success Get enroll By ID"});
            }
        })
    }
})

//PUT enroll By ID
app.put('/enrolls/:cer_id', (req, res) => {
    let enroll = {
        cer_id: req.params.cer_id,
        m_id: req.body.m_id,
        c_id: req.body.c_id,
        cer_start: req.body.cer_start,
        cer_expire: req.body.cer_expire,
    }

    if(!enroll.cer_id || !enroll.m_id || !enroll.c_id || !enroll.cer_start || !enroll.cer_expire){
        return res.status(400).send({ error: true, message: "Pls in put values"});
    }else{
        dbCon.query('UPDATE enroll SET m_id = ?, c_id = ?, cer_start = ? cer_expire = ? WHERE cer_id = ?', [enroll.m_id, enroll.c_id, enroll.cer_start, enroll.cer_expire, enroll.cer_id], (error, results, fields) => {
            if(error) throw error;
            if(results.changedRows === 0){
                return res.status(404).send({message: "404 Not Found"});
            }else{
                return res.status(200).send({messgae: "200 OK"});
            }

        });
    }

})

//DEL enroll By ID
app.delete('/enrolls/:cer_id', (req, res) => {
    let cer_id = req.params.cer_id;

    if(!cer_id){
        return res.status(400).send({error: true, message: "Pls in put enroll id"});
    }else{
        dbCon.query('DELETE FROM enroll WHERE cer_id = ?', [cer_id], (error, results, fields) => {
            if(error) throw error;
            if(results.affectedRows === 0) {
                return res.status(404).send({message: "404 Not Found"});
            }else{
                return res.status(200).send({message: "200 OK"});
            }
        });
    }
});

//---------------------------------------------------------------------------------------------------------------------------//
//GET all course enroll By member ID
app.get('/enrolls/member/:m_id', (req, res) => {
    let m_id = req.params.m_id;
    if(!m_id){
        return res.status(400).send({error: true, message: "Pls in put member ID"});
    }else{
        dbCon.query('SELECT * FROM enroll INNER JOIN member ON member.m_id = enroll.m_id INNER JOIN course ON course.c_id = enroll.c_id WHERE enroll.m_id = ?', m_id, (error, results, fields) => {
            if(error) throw error;

            if (results === undefined || results.length == 0){
                return res.status(404).send({message: "404 Not Found"});
            }else{
                return res.send({error: false, data: results, message: "Success Get all course enroll By member ID"});
            }
        })
    }
})

//GET all course enroll By course ID
app.get('/enrolls/course/:c_id', (req, res) => {
    let c_id = req.params.c_id;
    if(!c_id){
        return res.status(400).send({error: true, message: "Pls in put course ID"});
    }else{
        dbCon.query('SELECT * FROM enroll INNER JOIN member ON member.m_id = enroll.m_id INNER JOIN course ON course.c_id = enroll.c_id WHERE enroll.c_id = ?', c_id, (error, results, fields) => {
            if(error) throw error;

            if (results === undefined || results.length == 0){
                return res.status(404).send({message: "404 Not Found"});
            }else{
                return res.send({error: false, data: results, message: "Success Get all course enroll By course ID"});
            }
        })
    }
})
//---------------------------------------------------------------------------------------------------------------------------//

// http://localhost:3000
app.listen(3000, () => {
    console.log('running on port 3000')
});

module.exports = app;