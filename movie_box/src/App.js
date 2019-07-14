import  React  from 'react';
import Header from './components/header/header.jsx';
import Main from './components/main/main.jsx';
import Footer from './components/footer/footer.jsx';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <div className="movie_box"> 
                <Header />
                <Main />
                <Footer />
            </div>
        );
    }
}

export default App;