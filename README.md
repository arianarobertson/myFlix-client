🎬 myFlix React App

📌 Objective

The myFlix React application is the client-side of a full-stack movie application, built using React to interact with a REST API and database. It provides users with access to movie details, user authentication, and profile management.

🛠 Tech Stack

Frontend: React (ES2015+), React Router
UI Library: Bootstrap
State Management: React Redux (optional)
Build Tool: Parcel
Hosting: Online deployment (e.g., Netlify, Vercel)
📍 Features & Views

🔹 Main View
✔ Returns all movies (image, title, description)
✔ Search/filter movies
✔ Select a movie for more details
✔ Navigate to Profile view
✔ Log out

🔹 Single Movie View
✔ Displays detailed movie information (genre, director, image)
✔ Add movie to favorites

🔹 Login View
✔ User login with username and password

🔹 Signup View
✔ User registration (username, password, email, date of birth)

🔹 Profile View
✔ Displays user details
✔ Update user info (username, password, email, date of birth)
✔ View and remove favorite movies
✔ Deregister (delete account)

🎥 Optional Features

💡 Actors View: View actor information
💡 Genre View: Genre details with example movies
💡 Director View: Director bio and related movies
💡 Single Movie Enhancements: Release date, ratings, related movies, sharing feature
💡 Sorting: Sort movies by different criteria
💡 “To Watch” List: In addition to favorites

🔧 Technical Requirements

✔ Single Page Application (SPA)
✔ State Routing for navigation (React Router)
✔ Search/filter functionality
✔ Parcel as build tool
✔ React (ES2015+), Functional Components
✔ Bootstrap for styling & responsiveness
✔ Hosted Online
✔ Redux (optional) for state management

🚀 Installation & Setup

1️⃣ Clone the repository:

git clone https://github.com/your-username/myflix-client.git
cd myflix-client
2️⃣ Install dependencies:

npm install
3️⃣ Run the development server:

npm start
4️⃣ Build for production:

npm run build
📡 API & Backend

This client-side React app interacts with the myFlix API, built using Node.js, Express, and MongoDB.
📌 Backend repo: myFlix API

🌍 Deployment

The app is hosted online for public access.
🔗 Live Demo: myFlix App

🏗 Future Improvements

Implement additional optional features (sorting, sharing, actors view, etc.)
Improve UI/UX with animations and transitions
Add accessibility enhancements
📜 License

This project is licensed under the MIT License.
