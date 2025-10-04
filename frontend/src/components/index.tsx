import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Header from "./Navbar/Header";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import VideoList from "./Video/VideoList";
import Video from "./Video/Video";

export default function Index(props: { isLoggedIn: boolean, setLoggedIn: (val: boolean) => void }) {
    const { isLoggedIn, setLoggedIn } = props
    return (
        <div>
            <Header isLoggedIn={isLoggedIn} />
            <BrowserRouter>
                {isLoggedIn ?
                    <Routes>
                        <Route path="/video" element={<VideoList setLoggedIn={setLoggedIn}/>}>
                        </Route>
                        <Route path="/video/:id" element={<Video setLoggedIn={setLoggedIn}/>}>
                        </Route>
                    </Routes>
                    :
                    <Routes>
                        <Route path="/" element={<SignIn setIsLoggedIn={setLoggedIn} isLoggedIn={isLoggedIn} />}>
                        </Route>
                        <Route path="/signup" element={<SignUp />}>
                        </Route>
                    </Routes>
                }
            </BrowserRouter>
        </div>

    )
}