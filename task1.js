import express from 'express';
const app = express();
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'
const users = [
    {
        id: uuidv4(),
        email: 'yrose',
        password: '12345678'
    },
    {
        id: uuidv4(),
        email: 'zvika',
        password: '13579'
    },
    {
        id: uuidv4(),
        email: 'mendi',
        password: '2468'
    },
]
app.use(express.json());
app.get('/users/:email', (req, res) => {
    const userEmail = req.params.email
    const checkId = users.find(item => item.id === userEmail)
    if (!checkId == '') {
        res.json({ checkId });
    } else {
        res.send('id is not found')
    }
});
app.get('/users', (req, res) => {
    res.json({ users });
});
app.post('/', (req, res) => {
    let data = req.body;
    users.push(data)
    res.send('Data Received: ' + JSON.stringify(data));
})
app.post('/users', (req, res) => {
    const { email, password } = req.body
    if (users.find(item => item.email === email && item.password === password)) {
        res.send('User is connected')
    } else {
        res.send('wrong credentials')
    }
})
app.post('/users/:email', async (req, res) => {
    const userEmail = req.params.email
    const user = users.findIndex(item => item.email === userEmail)
    console.log(user)
    if (user !== -1) {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 1);
        const newUser = { email, passwordHash: hashedPassword };
        users.push(newUser);
        res.send('User registered');
    } else {
        res.send('wrong ')
    }
});
app.put('/users/:email', (req, res) => {
    const userEmail = req.params.email
    const user = users.findIndex(item => item.email === userEmail)
    console.log(user)
    if (user !== -1) {
        const { email, password } = req.body
        console.log(email)
        users[user].email = email
        users[user].password = password
        res.send('Got a PUT request at /user')
    } else {
        res.send('id is not found')
    }
})
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = users.findIndex(item => item.id === userId)
    delete (users[user])
    res.send('Got a DELETE request at /user')
})
app.listen(3000, () =>
    console.log('Example app listening on port 3000!'),
);