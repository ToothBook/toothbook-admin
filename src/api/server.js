const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

//models
const Service = require('./Services');
const Appointment = require('./Appointment');
const AdminAccnt = require('./AdminAccount')
const TotalHours = require('./TotalHours')

//database - mongoose
mongoose.connect('mongodb://localhost:27017/DbToothbook', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//Services - Admin side
app.get('/api/service/list', (req, res) => {
    Service.find({}, (err, data) => {
        if (err) {
            return res.status(404).send('Error while getting list of services!');
        }
        return res.send({ data })
    })
})

app.post('/api/service/create', (req, res) => {
    console.log(req.body)
    const data = new Service({ name: req.body.name, time: req.body.time });
    data.save((err) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ data });
    });
});

app.post('/api/service/update/:id', (req, res) => {
    console.log(req.body)
    Service.findByIdAndUpdate(req.params.id, req.body.data, { new: true }, (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: 'Service is successfully updated', data })
        
    })
})

app.post('/api/service/delete/:id', (req, res) => {
    Service.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: 'Service is successfully deleted!', data })
    })
})

// Appointment
app.get('/api/appointment/list', (req, res) => {
    Appointment.find({}).exec((err, data) => {
        if (err) return res.status(404).send('Error while getting list of appointment!');
        return res.send({ data })
    })
})

app.post('/api/appointment/create', (req, res) => {
    console.log(req.body)
    const data = new Appointment({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        contact: req.body.contact,
        date: req.body.date,
        reason: req.body.reason,
        note: req.body.note,
        status: req.body.status,
        check: req.body.check,
        dateOfSubmit: req.body.dateOfSubmit
    });
    data.save((err) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ data });
    });
});

app.post('/api/appointment/update/:id', (req, res) => {
    Appointment.findByIdAndUpdate(req.params.id, req.body.data, { new: true }, (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: 'Service is successfully updated', data })
    })
})

app.post('/api/appointment/delete/:id', (req, res) => {
    Appointment.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: 'Service is successfully deleted!', data })
    })
})

//Admin - Account
app.get('/api/account/retrieve', (req, res) => {
    AdminAccnt.find({}, (err, data) => {
        if (err) {
            return res.status(404).send('Error while getting list of services!');
        }
        return res.send({ data })
    })
})

app.post('/api/account/create', (req, res) => {
    console.log(req.body)
    const data = new AdminAccnt({ username: req.body.username, password: req.body.password });
    data.save((err) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ data });
    });
});

app.post('/api/account/update/:id', (req, res) => {
    console.log(req.body)
    AdminAccnt.findByIdAndUpdate(req.params.id, req.body.data, { new: true }, (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: 'Service is successfully updated', data })
        
    })
})

app.post('/api/account/delete/:id', (req, res) => {
    AdminAccnt.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: 'Service is successfully deleted!', data })
    })
})

//Hours
app.post('/api/hours/add', (req, res) => {
    const data = new TotalHours({totalHours: req.body.totalHours, hoursRequested: req.body.hoursRequested });
    data.save((err) =>{
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ data });
    })
})

app.get('/api/hours/get', (req, res) => {
    TotalHours.find({}, (err, data) => {
        if (err) {
            return res.status(404).send('Error while getting list of services!');
        }
        return res.send({ data })
    })
})

app.post('/api/hours/update/:id', (req, res) => {
    console.log(req.body)
    TotalHours.findByIdAndUpdate(req.params.id, req.body.data, { new: true }, (err, data) => {
        if (err) return res.status(404).send({ error: err.message });
        return res.send({ message: 'Service is successfully updated', data })
        
    })
})



const PORT = 3000;

app.listen(PORT)
console.log('api running on port: ' + PORT)