import Header from "./components/header/header";
import SimpleList from "./components/Simplelist/SimpleList";
import Trending from "./components/Trending/Trending";
import Exams from "./components/categories/comp/exams/exams"
import FooterBar from "../pages/footerbar";

export default function Mainpage(){
    return(
        <>
        <Header />
            <Trending />
            <Exams />
        <SimpleList />
        <FooterBar />
        </>
    )
}
