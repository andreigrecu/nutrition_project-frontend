import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavigationBar from '../welcomePage/NavigationBar';
import './TermsAndConditions.css';
import Footer from '../footer/Footer';

class TermsAndConditions extends Component {
    constructor(props) {
        super(props);
        this.state={};
    }

    render() {
        return (
            <Container fluid={true} className="p-0">
                <NavigationBar />
                <Row noGutters>
                    <Col sm="3"></Col>
                    <Col sm="6">
                        <h3 className="title">DoItNow Terms and Conditions of Use</h3>
                    </Col>
                    <Col sm="3"></Col>
                </Row>
                <Row noGutters>
                    <Col sm="2"></Col>
                    <Col sm="8">
                        <p className="welcome">&emsp; 
                            Welcome to DoItNow App. These Terms and Conditions of Use apply and govern
                            your use of our website and are designed to create a positive, law-abiding community of our users.
                            By using DoItNow App, you are agreeing to all the terms and conditions below. 
                        </p>
                        <p>&emsp; Also feel free to contact us <a href = "mailto: proiectlicenta2021@gmail.com">here</a>. </p>
                        <h5 className="cond">1. Who can use the Services</h5>
                        <p>&emsp;
                            The minimum age to acces the website and out services is 18. No individual under the age of 18 may use the Services or
                            provide any Personal Data to us. We do not share your information with any third parties.
                        </p>
                        <h5>2. Your Account</h5>
                        <p>&emsp;
                            You have to create an account in order to use the services provided by our app. At any time you can modify and update
                            your informations. If the informations are not updated in time, some of our services might not work at their full potential.
                        </p>
                        <p>&emsp;
                            You are responsible for maintaining the confidentiality of any and all actions that take place while using your account, 
                            and must notify us right away of any actual or suspected loss or theft. We are not responsible for any loss that results 
                            from unauthorized use of your email and password.
                        </p>
                        <h5>3. Security</h5>
                        <p>&emsp;Please contact us if you believe your account has beed compromised.</p>
                        <h5>4. Updates</h5>
                        <p>&emsp;
                            Our services are in a continuous evolution. New features are added and some old ones are refactored in better ones. So,
                            if our services are suspended, please understand that we make everything we can to be back in the shortest time.
                        </p>
                        <h5>5. Safety first</h5>
                        <p>&emsp;
                            Our programs are designed from easy to hard and are based on our experience. Some of them might be really hard to use by some of our users. 
                            If you know you have health problems better get in touch with a doctor before starting our programs. If you feel bad after you used one of 
                            our programs, stop using it and contact a doctor. We are not responsible for problems arising from improper use of the application. Also,
                            the programs are based on your weight, height and age input, so if you sent them wrong, please change them in the user informations page.
                        </p>
                        <h5>6. Foods</h5>
                        <p>&emsp;
                            Our food database is a large and verified one, but being very large, in time, some foods/ingredients/menu or grocery items may change their 
                            nutrients or their weights. We do our best to be updated as fast as possible. We also try to add different new foods and menu items to our database. 
                            If you see something wrong or want to add something new to the database, don`t hesitate to contact us <a href = "mailto: proiectlicenta2021@gmail.com">here</a>.
                        </p>
                        <h5>7. Enjoy the app :)</h5>
                    </Col>
                    <Col sm="2"></Col>
                </Row>
                <Row noGutters style={{'paddingTop': '3%'}}>
                    <Footer />
                </Row>
            </Container>
        )
    }
}


export default TermsAndConditions;