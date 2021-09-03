import React from 'react';
import '../css/Footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer>
      {/* <h1>Footer</h1> */}
      <aside>
        &copy;Remote Rate
      </aside>
      <section>
        <a href="#">
        Contact Us
        </a>
      </section>
      </footer>
    )
  }
}

export default Footer;
