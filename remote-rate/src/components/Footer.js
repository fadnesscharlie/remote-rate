import React from 'react';
import '../css/Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <aside className="copyright">
          &copy;Remote Rate
        </aside>


        <h3 className="contact">
          {/* <a href="#"> */}
            Contact Us
          {/* </a> */}
        </h3>

      </footer>
    )
  }
}

export default Footer;
