import Header from "./components/header/header";
import SimpleList from "./components/Simplelist/SimpleList";
import Trending from "./components/Trending/Trending";
import Exams from "./components/categories/comp/exams/exams"

export default function Mainpage(){
    return(
        <>
        <Header />
            <Trending />
            <Exams />
        <SimpleList />
        </>
    )
}