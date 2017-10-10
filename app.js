const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('landing-page');
});

app.get('/list', (req, res) => {
    res.render('list-campground', {
        campgrounds: [
            {name: '1', src: 'https://images.unsplash.com/uploads/141219324227007364f95/be0967a3?dpr=1&auto=compress,format&fit=crop&w=1050&h=&q=80&cs=tinysrgb&crop='},
            {name: '2', src: 'https://images.unsplash.com/photo-1428447207228-b396f310848b?dpr=1&auto=compress,format&fit=crop&w=1050&h=&q=80&cs=tinysrgb&crop='},
            {name: '3', src: 'https://images.unsplash.com/photo-1472806679307-eab7abd1eb32?dpr=1&auto=compress,format&fit=crop&w=1050&h=&q=80&cs=tinysrgb&crop='},
        ],
    });
})

app.listen(8080, '127.0.0.1', () => {
    console.log('Server is running...');
})