// Defining Mongoose Schema for Event
const eventSchema = new mongoose.Schema({
    uid: String,
    name: String,
    tagline: String,
    schedule: Date,
    description: String,
    files: { image: String }, // Assuming file path is stored
    moderator: String,
    category: String,
    sub_category: String,
    rigor_rank: Number,
    attendees: [String] // Array of user IDs
  });
  
  const Event = mongoose.model('Event', eventSchema);

  // Routes

// GET events
app.get('/api/v3/app/events', async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // GET event by id
  app.get('/api/v3/app/events/:id', async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      res.json(event);
    } catch (error) {
      res.status(404).json({ message: 'Event not found' });
    }
  });
  
  // POST create new event
  app.post('/api/v3/app/events', async (req, res) => {
    const event = new Event({
      uid: req.body.uid,
      name: req.body.name,
      tagline: req.body.tagline,
      schedule: req.body.schedule,
      description: req.body.description,
      files: { image: req.body.image },
      moderator: req.body.moderator,
      category: req.body.category,
      sub_category: req.body.sub_category,
      rigor_rank: req.body.rigor_rank,
      attendees: req.body.attendees
    });
  
    try {
      const newEvent = await event.save();
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // PUT update an event
  app.put('/api/v3/app/events/:id', async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (event == null) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Update event fields
      event.name = req.body.name;
      event.tagline = req.body.tagline;
      // Update other fields similarly
  
      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  // DELETE an event
  app.delete('/api/v3/app/events/:id', async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (event == null) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      await event.remove();
      res.json({ message: 'Event deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
