import React from 'react';
import '../css/Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <aside className="copyright">
          &copy;Remote Rate
        </aside>


        <section className="contact">
          {/* <a href="#"> */}

            Contact Us
          {/* </a> */}
        </section>

      </footer>
    )
  }
}

export default Footer;
