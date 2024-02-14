// src/pages/ContactPage.jsx
import React from 'react';
import './ContactPage.css';
const ContactPage = () => {
  return (
    <div className="contact-page">
      <h2>Contact Us</h2>
      <p>
        If you have any questions or inquiries, feel free to reach out to us.
        Fill out the form below or use the contact information provided.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore excepturi veritatis ipsa, omnis at ut laboriosam fuga odio corrupti officiis dolorum repellat facilis sint. Ab, quisquam eum. Dolorem optio unde laudantium tempora fugit, ex ab, porro consequatur perferendis molestiae nisi eligendi ducimus sit nihil? Eveniet iure optio facilis quae dolorum aspernatur, aut error, cum ut obcaecati quasi maxime doloremque consequatur. Assumenda temporibus labore animi reprehenderit? Voluptas adipisci fugiat unde itaque repellat, neque ducimus velit aspernatur esse nam commodi vitae dolor eaque aut ad quos ipsam blanditiis tempora veritatis obcaecati, dolore suscipit. Molestias nostrum sit, officiis quos iste dolores odio, modi eius mollitia ipsam soluta neque culpa illo rem amet quas, expedita non impedit voluptas odit! Pariatur, vel. Illo fugiat enim deleniti nisi recusandae laborum officia praesentium voluptas! Sequi vel odit in atque repellat quibusdam optio! Doloribus, qui. Minima odit odio iure quisquam dolores, consequuntur provident tempore repellendus? Accusantium ad ea tempora officiis modi ipsum ipsam laborum amet quas incidunt. Deserunt sequi quasi veritatis voluptates ea dignissimos praesentium, nulla voluptatum odio pariatur numquam nesciunt vel et optio, ab quam fugiat voluptate obcaecati amet possimus dolore temporibus! Quod nesciunt cupiditate provident unde nihil quas consectetur voluptatum porro et, ex inventore illo consequatur!
      </p>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="4" required></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactPage;
