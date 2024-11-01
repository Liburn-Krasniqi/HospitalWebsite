import { Container, Row, Col } from 'react-bootstrap';

import classes from './Layout.module.css';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { ProfileIcon } from '../UI/SVG';

function Layout(props){
    return (<div className="app-container d-flex flex-column min-vh-100">
        <Container fluid>
      <Row>
        <Col xs={2} id="sidebar">
          <Sidebar />
        </Col>
        <Col xs={10} id="content">
            <div className={classes.profileWrapper}>
              <ProfileIcon />
            </div>
        <main className={classes.main}>
            {props.children}
        </main>
        </Col>
      </Row>
    </Container>
    <Footer/>
    </div>);

}

export default Layout;