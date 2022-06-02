const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const { rejects } = require('assert');

const app = express();

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.render('contact',{layout: false});
});

app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        // do not fail on invalid certs
        user: '', // generated ethereal user
        pass: ''  // generated ethereal password
    },
    tls:{
      // do not fail on invalid certs
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '', // sender address
      to: '', // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {layout: false,msg:'Email has been sent'});
  });
  });

app.listen(3000, () => console.log('Server started...'));



const add = function(num1, num2){

    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(num1 + num2)
        }, 2000)
    })
}
// const add = (num1, num2, cb) =>{
//     setTimeout(()=>{
//         cb(num1, num2)
//     }, 2000)
// }

// add(2, 3, sum =>{
//     add(4, sum, sum1 =>{
//         add(5, sum1, sum2 =>{

//         })
//     })
// })

// add(2, 3).then(sum1 =>{
//     return add(4, sum1)
// }).then(sum2 =>{
//     return add( 5, sum2)
// }).then(sum3 =>{
//     return add(6, sum3)
// }).catch(err => console.log)


const fn  = async () => {
    const sum1 = await add(2, 3)
    console.log("sum11111111", sum1)
    const sum2 = await add(4, sum1)
    console.log("sum2222222222", sum2)

    const sum3 = await add(5, sum2)
    console.log("sum333333333", sum3)


    console.log(sum3)
}


// const events = require('events');
// const eventEmitter = new events.EventEmitter();

// // listen to the event
// eventEmitter.on('myEvent', () => {
//   console.log('Data Received');
// });

// // publish an event
// eventEmitter.emit('myEvent');
// const bip39 = require('bip39')
// const mnemonic = bip39.generateMnemonic()
// console.log("mnemonic", mnemonic)



