const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const bcrypt = require('bcrypt');
const session = require('express-session');
const path = require('path'); 

const router = express.Router();
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/entertain', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventDate: Date,
  availableTicketsAdult: Number,
  availableTicketsChildren: Number,
  eventAddress: String,
  eventCity: String,
  eventState: String,
  eventPincode: Number,
  category: String,
  eventDuration: Number,
  eventOption: String,
  eventDescription: String,
});

const Event = mongoose.model('Event', eventSchema);

const bookingSchema = new mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  eventOption: mongoose.Types.ObjectId,
  eventName: String,
  eventDate: Date,
  availableTicketsAdult: Number,
  availableTicketsChildren: Number,
  eventAddress: String,
  eventCity: String,
  eventState: String,
  eventPincode: Number,
  category: String,
  eventDuration: Number,
  eventOption: String,
  eventDescription: String,
  // ... other fields related to the booking
});
const Booking = mongoose.model('Booking', bookingSchema);

app.use(session({
  secret: 'your-secret-key', // Change this to a strong secret key
  resave: false,
  saveUninitialized: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
  res.redirect("/home2");
});

app.get("/home", (req, res) => {
  res.render("home", { loggedIn: req.session.loggedIn });
});

app.get("/home2", (req, res) => {
  res.render("home2");
});

app.get('/event', (req, res) => {
  res.render('event');
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/signup2", (req, res) => {
  res.render("signup2");
});


app.get("/music", (req, res) => {
  res.render("music");
});


app.get("/comedy", (req, res) => {
  res.render("comedy");
});


app.get("/happystreet", (req, res) => {
  res.render("happystreet");
});


app.get("/workshops", (req, res) => {
  res.render("workshops");
});

app.get("/pop", (req, res) => {
  res.render("pop");
});
app.get("/tamil", (req, res) => {
  res.render("tamil");
});
app.get("/american", (req, res) => {
  res.render("american");
});
app.get("/kpop", (req, res) => {
  res.render("kpop");
});
app.get("/jazz", (req, res) => {
  res.render("jazz");
});app.get("/dark", (req, res) => {
  res.render("dark");
});app.get("/improv", (req, res) => {
  res.render("improv");
});
app.get("/sketch", (req, res) => {
  res.render("sketch");
});
app.get("/slapstick", (req, res) => {
  res.render("slapstick");
});
app.get("/booking", (req, res) => {
  res.render("booking");
});

app.get("/stand_up", (req, res) => {
  res.render("stand_up");
});
app.get("/art", (req, res) => {
  res.render("art");
});app.get("/event", (req, res) => {
  res.render("event");
});app.get("/food", (req, res) => {
  res.render("food");
});
app.get("/kids", (req, res) => {
  res.render("kids");
});
app.get("/sports", (req, res) => {
  res.render("sports");
});
app.get("/artistic", (req, res) => {
  res.render("artistic");
});app.get("/culinary", (req, res) => {
  res.render("culinary");
});app.get("/dance", (req, res) => {
  res.render("dance");
});

app.get("/magic", (req, res) => {
  res.render("magic");
});
app.get("/pottery", (req, res) => {
  res.render("pottery");
});
app.get('/admin', (req, res) => {
  res.render('admin');
});
app.get('/contact', (req, res) => {
  res.render('contact');
});
app.get('/about', (req, res) => {
  res.render('about');
});


app.post("/signup", async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const existingUser = await User.findOne({ name: data.name });
    if (existingUser) {
      return res.send("User already exists. Please choose a different username.");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword;

    await User.create(data);
    req.session.loggedIn = true;
    res.redirect("/login");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user. Please try again.");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    const check = await User.findOne({ name: req.body.username });
    if (!check) {
      return res.send("Username not found");
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
    if (isPasswordMatch) {
      req.session.loggedIn = true;
      res.redirect("/home");
    } else {
      res.send("Wrong password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("An error occurred. Please try again.");
  }
});

app.get("/logout", (req, res) => {
  // Destroy the session and redirect to the signup page
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.redirect("/signup");
  });
});

app.post("/signup2", async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const existingUser = await User.findOne({ name: data.name });
    if (existingUser) {
      return res.send("User already exists. Please choose a different username.");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    data.password = hashedPassword;

    await User.create(data);
    req.session.loggedIn = true;
    res.redirect("/login2");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user. Please try again.");
  }
});

app.get("/login2", (req, res) => {
  res.render("login2");
});

app.post("/login2", async (req, res) => {
  try {
    const check = await User.findOne({ name: req.body.username });
    if (!check) {
      return res.send("Username not found");
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
    if (isPasswordMatch) {
      req.session.loggedIn = true;
      res.redirect("/admin");
    } else {
      res.send("Wrong password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("An error occurred. Please try again.");
  }
});

app.get("/logout", (req, res) => {
  // Destroy the session and redirect to the signup page
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
    }
    res.redirect("/signup2");
  });
});



// Handle routes for dynamic event categories and options
app.get('/:category/:option', async (req, res) => {
  const { category, option } = req.params;

  try {
    const events = await Event.find({ category, eventOption: option }).exec();
    res.render(`${category}/${option}`, { events });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/admin', async (req, res) => {
  const eventData = req.body;

  try {
    const newEvent = new Event(eventData);
    await newEvent.save();

    const redirectPath = `/${eventData.category.toLowerCase()}/${eventData.eventOption.toLowerCase()}`;
    res.redirect("/home2");
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/booking', async (req, res) => {
  try {
    // Retrieve event details based on the eventId
    const eventId = req.query.eventId; // Assuming eventId is passed as a query parameter
    const event = await Event.findById(eventId);

    if (!event) {
      // Handle case when event is not found
      return res.status(404).send('Event not found');
    }

    // Render the booking details form with event details
    res.render('booking', { event });
  } catch (error) {
    console.error('Error rendering booking page:', error);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

app.post('/booking', async (req, res) => {
  try {
    const { name, adultCount, childrenCount,payment,paymentmethod } = req.body;
  console.log('Booking Details:', { name, adultCount, childrenCount,payment,paymentmethod});

    res.redirect('/booking');
  } catch (error) {
    console.error('Error processing booking:', error);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});
// Render the confirmation page
app.get('/confirmation', (req, res) => {
  res.render('confirmation');
});

app.get('/generated-page', (req, res) => {
  const eventData = req.session.eventData;
  res.render('generated-page', { eventData });
});

const port = 2004;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
