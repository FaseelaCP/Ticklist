import "./App.css";

import HeaderNav from "./components/HeaderNav/HeaderNav";

import { Route, Routes } from "react-router-dom";
import { EventProvider } from "./components/Context/EventContext";
import { AttractionProvider } from "./components/Context/AttractionContext";
import HomePage from "./pages/HomePage/HomePage";

import EventDetail from "./pages/EventDetail/EventDetail";
import EventsPage from "./pages/Events/events";
import { AuthProvider } from "./components/Context/AuthContext";
import LoginModal from "./components/Login/Login";
import AttractionsPage from "./pages/Attractions/pages";
import AttractionDetail from "./pages/AttractionDetail/pages";
import VenuesPage from "./pages/Venues/pages";
import { VenueProvider } from "./components/Context/VenueContext";
import VenueDetail from './pages/VenueDetail/pages'
import Footer from "./components/Footer/Footer";
import Search from './pages/Search/pages'

function App() {
  return (
    <>
      <AuthProvider>
        <EventProvider>
          <AttractionProvider>
            <VenueProvider>
              {/* Wrap content in a container with flexbox properties */}
              <div className="app-container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
                <HeaderNav />
                {/* Your main content area goes here */}
                <Routes>
                  <Route path="/" element={<HomePage />}></Route>
                  <Route path="/login" element={<LoginModal />}></Route>

                  <Route path="/events" element={<EventsPage />}></Route>
                  <Route path="/attractions" element={<AttractionsPage />}></Route>
                  <Route path="/venues" element={<VenuesPage />}></Route>
                  <Route path="/events/:eventId" element={<EventDetail />}></Route>
                  <Route path="/attractions/:attractionId" element={<AttractionDetail />}></Route>
                  <Route path="/venues/:venueId" element={<VenueDetail />}></Route>
                  <Route path="/search" element={<Search/>}></Route>
                </Routes>
                <Footer />
              </div>
            </VenueProvider>
          </AttractionProvider>
        </EventProvider>
      </AuthProvider>
    </>
  );
}

export default App;
