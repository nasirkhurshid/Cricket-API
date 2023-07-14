import fetch from "node-fetch"
import express, { query } from 'express'

const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
    res.redirect('home')
})

app.get('/home', (req, res) => {
    async function fetchFromOffset(offset) {
        return await fetch("https://api.cricapi.com/v1/currentMatches?apikey=&offset=" + offset)
            .then(data => data.json())
            .then(data => {
                if (data.status != "success") { alert("Failed"); return; }
                let datarray = data.data;
                if (!datarray)
                    return [];
                else if (offset >= data.info.totalRows)
                    return datarray;
                else
                    return fetchFromOffset(offset + 25)
                        .then(function (data) {
                            return datarray.concat(data);
                        });
            })
            .catch(e => console.log);
    }
    fetchFromOffset(0)
        .then(function (data) {
            console.log("Data received!");
            res.render("home", { matches: data });
        })
        .catch(e => console.log);
})

app.get('/scoreboard', (req, res) => {
    async function fetchFromOffset(offset) {
        return await fetch("https://api.cricapi.com/v1/currentMatches?apikey=ed0c73b1-c723-40c4-9136-8f488dc0d278&offset=" + offset)
            .then(data => data.json())
            .then(data => {
                if (data.status != "success") { alert("Failed"); return; }
                let datarray = data.data;
                if (!datarray)
                    return [];
                else if (offset >= data.info.totalRows)
                    return datarray;
                else
                    return fetchFromOffset(offset + 25)
                        .then(function (data) {
                            return datarray.concat(data);
                        });
            })
            .catch(e => console.log);
    }
    fetchFromOffset(0)
        .then(function (data) {
            console.log("Data received!");
            res.render("scoreboard", { matches: data });
        })
        .catch(e => console.log);
})

app.get('/series', (req, res) => {
    async function fetchFromOffset(offset) {
        return await fetch("https://api.cricapi.com/v1/series?apikey=ed0c73b1-c723-40c4-9136-8f488dc0d278&offset=" + offset)
            .then(data => data.json())
            .then(data => {
                if (data.status != "success") { alert("Failed"); return; }
                let datarray = data.data;
                if (!datarray)
                    return [];
                else if (offset >= data.info.totalRows)
                    return datarray;
                else
                    return fetchFromOffset(offset + 25)
                        .then(function (data) {
                            return datarray.concat(data);
                        });
            })
            .catch(e => console.log);
    }
    fetchFromOffset(0)
        .then(function (data) {
            console.log("Data received!");
            res.render("series", { matches: data });
        })
        .catch(e => console.log);
})

app.get('/teams', (req, res) => {
    res.render('teams')
})

app.get('/player', (req, res) => {
    let pname = req.query.name
    async function fetchFromOffset(offset) {
        return await fetch("https://api.cricapi.com/v1/players?apikey=ed0c73b1-c723-40c4-9136-8f488dc0d278&offset=0&search=" + pname)
            .then(data => data.json())
            .then(data => {
                if (data.status != "success") { alert("Failed"); return; }
                let datarray = data.data;
                if (!datarray)
                    return [];
                else if (offset >= data.info.totalRows)
                    return datarray;
                else
                    return fetchFromOffset(offset + 25)
                        .then(function (data) {
                            return datarray.concat(data);
                        });
            })
            .catch(e => console.log);
    }
    fetchFromOffset(0)
        .then(function (data) {
            console.log("Data received!", data);
            const id = data[0].id
            console.log('id: ', id)
            res.redirect('/playerDetails?id=' + id)
        })
        .catch(e => console.log);
})

app.get('/playerDetails', (req, res) => {
    console.log(req.query)
    async function fetchFromOffset(id) {
        let rqst = "https://api.cricapi.com/v1/players_info?apikey=ed0c73b1-c723-40c4-9136-8f488dc0d278&id=" + id;
        console.log("rqst: ", rqst)
        return await fetch(rqst)
            .then(data => data.json())
            .then(data => {
                if (data.status != "success") { alert("Failed"); return; }
                let datarray = data.data;
                if (!datarray)
                    return [];
                else if (offset >= data.info.totalRows)
                    return datarray;
                else
                    return fetchFromOffset(offset + 25)
                        .then(function (data) {
                            return datarray.concat(data);
                        });
            })
            .catch(e => console.log);
    }
    fetchFromOffset(req.query.id)
        .then(function (data) {
            console.log("Data received!", req.query.id, data);
            res.render("playerDetails", { player: data })
        })
        .catch(e => console.log);
})


app.listen('8000', () => {
    console.log('Listening to Port 8000...')
})