const mongoose = require('mongoose'); 
    // useNewUrlParser: true,
    // useUnifiedTopology: true
   

mongoose.connect('mongodb+srv://gearpointurmr:13153648@cluster0.ga8nr.mongodb.net/GearPoint?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => console.error('MongoDB connection error:', error));
    

  