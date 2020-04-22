import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "ec6a9deaec61e69f90c23f77677eedb2";

class App extends React.Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    


    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();

    if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      })
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values"
      });
    }

  }
  render() {
    //clear skies
    let styleTitle = {
      height: '90vh',
      background: 'url("https://media2.giphy.com/media/wKnqovL33x9in9ci6X/giphy.webp?cid=ecf05e473ff208a0cf3ae305c0ec52b1939fe0f7f61b70e9&rid=giphy.webp&cid=ecf05e473ff208a0cf3ae305c0ec52b1939fe0f7f61b70e9&rid=giphy.webp&cid=ecf05e473ff208a0cf3ae305c0ec52b1939fe0f7f61b70e9&rid=giphy.webp&cid=ecf05e473ff208a0cf3ae305c0ec52b1939fe0f7f61b70e9&rid=giphy.webp") center center no-repeat',
      backgroundSize: 'cover',
      display: '-webkit-inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: "white",
    }
    //snowing GIF
    if (this.state.temperature <= 10 && this.state.description.includes('snow')) {
      styleTitle = {
        height: '90vh',
        background: 'url("https://media1.giphy.com/media/cGymv7T9ZzDdLGczy7/giphy.gif?cid=ecf05e47992c2142e72bb54a0b4704a294feeb66a3697007&rid=giphy.gif") center center no-repeat',
        backgroundSize: '100vh 100vw',
        display: '-webkit-inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: "white",
      }
    }

    //rain
    if(this.state.temperature <= 13 && this.state.description.includes('rain')) {
      styleTitle = {
        height: '90vh',
        background: 'url("https://media1.giphy.com/media/d1G6qsjTJcHYhzxu/giphy.webp?cid=ecf05e4731ac24a2950e291841705804d86c4d6c1b1d7473&rid=giphy.webp") center center no-repeat',
        backgroundSize: '100vh 100vw',
        display: '-webkit-inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: "white",
      }
    }

    //hot 
    if(this.state.temperature >= 24) {
      styleTitle = {
        height: '90vh',
        background: 'url("https://media1.giphy.com/media/ctGFLebG1AqK4/giphy.gif?cid=ecf05e47aa6a804effc0745a0274cdb3bc44bd22ad33a38b&rid=giphy.gif") center center no-repeat',
        backgroundSize: '100vh 100vw',
        display: '-webkit-inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: "white",
      }
    }


    //Clear warm skies
    if (this.state.temperature >= 24 && this.state.description.includes('cloud')) {
      styleTitle = {
        height: '90vh',
        background: 'url("https://media2.giphy.com/media/49VB0PHxR5Vsc/giphy.webp?cid=ecf05e47653ed14b2511aadbc33e6b8215d468424cee29e2&rid=giphy.webp") center center no-repeat',
        backgroundSize: '100vh 100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: "black",
      }
    } 



    return (
      <div>
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div style= {styleTitle} className='col-xs-5'>
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}

export default App;