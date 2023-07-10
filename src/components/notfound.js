import Header from "./Header";

const NotFound = () => {
    return ( 
        <div>
            <Header />
            <div className="no-results">
                <img src="404.gif" alt="empty" />
            </div>
        </div>
     );
}
 
export default NotFound;